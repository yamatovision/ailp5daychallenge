// src/components/Benefits/index.tsx
'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    id: '01',
    title: '10億円コンテンツ事業構築法',
    condition: 'オープンチャット登録で即時配布',
    highlight: true
  },
  {
    id: '02',
    title: 'ダンケネディの会社を買収したファネルの裏側',
    condition: 'Day1課題提出者特典'
  },
  {
    id: '03',
    title: '広告費を即日回収するセールスファネルの作り方',
    condition: 'Day2課題提出者特典'
  },
  {
    id: '04',
    title: '高パフォーマーFB広告運用マニュアル',
    condition: 'Day3課題提出者特典'
  },
  {
    id: '05',
    title: '登録者450万人DanLok直伝のYouTube戦略',
    condition: 'Day4課題提出者特典'
  },
  {
    id: '06',
    title: 'AIを使ってコンテンツ生成を全自動工場化する方法',
    condition: '5日間完走者特典'
  },
  {
    id: '07',
    title: '450万円プログラムで明かされた10のビジネス資産',
    condition: '5日間完走者特典'
  },
  {
    id: '08',
    title: '超富裕層が明かした100億円投資プラン',
    condition: '5日間完走者特典'
  },
  {
    id: '09',
    title: 'ハイチケットクロージングテンプレート',
    condition: '5日間完走者特典'
  }
];
const Benefits = () => {
  return (
      <div className="py-24 relative overflow-hidden">

      <div className="container-custom relative z-10 max-w-2xl mx-auto px-4">
        {/* ヘッダー部分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
      
          
          <h2 className="text-2xl font-bold mb-2">
            AI爆速LP5日間チャレンジ
          </h2>
          <p className="text-4xl font-bold text-[#8B5CF6] mb-2">豪華9大特典</p>
          
          {/* 装飾ライン */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#2DD4FF] to-blue-600 mx-auto" />
        </motion.div>

        {/* 特典リスト */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-900 rounded-lg overflow-hidden"
            >
              {/* 特典番号 */}
              <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] flex items-center justify-center">
                <span className="text-2xl font-bold text-black">
                  {benefit.id}
                </span>
              </div>

              {/* コンテンツ */}
              <div className="pl-20 pr-6 py-6">
                <h3 className="text-xl font-bold mb-2 text-white">
                  『{benefit.title}』
                </h3>
                <p className="text-sm text-[#2DD4FF]">
                  ※{benefit.condition}
                </p>
              </div>

              {/* ホバーエフェクト */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4FF10] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;