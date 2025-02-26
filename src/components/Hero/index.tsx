'use client';

import { useABTest } from '@/hooks/useABTest';
import HeroVariantA from './VariantA';
import HeroVariantB from './VariantB';

/**
 * Hero コンポーネント - ABテスト対応
 * 
 * A/Bテストバリアントを自動的に切り替える
 * VariantA: 製品の強みを強調するデザイン
 * VariantB: 問題解決型アプローチで特典を強調するデザイン
 */
const Hero = () => {
  // ABテストフックの使用
  const { isVariantA } = useABTest('hero');
  
  // バリアントに応じた表示
  return isVariantA ? <HeroVariantA /> : <HeroVariantB />;
};

export default Hero;