/**
 * ABテストのバリアント状態管理
 */
import { TestableComponent, Variant, SessionInfo } from '@/types/ab-test';
import { getSession, saveSession } from './client';

// テスト可能なコンポーネントの配列
const TESTABLE_COMPONENTS: TestableComponent[] = [
  'hero',
  'cta',
  'floatingCta',
  'benefits',
  'curriculum',
  'faq'
];

// ブラウザ情報を取得
const detectBrowser = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) return 'IE';
  
  return 'Other';
};

// デバイスタイプを取得
const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// URLパラメータからUTMパラメータを取得
const getUTMParams = (): { source?: string; campaign?: string; } => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    campaign: params.get('utm_campaign') || undefined
  };
};

// セッションIDを生成
const generateSessionId = (): string => {
  return crypto.randomUUID();
};

// ランダムなバリアントを生成
const getRandomVariant = (): Variant => {
  return Math.random() < 0.5 ? 'a' : 'b';
};

// URLパラメータからバリアントを取得（デバッグ用）
const getVariantFromURL = (componentId: TestableComponent): Variant | null => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const variantParam = params.get(`variant_${componentId}`) || params.get('variant');
  
  if (variantParam === 'a' || variantParam === 'b') {
    return variantParam;
  }
  
  return null;
};

// 新しいセッションを初期化
export const initSession = (): SessionInfo => {
  // デバイス情報の取得
  const deviceInfo = {
    type: detectDeviceType(),
    browser: detectBrowser()
  };
  
  // UTMパラメータの取得
  const { source, campaign } = getUTMParams();
  
  // 各コンポーネントのバリアントをランダムに割り当て
  const variants: Record<TestableComponent, Variant> = {} as Record<TestableComponent, Variant>;
  
  TESTABLE_COMPONENTS.forEach(componentId => {
    // URLからバリアントが指定されていればそれを使用
    const urlVariant = getVariantFromURL(componentId);
    variants[componentId] = urlVariant || getRandomVariant();
  });
  
  // セッション情報の作成
  const session: SessionInfo = {
    id: generateSessionId(),
    startedAt: Date.now(),
    variants,
    source,
    campaign,
    device: deviceInfo
  };
  
  // セッション情報を保存
  saveSession(session);
  
  return session;
};

// 現在のセッションを取得または作成
export const getCurrentSession = (): SessionInfo => {
  // 既存のセッションがあれば利用
  const existingSession = getSession();
  if (existingSession) {
    // URLパラメータによるバリアント上書きチェック
    let needsUpdate = false;
    const updatedVariants = { ...existingSession.variants };
    
    TESTABLE_COMPONENTS.forEach(componentId => {
      const urlVariant = getVariantFromURL(componentId);
      if (urlVariant && urlVariant !== existingSession.variants[componentId]) {
        updatedVariants[componentId] = urlVariant;
        needsUpdate = true;
      }
    });
    
    // バリアントの変更があれば更新
    if (needsUpdate) {
      const updatedSession = {
        ...existingSession,
        variants: updatedVariants
      };
      saveSession(updatedSession);
      return updatedSession;
    }
    
    return existingSession;
  }
  
  // 新しいセッションを作成
  return initSession();
};

// コンポーネントのバリアントを取得
export const getComponentVariant = (componentId: TestableComponent): Variant => {
  const session = getCurrentSession();
  return session.variants[componentId] || 'a';
};

// アクティブなテストを取得
export const getActiveTests = (): TestableComponent[] => {
  return TESTABLE_COMPONENTS;
};

// 特定のコンポーネントのバリアントを変更（管理画面用）
export const setComponentVariant = (componentId: TestableComponent, variant: Variant): void => {
  const session = getCurrentSession();
  const updatedVariants = {
    ...session.variants,
    [componentId]: variant
  };
  
  const updatedSession = {
    ...session,
    variants: updatedVariants
  };
  
  saveSession(updatedSession);
};