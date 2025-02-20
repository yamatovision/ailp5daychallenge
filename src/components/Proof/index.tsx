// src/components/Guarantee/index.tsx
'use client';

import { motion } from 'framer-motion';

const Guarantee = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-[#2DD4FF] opacity-[0.02] transform rotate-45" />
      
      <div className="container-custom relative z-10 max-w-4xl mx-auto px-4">
        {/* スタンプ風の保証マーク */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="absolute top-0 right-4 md:right-20 -translate-y-1/2 w-32 h-32 transform rotate-12"
        >
          {/* グラデーションの背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#2DD4FF] rounded-full" />
          
          {/* 光るエフェクト */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
          
          {/* テキストコンテナ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-center transform -rotate-12">
              <div className="text-xs">業界初！</div>
              <div className="text-lg">成果保証</div>
            </div>
          </div>

          {/* オプション: 光の輝き効果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full animate-shine" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            反応率向上保証
          </h2>
        </motion.div>

        {/* メインの保証内容 */}
        <div className="relative">
          {/* デザイン要素：左上の装飾 */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#8B5CF6]" />
          {/* デザイン要素：右下の装飾 */}
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#8B5CF6]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#8B5CF610] to-transparent p-8 rounded-xl border border-[#8B5CF630] relative overflow-hidden"
          >
            {/* ホログラム風エフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5CF610] to-transparent animate-shine" />

            <div className="text-xl md:text-2xl leading-relaxed mb-12">
              文章力もデザインセンスも必要ありません。
              <br />
              AIの力で、あなたのLPは必ず
              <br />
              <span className="text-[#8B5CF6] font-bold">成果を出します。</span>
            </div>

            {/* 保証内容のボックス */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg border border-[#8B5CF650] relative"
            >
              <div className="text-lg mb-4">
                もし5日間全ての授業に出席して取り組んでも、
                <br />
                「反応率が上がらない」
                <br />
                という結果だった場合、
              </div>
              <div className="text-2xl md:text-3xl font-bold text-[#8B5CF6]">
                迷惑料として
                <span className="text-4xl md:text-5xl mx-2">3,000</span>
                円を
                <br />
                お支払いいたします。
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 補足説明 */}
        <div className="mt-6 text-center text-sm text-gray-300 space-y-2">
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Guarantee;