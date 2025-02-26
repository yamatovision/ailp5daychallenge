'use client';

import { useABTest } from '@/hooks/useABTest';
import FloatingCTAVariantA from './VariantA';
import FloatingCTAVariantB from './VariantB';

/**
 * FloatingCTA コンポーネント - ABテスト対応
 * 
 * A/Bテストバリアントを自動的に切り替える
 * VariantA: 画面下部に固定表示されるCTA
 * VariantB: 右下に表示され、折りたためるCTA
 */
const FloatingCTA = () => {
  // ABテストフックの使用
  const { isVariantA } = useABTest('floatingCta');
  
  // バリアントに応じた表示
  return isVariantA ? <FloatingCTAVariantA /> : <FloatingCTAVariantB />;
};

export default FloatingCTA;