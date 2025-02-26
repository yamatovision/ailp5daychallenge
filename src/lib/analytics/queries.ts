/**
 * 分析用クエリ関数
 */
import { 
  TestableComponent,
  Variant,
  ComponentMetrics, 
  TestResults,
  ComponentFlow,
} from '@/types/ab-test';
import { 
  AnalyticsFilter,
  TimeUnit,
  TimeSeriesData,
  DeviceBreakdown,
  ComponentAnalysis,
  TransitionData,
  DashboardSummary,
} from '@/types/analytics';
import { getEvents, getEventsByComponent, getEventsByVariant } from '../ab-test/client';

// 期間で絞り込んだイベントを取得
const getFilteredEvents = async (filter?: AnalyticsFilter) => {
  const allEvents = await getEvents();
  
  if (!filter) return allEvents;
  
  return allEvents.filter(event => {
    // 日付フィルタ
    if (filter.startDate && event.timestamp < filter.startDate) return false;
    if (filter.endDate && event.timestamp > filter.endDate) return false;
    
    // コンポーネントフィルタ
    if (filter.components && filter.components.length > 0) {
      if (!filter.components.includes(event.componentId)) return false;
    }
    
    // バリアントフィルタ
    if (filter.variants && filter.variants.length > 0) {
      if (!filter.variants.includes(event.variant)) return false;
    }
    
    // ソースフィルタ
    if (filter.sources && filter.sources.length > 0 && event.sourceId) {
      if (!filter.sources.includes(event.sourceId)) return false;
    }
    
    return true;
  });
};

// コンポーネントのメトリクスを計算
export const getComponentMetrics = async (
  componentId: TestableComponent,
  variant: Variant,
  filter?: AnalyticsFilter
): Promise<ComponentMetrics> => {
  const events = await getFilteredEvents(filter);
  
  // コンポーネントとバリアント固有のイベント
  const componentEvents = events.filter(
    event => event.componentId === componentId && event.variant === variant
  );
  
  // ユニークセッション数
  const uniqueSessions = new Set(componentEvents.map(event => event.sessionId));
  
  // ビュー数
  const views = componentEvents.filter(event => event.eventType === 'view').length;
  
  // インタラクション数（クリックとスクロール）
  const interactions = componentEvents.filter(
    event => event.eventType === 'click' || event.eventType === 'scroll'
  ).length;
  
  // コンバージョン数
  const conversions = componentEvents.filter(event => event.eventType === 'conversion').length;
  
  // 離脱数
  const exits = componentEvents.filter(event => event.eventType === 'exit').length;
  
  // 平均滞在時間計算
  const exitEvents = componentEvents.filter(event => event.eventType === 'exit');
  const totalTimeSpent = exitEvents.reduce((total, event) => {
    return total + ((event.data?.timeSpent as number) || 0);
  }, 0);
  
  const avgTimeOnComponent = exitEvents.length > 0
    ? totalTimeSpent / exitEvents.length
    : 0;
  
  return {
    impressions: views,
    interactions: interactions,
    conversions: conversions,
    conversionRate: uniqueSessions.size > 0 ? (conversions / uniqueSessions.size) * 100 : 0,
    exitRate: views > 0 ? (exits / views) * 100 : 0,
    avgTimeOnComponent: avgTimeOnComponent
  };
};

// テスト結果の取得
export const getTestResults = async (
  componentId: TestableComponent,
  filter?: AnalyticsFilter
): Promise<TestResults> => {
  const events = await getFilteredEvents(filter);
  
  // 期間の取得
  const timestamps = events.map(event => event.timestamp);
  const start = timestamps.length > 0 ? Math.min(...timestamps) : Date.now();
  const end = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();
  
  // A/Bバリアントのメトリクス取得
  const variantA = await getComponentMetrics(componentId, 'a', filter);
  const variantB = await getComponentMetrics(componentId, 'b', filter);
  
  // 信頼度計算（単純な例）
  // 実際の統計的有意性は複雑な計算が必要
  const improvementRate = variantB.conversionRate - variantA.conversionRate;
  const sampleSize = variantA.impressions + variantB.impressions;
  
  // サンプルサイズに基づく簡易的な信頼度計算
  // 実際の実装ではより精密な統計計算が必要
  let confidence = 0;
  if (sampleSize > 1000 && Math.abs(improvementRate) > 1) {
    confidence = 95;
  } else if (sampleSize > 500 && Math.abs(improvementRate) > 2) {
    confidence = 90;
  } else if (sampleSize > 200 && Math.abs(improvementRate) > 5) {
    confidence = 85;
  } else {
    confidence = 50;
  }
  
  // 勝者の判定
  let winner: Variant | undefined = undefined;
  if (confidence >= 90) {
    winner = variantB.conversionRate > variantA.conversionRate ? 'b' : 'a';
  }
  
  return {
    componentId,
    period: { start, end },
    variantA,
    variantB,
    winner,
    confidence
  };
};

