/**
 * 分析データ取得用カスタムフック
 */
import { useState, useEffect, useCallback } from 'react';
import { TestableComponent, Variant } from '@/types/ab-test';
import { 
  AnalyticsFilter,
  TimeUnit,
  ComponentAnalysis,
  DashboardSummary,
  DeviceBreakdown,
  TimeSeriesData
} from '@/types/analytics';
import { ComponentFlow } from '@/types/ab-test';
import { 
  getAllComponentAnalyses,
  getDashboardSummary,
  getTimeSeriesData,
  getDeviceBreakdown,
  getComponentFlow
} from '@/lib/analytics/queries';

/**
 * ダッシュボード概要データ取得フック
 */
export const useDashboardSummary = (filter?: AnalyticsFilter) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardSummary(filter);
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch dashboard summary:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);
  
  return { summary, loading, refresh: fetchSummary };
};

/**
 * コンポーネント分析一覧取得フック
 */
export const useComponentAnalyses = (filter?: AnalyticsFilter) => {
  const [analyses, setAnalyses] = useState<ComponentAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchAnalyses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllComponentAnalyses(filter);
      setAnalyses(data);
    } catch (error) {
      console.error('Failed to fetch component analyses:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);
  
  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);
  
  return { analyses, loading, refresh: fetchAnalyses };
};

/**
 * 時系列データ取得フック
 */
export const useTimeSeriesData = (
  componentId: TestableComponent,
  metric: 'views' | 'conversions' | 'interactions',
  timeUnit: TimeUnit = 'day',
  filter?: AnalyticsFilter
) => {
  const [data, setData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const timeSeriesData = await getTimeSeriesData(componentId, metric, timeUnit, filter);
      setData(timeSeriesData);
    } catch (error) {
      console.error('Failed to fetch time series data:', error);
    } finally {
      setLoading(false);
    }
  }, [componentId, metric, timeUnit, filter]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, refresh: fetchData };
};

/**
 * デバイス別分析データ取得フック
 */
export const useDeviceBreakdown = (
  componentId: TestableComponent,
  eventType: 'view' | 'conversion',
  filter?: AnalyticsFilter
) => {
  const [data, setData] = useState<DeviceBreakdown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const breakdownData = await getDeviceBreakdown(componentId, eventType, filter);
      setData(breakdownData);
    } catch (error) {
      console.error('Failed to fetch device breakdown:', error);
    } finally {
      setLoading(false);
    }
  }, [componentId, eventType, filter]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, refresh: fetchData };
};

/**
 * コンポーネントフロー分析データ取得フック
 */
export const useComponentFlow = (
  fromComponent: TestableComponent,
  fromVariant: Variant,
  filter?: AnalyticsFilter
) => {
  const [data, setData] = useState<ComponentFlow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const flowData = await getComponentFlow(fromComponent, fromVariant, filter);
      setData(flowData);
    } catch (error) {
      console.error('Failed to fetch component flow:', error);
    } finally {
      setLoading(false);
    }
  }, [fromComponent, fromVariant, filter]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, refresh: fetchData };
};

const analyticsHooks = {
  useDashboardSummary,
  useComponentAnalyses,
  useTimeSeriesData,
  useDeviceBreakdown,
  useComponentFlow
};

export default analyticsHooks;