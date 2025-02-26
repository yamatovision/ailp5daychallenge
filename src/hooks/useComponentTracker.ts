/**
 * コンポーネント計測用カスタムフック
 */
import { useRef, useEffect, useCallback } from 'react';
import { TestableComponent } from '@/types/ab-test';
import { trackClick, trackScroll, trackConversion, trackExit } from '@/lib/ab-test/tracker';
import { useABTest } from './useABTest';

/**
 * IntersectionObserverを使ったビューポート内の表示/非表示検出
 */
const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: [0, 0.5, 1] },
  callback?: (entry: IntersectionObserverEntry) => void
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current || !callback) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callback(entry);
      });
    }, options);
    
    observer.observe(elementRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [elementRef, options, callback]);
};

/**
 * コンポーネントの計測を行うフック
 */
export const useComponentTracker = (componentId: TestableComponent) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { variant } = useABTest(componentId);
  
  // 表示時間計測用
  const visibleSince = useRef<number | null>(null);
  const totalTimeVisible = useRef<number>(0);
  
  // 表示状態検出のコールバック
  const handleVisibilityChange = useCallback((entry: IntersectionObserverEntry) => {
    const now = Date.now();
    const scrollDepth = Math.round(entry.intersectionRatio * 100);
    
    // スクロールイベントを記録
    trackScroll(componentId, scrollDepth, entry.isIntersecting);
    
    if (entry.isIntersecting) {
      // 表示開始時間を記録
      if (visibleSince.current === null) {
        visibleSince.current = now;
      }
    } else if (visibleSince.current !== null) {
      // 非表示になった時の計測
      const timeSpent = now - visibleSince.current;
      totalTimeVisible.current += timeSpent;
      visibleSince.current = null;
      
      // 次のコンポーネントはまだ不明なので、離脱だけ記録
      trackExit(componentId, timeSpent);
    }
  }, [componentId]);
  
  // IntersectionObserverの設定
  useIntersectionObserver(componentRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '0px'
  }, handleVisibilityChange);
  
  // コンポーネント内でのクリックを記録
  const trackClickEvent = useCallback((
    elementId?: string,
    metadata?: Record<string, any>
  ) => {
    trackClick(componentId, elementId, metadata);
  }, [componentId]);
  
  // コンバージョンを記録
  const trackConversionEvent = useCallback((
    conversionType: string,
    value?: number
  ) => {
    trackConversion(componentId, conversionType, value);
  }, [componentId]);
  
  // クリーンアップ（コンポーネントアンマウント時）
  useEffect(() => {
    return () => {
      // アンマウント時に残りの表示時間を計算
      if (visibleSince.current !== null) {
        const now = Date.now();
        const timeSpent = now - visibleSince.current;
        totalTimeVisible.current += timeSpent;
        
        // アンマウント時に最終的な滞在時間を記録
        trackExit(componentId, totalTimeVisible.current);
      }
    };
  }, [componentId]);
  
  return {
    componentRef,
    variant,
    trackClick: trackClickEvent,
    trackConversion: trackConversionEvent
  };
};

export default useComponentTracker;