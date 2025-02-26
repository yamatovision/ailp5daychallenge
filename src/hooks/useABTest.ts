/**
 * ABテスト用カスタムフック
 */
import { useState, useEffect } from 'react';
import { TestableComponent, Variant } from '@/types/ab-test';
import { getComponentVariant } from '@/lib/ab-test/store';
import { initTracker, trackView } from '@/lib/ab-test/tracker';

/**
 * コンポーネントごとのABテスト管理フック
 * @param componentId テスト対象のコンポーネント識別子
 * @returns バリアント情報と関連ユーティリティ
 */
export const useABTest = (componentId: TestableComponent) => {
  // コンポーネントのバリアントを取得
  const [variant, setVariant] = useState<Variant>('a');
  
  useEffect(() => {
    // クライアントサイドのみで実行
    if (typeof window === 'undefined') return;
    
    // トラッカーの初期化
    initTracker();
    
    // バリアントの取得・設定
    const componentVariant = getComponentVariant(componentId);
    setVariant(componentVariant);
    
    // コンポーネントの表示を記録
    trackView(componentId);
    
    // 依存配列はcomponentIdのみで十分
  }, [componentId]);
  
  return {
    variant,
    isVariantA: variant === 'a',
    isVariantB: variant === 'b'
  };
};

/**
 * バリアント情報のみを取得する軽量版フック
 * （トラッキングなし、表示イベント記録なし）
 * @param componentId テスト対象のコンポーネント識別子
 * @returns バリアント情報
 */
export const useVariant = (componentId: TestableComponent): Variant => {
  const [variant, setVariant] = useState<Variant>('a');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const componentVariant = getComponentVariant(componentId);
    setVariant(componentVariant);
  }, [componentId]);
  
  return variant;
};

export default useABTest;