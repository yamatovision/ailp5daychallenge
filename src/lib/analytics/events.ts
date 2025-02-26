/**
 * 分析用イベント定義
 */
import { TestableComponent, Variant } from '@/types/ab-test';

// Facebook Pixel イベント
export enum FacebookEvents {
  PAGE_VIEW = 'PageView',
  VIEW_CONTENT = 'ViewContent',
  COMPLETE_REGISTRATION = 'CompleteRegistration',
  LEAD = 'Lead',
  CONTACT = 'Contact',
  CUSTOM_EVENT = 'CustomEvent'
}

// Google Analytics イベント
export enum GoogleEvents {
  PAGE_VIEW = 'page_view',
  SCROLL = 'scroll',
  CLICK = 'click',
  CONVERSION = 'conversion',
  VIEW_ITEM = 'view_item',
  SELECT_CONTENT = 'select_content'
}

// Facebook Pixelにイベントを送信
export const sendToFacebookPixel = (
  eventName: FacebookEvents,
  params?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    currency?: string;
    value?: number;
    variant?: Variant;
    component?: TestableComponent;
    [key: string]: any;
  }
): void => {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('[Analytics] Facebook Pixel not initialized');
    return;
  }
  
  try {
    window.fbq('track', eventName, params);
  } catch (error) {
    console.error(`[Analytics] Failed to send Facebook Pixel event ${eventName}:`, error);
  }
};

// Google Analyticsにイベントを送信
export const sendToGoogleAnalytics = (
  eventName: GoogleEvents,
  params?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    variant?: Variant;
    component?: TestableComponent;
    [key: string]: any;
  }
): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] Google Analytics not initialized');
    return;
  }
  
  try {
    window.gtag('event', eventName, params);
  } catch (error) {
    console.error(`[Analytics] Failed to send Google Analytics event ${eventName}:`, error);
  }
};

// コンポーネント表示イベントを追跡
export const trackComponentView = (
  componentId: TestableComponent,
  variant: Variant
): void => {
  // Facebook Pixel
  sendToFacebookPixel(FacebookEvents.VIEW_CONTENT, {
    content_name: componentId,
    content_category: 'component',
    variant,
    component: componentId
  });
  
  // Google Analytics
  sendToGoogleAnalytics(GoogleEvents.VIEW_ITEM, {
    event_category: 'component',
    event_label: componentId,
    variant,
    component: componentId
  });
};

// コンバージョンイベントを追跡
export const trackComponentConversion = (
  componentId: TestableComponent,
  variant: Variant,
  conversionType: string,
  value?: number
): void => {
  // Facebook Pixel
  sendToFacebookPixel(FacebookEvents.LEAD, {
    content_name: componentId,
    content_category: 'conversion',
    value,
    variant,
    component: componentId,
    conversion_type: conversionType
  });
  
  // Google Analytics
  sendToGoogleAnalytics(GoogleEvents.CONVERSION, {
    event_category: 'conversion',
    event_label: `${componentId}:${conversionType}`,
    value,
    variant,
    component: componentId
  });
};

// 外部分析ツールの初期化
export const initAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  
  // Facebook Pixel初期化
  if (process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
    try {
      // Facebook Pixelスクリプトを動的に追加
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      window._fbq = window._fbq || window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
      window.fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('[Analytics] Failed to initialize Facebook Pixel:', error);
    }
  }
  
  // Google Analytics初期化
  if (process.env.NEXT_PUBLIC_GA_ID) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID);
    } catch (error) {
      console.error('[Analytics] Failed to initialize Google Analytics:', error);
    }
  }
};

// 型定義を追加
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}