// 時系列データの取得
export const getTimeSeriesData = async (
  componentId: TestableComponent,
  metric: 'views' | 'conversions' | 'interactions',
  timeUnit: TimeUnit = 'hour',
  filter?: AnalyticsFilter
): Promise<TimeSeriesData[]> => {
  const events = await getFilteredEvents(filter);
  
  // コンポーネント固有のイベント
  const componentEvents = events.filter(event => event.componentId === componentId);
  
  // メトリクス固有のイベントタイプにフィルタリング
  let filteredEvents;
  switch (metric) {
    case 'views':
      filteredEvents = componentEvents.filter(event => event.eventType === 'view');
      break;
    case 'conversions':
      filteredEvents = componentEvents.filter(event => event.eventType === 'conversion');
      break;
    case 'interactions':
      filteredEvents = componentEvents.filter(
        event => event.eventType === 'click' || event.eventType === 'scroll'
      );
      break;
  }
  
  // 時間単位でグループ化
  const timeGroups: Record<string, number> = {};
  
  filteredEvents.forEach(event => {
    const date = new Date(event.timestamp);
    let timeKey;
    
    switch (timeUnit) {
      case 'hour':
        // yyyy-MM-dd-HH形式
        timeKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}`;
        break;
      case 'day':
        // yyyy-MM-dd形式
        timeKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        break;
      case 'week':
        // yyyy-ww形式（週番号）
        const weekNumber = Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
        timeKey = `${date.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
        break;
    }
    
    timeGroups[timeKey] = (timeGroups[timeKey] || 0) + 1;
  });
  
  // 時系列データ配列に変換
  const result: TimeSeriesData[] = Object.entries(timeGroups).map(([timeKey, count]) => {
    // timeKey をタイムスタンプに変換
    let timestamp;
    switch (timeUnit) {
      case 'hour':
        const [year, month, day, hour] = timeKey.split('-').map(Number);
        timestamp = new Date(year, month - 1, day, hour).getTime();
        break;
      case 'day':
        const [yearDay, monthDay, dayDay] = timeKey.split('-').map(Number);
        timestamp = new Date(yearDay, monthDay - 1, dayDay).getTime();
        break;
      case 'week':
        const [yearWeek, weekNum] = timeKey.split('-').map(Number);
        // 簡易的な週計算（厳密には週の始まりを考慮する必要あり）
        timestamp = new Date(yearWeek, 0, 1 + (weekNum - 1) * 7).getTime();
        break;
    }
    
    return {
      timestamp,
      value: count,
      component: componentId
    };
  });
  
  // タイムスタンプでソート
  return result.sort((a, b) => a.timestamp - b.timestamp);
};

// コンポーネント間の遷移分析
export const getComponentFlow = async (
  fromComponent: TestableComponent,
  fromVariant: Variant,
  filter?: AnalyticsFilter
): Promise<ComponentFlow[]> => {
  const events = await getFilteredEvents(filter);
  
  // 離脱イベントを取得
  const exitEvents = events.filter(
    event => event.componentId === fromComponent && 
      event.variant === fromVariant && 
      event.eventType === 'exit'
  );
  
  // 次のコンポーネントへの遷移をカウント
  const transitions: Record<TestableComponent, { count: number, totalTime: number }> = {
    hero: { count: 0, totalTime: 0 },
    cta: { count: 0, totalTime: 0 },
    floatingCta: { count: 0, totalTime: 0 },
    benefits: { count: 0, totalTime: 0 },
    curriculum: { count: 0, totalTime: 0 },
    faq: { count: 0, totalTime: 0 }
  };
  
  exitEvents.forEach(event => {
    const nextComponent = event.data?.nextComponentId as TestableComponent | undefined;
    const timeSpent = event.data?.timeSpent as number || 0;
    
    if (nextComponent) {
      if (!transitions[nextComponent]) {
        transitions[nextComponent] = { count: 0, totalTime: 0 };
      }
      
      transitions[nextComponent].count += 1;
      transitions[nextComponent].totalTime += timeSpent;
    }
  });
  
  // コンポーネントフロー配列に変換
  const result: ComponentFlow[] = Object.entries(transitions).map(([componentId, data]) => ({
    fromComponent,
    fromVariant,
    toComponent: componentId as TestableComponent,
    transitionCount: data.count,
    avgTimeToTransition: data.count > 0 ? data.totalTime / data.count : 0
  }));
  
  // 遷移数でソート
  return result.sort((a, b) => b.transitionCount - a.transitionCount);
};

