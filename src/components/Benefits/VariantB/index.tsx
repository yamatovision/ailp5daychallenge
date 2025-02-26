'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentTracker } from '@/hooks/useComponentTracker';

// バリアントBでは、特典を大カテゴリーに分類
const benefitCategories = [
  {
    id: 'lp-creation',
    title: 'LPデザイン・制作関連',
    icon: '🎨',
    benefits: [
      {
        id: '01',
        title: 'プロ品質のLP制作テンプレート5種類',
        value: '75,000円相当',
        highlight: true
      },
      {
        id: '02',
        title: 'コンバージョン率を2倍にする7つの秘訣',
        value: '35,000円相当'
      },
      {
        id: '03',
        title: 'LP制作用プレミアム素材集100点以上',
        value: '24,000円相当'
      }
    ]
  },
  {
    id: 'marketing',
    title: 'マーケティング戦略関連',
    icon: '📈',
    benefits: [
      {
        id: '04',
        title: '広告費を即日回収するセールスファネル構築法',
        value: '58,000円相当'
      },
      {
        id: '05',
        title: 'ハイパフォーマーFB広告運用マニュアル',
        value: '42,000円相当'
      },
      {
        id: '06',
        title: 'DanLok直伝のYouTube集客戦略',
        value: '39,000円相当'
      }
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI活用関連',
    icon: '🤖',
    benefits: [
      {
        id: '07',
        title: 'AI文章生成プロンプト集50種類',
        value: '28,000円相当'
      },
      {
        id: '08',
        title: 'AIデザイン自動生成チュートリアル',
        value: '32,000円相当'
      },
      {
        id: '09',
        title: 'コンテンツ生成自動化システム構築法',
        value: '47,000円相当',
        highlight: true
      }
    ]
  }
];

const BenefitsVariantB = () => {
  // コンポーネント計測フックの使用
  const { componentRef, trackClick } = useComponentTracker('benefits');
  
  // アクティブなカテゴリ
  const [activeCategory, setActiveCategory] = useState(benefitCategories[0].id);
  
  // カテゴリ切り替え
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    trackClick(`category_${categoryId}`);
  };
  
  // 現在のカテゴリの特典を取得
  const activeCategoryData = benefitCategories.find(cat => cat.id === activeCategory) || benefitCategories[0];
  
  // 特典の合計価値を計算
  const totalValue = benefitCategories.reduce((total, category) => {
    return total + category.benefits.reduce((catTotal, benefit) => {
      const value = parseInt(benefit.value.replace(/[^0-9]/g, ''), 10) || 0;
      return catTotal + value;
    }, 0);
  }, 0);
  
  return (
    <div 
      ref={componentRef}
      className="py-24 bg-gradient-to-b from-[#0D1117] to-[#111827] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ヘッダー部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#2DD4FF] text-lg mb-2">チャレンジ参加者だけの</p>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#2DD4FF]">
            豪華9大特典パッケージ
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            総額 <span className="text-white font-bold">{totalValue.toLocaleString()}円相当</span> の特典が無料でもらえる
          </p>
          
          {/* 価値訴求 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-[#4F46E520] to-[#2DD4FF10] px-6 py-3 rounded-lg border border-[#4F46E530] max-w-xl"
          >
            <p className="text-gray-300">
              <span className="text-white font-medium">通常は有料販売</span>しているコンテンツですが、今回のチャレンジ参加者限定で<span className="text-[#2DD4FF] font-bold">すべて無料プレゼント</span>します！
            </p>
          </motion.div>
        </motion.div>
        
        {/* カテゴリタブ */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {benefitCategories.map((category) => (
            <button
              key={category.id}
              className={`px-5 py-3 rounded-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] text-white font-bold shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>
        
        {/* 特典リスト - AnimatePresenceでカテゴリ切り替えアニメーション */}
        <div className="relative min-h-[360px] mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-3"
            >
              {activeCategoryData.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-900 p-5 rounded-xl border ${
                    benefit.highlight 
                      ? 'border-[#2DD4FF] shadow-lg shadow-[#2DD4FF20]' 
                      : 'border-gray-800'
                  }`}
                  onClick={() => trackClick(`benefit_${benefit.id}`)}
                >
                  {/* 特典バッジ */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-[#4F46E5] text-white text-xs font-bold px-3 py-1 rounded-full">
                      特典 {benefit.id}
                    </div>
                    {benefit.highlight && (
                      <div className="bg-[#2DD4FF] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full">
                        人気No.1
                      </div>
                    )}
                  </div>
                  
                  {/* タイトル */}
                  <h3 className="text-lg font-bold mb-3">
                    {benefit.title}
                  </h3>
                  
                  {/* 価値 */}
                  <div className="text-[#2DD4FF] font-bold mt-2 text-right">
                    {benefit.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* フッター - すべての特典を得るための条件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#4F46E520] to-[#2DD4FF10] px-6 py-4 rounded-lg border border-[#4F46E530]">
            <p className="text-lg font-medium mb-2">
              全9大特典をゲットする条件
            </p>
            <p className="text-gray-300">
              チャレンジの全日程に参加し、各日の課題を提出するだけ！<br />
              <span className="text-[#2DD4FF]">1日でも参加すれば一部の特典はすぐにもらえます</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BenefitsVariantB;