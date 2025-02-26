/**
 * ABテストのイベント追跡
 */
import { ABTestEvent, EventType, TestableComponent } from '@/types/ab-test';
import { saveEvent, saveEvents } from './client';
import { getCurrentSession, getComponentVariant } from './store';

// バッチ処理用キュー
let eventQueue: ABTestEvent[] = [];
let queueTimer: NodeJS.Timeout | null = null;
const QUEUE_INTERVAL = 5000; // 5秒ごとにバッチ処理

// キュー内のイベントを処理
const processQueue = async (): Promise<void> => {
  if (eventQueue.length === 0) return;
  
  const events = [...eventQueue];
  eventQueue = [];
  
  try {
    await saveEvents(events);
  } catch (error) {
    console.error('[ABTest] Failed to process event queue:', error);
    // 失敗したイベントをキューに戻す
    eventQueue = [...eventQueue, ...events];
  }
};

// イベントキューの定期処理を開始
const startQueueProcessing = (): void => {
  if (queueTimer) return;
  
  queueTimer = setInterval(processQueue, QUEUE_INTERVAL);
};

// イベントキューの処理を停止
const stopQueueProcessing = (): void => {
  if (queueTimer) {
    clearInterval(queueTimer);
    queueTimer = null;
  }
};

// イベントを追跡 (内部関数)
const trackEvent = async (
  componentId: TestableComponent,
  eventType: EventType,
  data?: Record<string, unknown>,
  immediate = false
): Promise<void> => {
  try {
    const session = getCurrentSession();
    const variant = getComponentVariant(componentId);
    
    const event: ABTestEvent = {
      componentId,
      variant,
      eventType,
      timestamp: Date.now(),
      sessionId: session.id,
      sourceId: session.source,
      data
    };
    
    // 即時送信が指定されている場合はすぐに送信
    if (immediate) {
      await saveEvent(event);
      return;
    }
    
    // それ以外はキューに追加
    eventQueue.push(event);
    
    // キュー処理が動いていなければ開始
    if (!queueTimer) {
      startQueueProcessing();
    }
  } catch (error) {
    console.error(`[ABTest] Failed to track ${eventType} event for ${componentId}:`, error);
  }
};

// コンポーネントの表示を追跡
export const trackView = (componentId: TestableComponent): void => {
  trackEvent(componentId, 'view');
};

// コンポーネント内のクリックを追跡
export const trackClick = (
  componentId: TestableComponent,
  elementId?: string,
  metadata?: Record<string, unknown>
): void => {
  trackEvent(componentId, 'click', {
    elementId,
    ...metadata
  });
};

// スクロール位置を追跡
export const trackScroll = (
  componentId: TestableComponent,
  scrollDepth: number,
  visible: boolean
): void => {
  trackEvent(componentId, 'scroll', {
    scrollDepth,
    visible
  });
};

// コンバージョンを追跡
export const trackConversion = (
  componentId: TestableComponent,
  conversionType: string,
  value?: number
): void => {
  // コンバージョンは重要なので即時送信
  trackEvent(componentId, 'conversion', {
    conversionType,
    value
  }, true);
};

// コンポーネントからの離脱を追跡
export const trackExit = (
  componentId: TestableComponent,
  timeSpent: number,
  nextComponentId?: TestableComponent
): void => {
  trackEvent(componentId, 'exit', {
    timeSpent,
    nextComponentId
  });
};

// イベント追跡の初期化
export const initTracker = (): void => {
  if (typeof window === 'undefined') return;
  
  // ページ離脱時に残りのイベントを処理
  window.addEventListener('beforeunload', () => {
    stopQueueProcessing();
    processQueue();
  });
  
  // イベント処理を開始
  startQueueProcessing();
};

// イベント追跡の終了
export const cleanupTracker = (): void => {
  stopQueueProcessing();
};