// デバイス別の分析
export const getDeviceBreakdown = async (
  componentId: TestableComponent,
  eventType: 'view' | 'conversion',
  filter?: AnalyticsFilter
): Promise<DeviceBreakdown[]> => {
  const events = await getFilteredEvents(filter);
  
  // 指定されたコンポーネントとイベントタイプのイベント
  const targetEvents = events.filter(
    event => event.componentId === componentId && event.eventType === eventType
  );
  
  // ユニークセッションを取得
  const sessions = new Map<string, 'mobile' | 'tablet' | 'desktop'>();
  
  targetEvents.forEach(event => {
    // セッション情報からデバイスタイプを取得する（実際の実装では別の方法で取得）
    // この例では簡易的にUserAgentを使用
    const device = event.data?.deviceType as 'mobile' | 'tablet' | 'desktop' || 'desktop';
    sessions.set(event.sessionId, device);
  });
  
  // デバイスタイプ別のカウント
  const deviceCounts = {
    mobile: 0,
    tablet: 0,
    desktop: 0
  };
  
  sessions.forEach(deviceType => {
    deviceCounts[deviceType]++;
  });
  
  const totalCount = sessions.size;
  
  // デバイス内訳配列に変換
  return [
    {
      deviceType: 'mobile' as const,
      count: deviceCounts.mobile,
      percentage: totalCount > 0 ? (deviceCounts.mobile / totalCount) * 100 : 0
    },
    {
      deviceType: 'tablet' as const,
      count: deviceCounts.tablet,
      percentage: totalCount > 0 ? (deviceCounts.tablet / totalCount) * 100 : 0
    },
    {
      deviceType: 'desktop' as const,
      count: deviceCounts.desktop,
      percentage: totalCount > 0 ? (deviceCounts.desktop / totalCount) * 100 : 0
    }
  ].sort((a, b) => b.count - a.count);
};

// ダッシュボード概要データの取得
export const getDashboardSummary = async (filter?: AnalyticsFilter): Promise<DashboardSummary> => {
  const events = await getFilteredEvents(filter);
  
  // ユニークビジター数（セッション数）
  const uniqueVisitors = new Set(events.filter(event => event.eventType === 'view')
    .map(event => event.sessionId)).size;
  
  // コンバージョン総数
  const totalConversions = events.filter(event => event.eventType === 'conversion').length;
  
  // 全体のコンバージョン率
  const overallConversionRate = uniqueVisitors > 0 
    ? (totalConversions / uniqueVisitors) * 100 
    : 0;
  
  // アクティブなテスト数
  const activeTests = new Set(events.map(event => event.componentId)).size;
  
  // 統計的に有意な差がある項目数（信頼度90%以上）
  let significantFindings = 0;
  
  // テスト可能なコンポーネントの配列（実際の実装では設定から取得）
  const testableComponents: TestableComponent[] = [
    'hero', 'cta', 'floatingCta', 'benefits', 'curriculum', 'faq'
  ];
  
  // 各コンポーネントについて統計的有意性をチェック
  for (const componentId of testableComponents) {
    const testResult = await getTestResults(componentId, filter);
    if (testResult.confidence >= 90) {
      significantFindings++;
    }
  }
  
  return {
    totalVisitors: uniqueVisitors,
    totalConversions,
    overallConversionRate,
    activeTests,
    significantFindings
  };
};

// コンポーネント分析一覧の取得
export const getAllComponentAnalyses = async (filter?: AnalyticsFilter): Promise<ComponentAnalysis[]> => {
  // テスト可能なコンポーネントの配列
  const testableComponents: TestableComponent[] = [
    'hero', 'cta', 'floatingCta', 'benefits', 'curriculum', 'faq'
  ];
  
  const analyses: ComponentAnalysis[] = [];
  
  // 非同期処理が必要なため、for...ofループを使用
  for (const componentId of testableComponents) {
    const testResult = await getTestResults(componentId, filter);
    
    const improvement = testResult.variantA.conversionRate > 0
      ? ((testResult.variantB.conversionRate - testResult.variantA.conversionRate) / testResult.variantA.conversionRate) * 100
      : 0;
    
    analyses.push({
      componentId,
      variantA: {
        visitors: Math.floor(testResult.variantA.impressions),
        conversions: Math.floor(testResult.variantA.conversions),
        conversionRate: testResult.variantA.conversionRate,
        avgTimeOnComponent: testResult.variantA.avgTimeOnComponent,
        exitRate: testResult.variantA.exitRate
      },
      variantB: {
        visitors: Math.floor(testResult.variantB.impressions),
        conversions: Math.floor(testResult.variantB.conversions),
        conversionRate: testResult.variantB.conversionRate,
        avgTimeOnComponent: testResult.variantB.avgTimeOnComponent,
        exitRate: testResult.variantB.exitRate
      },
      improvement,
      confidence: testResult.confidence,
      isSignificant: testResult.confidence >= 90
    });
  }
  
  // 改善率の絶対値でソート
  return analyses.sort((a, b) => Math.abs(b.improvement) - Math.abs(a.improvement));
};