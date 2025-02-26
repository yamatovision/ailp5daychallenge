'use client';

import { useABTest } from '@/hooks/useABTest';
import BenefitsVariantA from './VariantA';
import BenefitsVariantB from './VariantB';

/**
 * Benefits コンポーネント - ABテスト対応
 * 
 * A/Bテストバリアントを自動的に切り替える
 * VariantA: シンプルなリスト型表示
 * VariantB: カテゴリ分類とカード型表示
 */
const Benefits = () => {
  // ABテストフックの使用
  const { isVariantA } = useABTest('benefits');
  
  // バリアントに応じた表示
  return isVariantA ? <BenefitsVariantA /> : <BenefitsVariantB />;
};

export default Benefits;