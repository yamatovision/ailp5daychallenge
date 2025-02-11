'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Timer from '@/components/common/Timer';

const CallToAction = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <motion.div 
          animate={{ 
            background: [
              'radial-gradient(circle at 50% 50%, #2DD4FF10 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #2DD4FF20 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #2DD4FF10 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <div className="container-custom relative z-10 max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            今すぐ始めましょう
          </h2>

          <div className="text-2xl font-bold mb-4">
            AI爆速LP制作5日間チャレンジ
          </div>

          {/* Timerコンポーネントを使用 */}
          <Timer />

          {/* 申し込みフォーム */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="w-full p-4 rounded-lg bg-gray-900 border border-[#2DD4FF30] 
                       focus:border-[#2DD4FF] focus:outline-none transition-all"
            />
            
            <button className="w-full bg-gradient-to-r from-[#2DD4FF] to-[#06C755] hover:from-[#47E2FF] hover:to-[#07E363] 
         text-white font-bold py-5 px-6 rounded-lg
         transition-all duration-300 transform hover:-translate-y-1
         shadow-lg shadow-[#2DD4FF40] relative
         group overflow-hidden">
  <div className="relative z-10">
    <span className="text-lg md:text-xl block mb-1">
      無料でAI爆速LP制作
    </span>
    <span className="text-2xl md:text-3xl block font-extrabold">
      5日間チャレンジに参加する
    </span>
    <span className="text-sm block mt-1 opacity-90">
      ＼ 今すぐエントリーできます ／
    </span>
  </div>
  {/* キラキラエフェクト */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent
              opacity-0 group-hover:opacity-20 transform -skew-x-45
              transition-all duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
</button>
          </motion.div>

          {/* フッターリンクのための余白追加 */}
          <div className="pb-32">
            {/* フッターリンク */}
            <div className="mt-8 text-sm text-gray-400 space-x-4">
              <Link href="/privacy-policy" className="hover:text-[#2DD4FF] transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/legal" className="hover:text-[#2DD4FF] transition-colors">
                特定商取引法に基づく表記
              </Link>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Copyright © 2024 All Rights Reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;