/**
 * ABテスト用プロバイダーコンポーネント
 */
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SessionInfo, TestableComponent, Variant } from '@/types/ab-test';
import { getCurrentSession } from '@/lib/ab-test/store';
import { initTracker, cleanupTracker } from '@/lib/ab-test/tracker';
import { initAnalytics } from '@/lib/analytics/events';

// コンテキストの型定義
type ABTestContextType = {
  session: SessionInfo | null;
  isInitialized: boolean;
  getVariant: (componentId: TestableComponent) => Variant;
  refreshSession: () => void;
};

// デフォルト値
const defaultContext: ABTestContextType = {
  session: null,
  isInitialized: false,
  getVariant: () => 'a',
  refreshSession: () => {}
};

// コンテキストの作成
const ABTestContext = createContext<ABTestContextType>(defaultContext);

// コンテキストを使用するためのフック
export const useABTestContext = () => useContext(ABTestContext);

// Providerコンポーネントのprops
type ABTestProviderProps = {
  children: ReactNode;
};

/**
 * ABテスト用プロバイダーコンポーネント
 * 
 * アプリケーション全体でABテストの状態を管理し、
 * 初期化処理を行います。
 */
export const ABTestProvider = ({ children }: ABTestProviderProps) => {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // 初期化処理
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // 既存のセッションを取得または新規作成
    const currentSession = getCurrentSession();
    setSession(currentSession);
    
    // トラッカーの初期化
    initTracker();
    
    // 外部分析ツールの初期化
    initAnalytics();
    
    // 初期化完了
    setIsInitialized(true);
    
    // クリーンアップ
    return () => {
      cleanupTracker();
    };
  }, []);
  
  // セッション情報を更新
  const refreshSession = () => {
    if (typeof window === 'undefined') return;
    
    const updatedSession = getCurrentSession();
    setSession(updatedSession);
  };
  
  // コンポーネントのバリアントを取得する関数
  const getVariant = (componentId: TestableComponent): Variant => {
    if (!session) return 'a';
    return session.variants[componentId] || 'a';
  };
  
  // コンテキスト値
  const contextValue: ABTestContextType = {
    session,
    isInitialized,
    getVariant,
    refreshSession
  };
  
  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
};

export default ABTestProvider;