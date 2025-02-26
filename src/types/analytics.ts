/**
 * 分析機能関連の型定義
 */
import { TestableComponent, Variant, EventType } from './ab-test';

// フィルター条件
export interface AnalyticsFilter {
  startDate?: number;
  endDate?: number;
  components?: TestableComponent[];
  variants?: Variant[];
  sources?: string[];
  campaigns?: string[];
  deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
}

// 時間単位の集計
export type TimeUnit = 'hour' | 'day' | 'week';

// 時間別の集計データ
export interface TimeSeriesData {
  timestamp: number;
  value: number;
  component?: TestableComponent;
  variant?: Variant;
}

// デバイス別の集計データ
export interface DeviceBreakdown {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  count: number;
  percentage: number;
}

// コンポーネント間の遷移データ
export interface TransitionData {
  fromComponent: TestableComponent;
  fromVariant: Variant;
  toComponent: TestableComponent;
  toVariant: Variant;
  count: number;
  percentage: number;
}

// ダッシュボード概要データ
export interface DashboardSummary {
  totalVisitors: number;
  totalConversions: number;
  overallConversionRate: number;
  activeTests: number;
  significantFindings: number; // 統計的に有意な差がある項目数
}

// 詳細な分析データ
export interface ComponentAnalysis {
  componentId: TestableComponent;
  variantA: {
    visitors: number;
    conversions: number;
    conversionRate: number;
    avgTimeOnComponent: number;
    exitRate: number;
  };
  variantB: {
    visitors: number;
    conversions: number;
    conversionRate: number;
    avgTimeOnComponent: number;
    exitRate: number;
  };
  improvement: number; // B vs A の改善率 (%)
  confidence: number; // 統計的信頼度 (%)
  isSignificant: boolean; // 統計的に有意かどうか
}

// FB広告統合データ
export interface FBAdIntegration {
  campaignId: string;
  adSetId: string;
  adId: string;
  variant: Variant;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // クリック率
  cvr: number; // コンバージョン率
  cpc: number; // クリック単価
  cpa: number; // 獲得単価
}