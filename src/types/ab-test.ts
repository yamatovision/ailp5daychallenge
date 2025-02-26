/**
 * ABテスト関連の型定義
 */

// テスト可能なコンポーネント識別子
export type TestableComponent = 'hero' | 'cta' | 'floatingCta' | 'benefits' | 'curriculum' | 'faq';

// テストバリアント
export type Variant = 'a' | 'b';

// イベントタイプ
export type EventType = 'view' | 'scroll' | 'click' | 'conversion' | 'exit';

// ABテストイベント
export interface ABTestEvent {
  id?: string; // サーバー側で生成する場合はオプショナル
  componentId: TestableComponent;
  variant: Variant;
  eventType: EventType;
  timestamp: number; // Unix timestamp
  sessionId: string;
  sourceId?: string; // UTM source等
  data?: Record<string, any>; // 追加データ（スクロール位置など）
}

// セッション情報
export interface SessionInfo {
  id: string;
  startedAt: number;
  variants: Record<TestableComponent, Variant>;
  source?: string; // トラフィックソース（FB広告など）
  campaign?: string; // キャンペーン情報
  device: {
    type: 'mobile' | 'tablet' | 'desktop';
    browser: string;
  };
}

// コンポーネントの計測メトリクス
export interface ComponentMetrics {
  impressions: number;
  interactions: number;
  conversions: number;
  conversionRate: number;
  exitRate: number;
  avgTimeOnComponent: number;
}

// テスト結果
export interface TestResults {
  componentId: TestableComponent;
  period: {
    start: number;
    end: number;
  };
  variantA: ComponentMetrics;
  variantB: ComponentMetrics;
  winner?: Variant;
  confidence: number; // 統計的信頼度
}

// コンポーネントフロー分析
export interface ComponentFlow {
  fromComponent: TestableComponent;
  fromVariant: Variant;
  toComponent: TestableComponent;
  transitionCount: number;
  avgTimeToTransition: number;
}