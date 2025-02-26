/**
 * ABテスト用データベースクライアント
 * 
 * ローカルストレージとSupabaseの両方に対応したハイブリッド実装
 */
import { ABTestEvent, SessionInfo, TestableComponent, Variant } from '@/types/ab-test';
import { supabase } from '../supabase';

// ローカルストレージのキー
const EVENTS_STORAGE_KEY = 'ab-test-events';
const SESSION_STORAGE_KEY = 'ab-test-session';

// イベントを保存（Supabaseとローカルストレージの両方）
export const saveEvent = async (event: ABTestEvent): Promise<{ id: string }> => {
  try {
    // 新しいIDを生成
    const id = crypto.randomUUID();
    const newEvent = { ...event, id };
    
    // ローカルストレージに保存（オフライン対応とフォールバック）
    const existingEvents = getLocalEvents();
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
    
    // Supabaseにデータを送信
    const { error } = await supabase
      .from('ab_test_events')
      .insert([{
        id: newEvent.id,
        component_id: newEvent.componentId,
        variant: newEvent.variant,
        event_type: newEvent.eventType,
        timestamp: new Date(newEvent.timestamp).toISOString(),
        session_id: newEvent.sessionId,
        source_id: newEvent.sourceId,
        data: newEvent.data
      }]);
      
    if (error) {
      console.error('[ABTest] Supabase insert error:', error);
      // ここでエラーをスローせず、ローカルストレージのデータを使用
    }
    
    console.log(`[ABTest] Event logged: ${event.componentId} - ${event.eventType}`);
    
    return { id };
  } catch (error) {
    console.error('[ABTest] Failed to save event:', error);
    return { id: 'error' };
  }
};

// 複数イベントをバッチで保存
export const saveEvents = async (events: ABTestEvent[]): Promise<{ ids: string[] }> => {
  try {
    const newEvents = events.map(event => ({
      ...event,
      id: crypto.randomUUID()
    }));
    
    // ローカルストレージに保存
    const existingEvents = getLocalEvents();
    const updatedEvents = [...existingEvents, ...newEvents];
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents));
    
    // Supabaseにデータを送信
    const { error } = await supabase
      .from('ab_test_events')
      .insert(newEvents.map(event => ({
        id: event.id,
        component_id: event.componentId,
        variant: event.variant,
        event_type: event.eventType,
        timestamp: new Date(event.timestamp).toISOString(),
        session_id: event.sessionId,
        source_id: event.sourceId,
        data: event.data
      })));
      
    if (error) {
      console.error('[ABTest] Supabase batch insert error:', error);
    }
    
    return {
      ids: newEvents.map(e => e.id as string)
    };
  } catch (error) {
    console.error('[ABTest] Failed to save events batch:', error);
    return { ids: [] };
  }
};

// ローカルイベントを取得
const getLocalEvents = (): ABTestEvent[] => {
  try {
    const eventsString = localStorage.getItem(EVENTS_STORAGE_KEY);
    return eventsString ? JSON.parse(eventsString) : [];
  } catch (error) {
    console.error('[ABTest] Failed to get local events:', error);
    return [];
  }
};

// イベントを取得（Supabaseから、フォールバックでローカル）
export const getEvents = async (): Promise<ABTestEvent[]> => {
  try {
    // Supabaseからイベントを取得
    const { data, error } = await supabase
      .from('ab_test_events')
      .select('*')
      .order('timestamp', { ascending: false });
      
    if (error) {
      console.error('[ABTest] Supabase fetch error:', error);
      // エラー時はローカルストレージのデータを使用
      return getLocalEvents();
    }
    
    // Supabaseのレスポンス形式をアプリの型に変換
    return data.map(item => ({
      id: item.id,
      componentId: item.component_id,
      variant: item.variant,
      eventType: item.event_type,
      timestamp: new Date(item.timestamp).getTime(),
      sessionId: item.session_id,
      sourceId: item.source_id,
      data: item.data
    }));
  } catch (error) {
    console.error('[ABTest] Failed to get events:', error);
    // エラー時はローカルストレージのデータを使用
    return getLocalEvents();
  }
};

// セッション情報を保存
export const saveSession = (session: SessionInfo): void => {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('[ABTest] Failed to save session:', error);
  }
};

// セッション情報を取得
export const getSession = (): SessionInfo | null => {
  try {
    const sessionString = localStorage.getItem(SESSION_STORAGE_KEY);
    return sessionString ? JSON.parse(sessionString) : null;
  } catch (error) {
    console.error('[ABTest] Failed to get session:', error);
    return null;
  }
};

// コンポーネント別のイベント取得
export const getEventsByComponent = async (componentId: TestableComponent): Promise<ABTestEvent[]> => {
  try {
    const { data, error } = await supabase
      .from('ab_test_events')
      .select('*')
      .eq('component_id', componentId)
      .order('timestamp', { ascending: false });
      
    if (error) {
      // エラー時はローカルストレージから
      console.error('[ABTest] Supabase component query error:', error);
      const allEvents = getLocalEvents();
      return allEvents.filter(event => event.componentId === componentId);
    }
    
    // Supabaseのレスポンス形式をアプリの型に変換
    return data.map(item => ({
      id: item.id,
      componentId: item.component_id,
      variant: item.variant,
      eventType: item.event_type,
      timestamp: new Date(item.timestamp).getTime(),
      sessionId: item.session_id,
      sourceId: item.source_id,
      data: item.data
    }));
  } catch (error) {
    console.error(`[ABTest] Failed to get events for component ${componentId}:`, error);
    const allEvents = getLocalEvents();
    return allEvents.filter(event => event.componentId === componentId);
  }
};

// バリアント別のイベント取得
export const getEventsByVariant = async (variant: Variant): Promise<ABTestEvent[]> => {
  try {
    const { data, error } = await supabase
      .from('ab_test_events')
      .select('*')
      .eq('variant', variant)
      .order('timestamp', { ascending: false });
      
    if (error) {
      // エラー時はローカルストレージから
      console.error('[ABTest] Supabase variant query error:', error);
      const allEvents = getLocalEvents();
      return allEvents.filter(event => event.variant === variant);
    }
    
    // Supabaseのレスポンス形式をアプリの型に変換
    return data.map(item => ({
      id: item.id,
      componentId: item.component_id,
      variant: item.variant,
      eventType: item.event_type,
      timestamp: new Date(item.timestamp).getTime(),
      sessionId: item.session_id,
      sourceId: item.source_id,
      data: item.data
    }));
  } catch (error) {
    console.error(`[ABTest] Failed to get events for variant ${variant}:`, error);
    const allEvents = getLocalEvents();
    return allEvents.filter(event => event.variant === variant);
  }
};

// テスト結果データをクリア (開発用)
export const clearTestData = async (): Promise<void> => {
  try {
    // ローカルストレージをクリア
    localStorage.removeItem(EVENTS_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    
    // Supabaseのデータをクリア（オプション、開発環境のみ）
    if (process.env.NODE_ENV === 'development') {
      const { error } = await supabase
        .from('ab_test_events')
        .delete()
        .gte('id', '00000000-0000-0000-0000-000000000000');
        
      if (error) {
        console.error('[ABTest] Supabase clear error:', error);
      }
    }
  } catch (error) {
    console.error('[ABTest] Failed to clear test data:', error);
  }
};