'use client';

import { useABTest } from '@/hooks/useABTest';
import CallToActionVariantA from './VariantA';
import CallToActionVariantB from './VariantB';

/**
 * CallToAction コンポーネント - ABテスト対応
 * 
 * A/Bテストバリアントを自動的に切り替える
 * VariantA: シンプルなカード型CTA
 * VariantB: 2カラムレイアウトで特典を強調
 */
const CallToAction = () => {
  // ABテストフックの使用
  const { isVariantA } = useABTest('cta');
  
  // バリアントに応じた表示
  return isVariantA ? <CallToActionVariantA /> : <CallToActionVariantB />;
};

export default CallToAction;