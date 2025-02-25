// src/components/Future/index.tsx
'use client';

import { motion } from 'framer-motion';

const Future = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* サイバーパンク風の背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4FF05] via-transparent to-[#2DD4FF05]" />
      </div>

      <div className="container-custom relative z-10 max-w-4xl mx-auto px-4">
        {/* インパクトのある導入 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[#2DD4FF]">文章力も</span>デザインセンスも、
            <br />
            <span className="text-[#2DD4FF]">ITスキル</span>も不要。
          </h2>
          <p className="text-2xl text-gray-200 font-bold">
            これが、AIの真の実力です。
          </p>
        </motion.div>

        {/* メインコンテンツ - カード形式で表示 */}
        <div className="space-y-12">
          {/* 差別化セクション */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-gray-900/50 p-8 rounded-2xl border-l-4 border-[#2DD4FF] shadow-lg"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              なぜなら、このAIは
              <br />
              単なる「文章生成」とは
              <br />
              <span className="text-[#2DD4FF] font-bold">次元が違う</span>からです。
            </h3>

            <div className="space-y-4 text-xl text-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 line-through">コピー作成ツール？</span>
                <span className="text-[#2DD4FF]">✕ 表面的な文章生成</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 line-through">デザインテンプレート？</span>
                <span className="text-[#2DD4FF]">✕ 没個性的な見た目</span>
              </div>
              <p className="text-2xl font-bold mt-6">
                そんな一般的なツールとは違います。
              </p>
            </div>
          </motion.div>

          {/* 実績セクション */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#2DD4FF]">
              AIが実現するのは、
              <br />
              人の心を動かす
              <br />
              究極のランディングページです。
            </h3>

            <div className="grid gap-4">
              {[
                '人の心理を完全理解したAIによる文章生成',
                '反応率を最大化する洗練されたデザイン',
                '成果を出し続けるLPの自動最適化'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-900 p-6 rounded-xl border border-[#2DD4FF]/20 hover:border-[#2DD4FF]/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#2DD4FF] font-bold text-2xl">0{index + 1}</span>
                    <span className="text-gray-200 text-lg">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* クロージング */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#2DD4FF]/10 via-[#2DD4FF]/5 to-transparent p-8 rounded-2xl"
          >
            <p className="text-2xl mb-6 text-gray-200">
              この5日間で手に入れるのは、
              <br />
              単なるLP制作スキルではありません。
            </p>
            <p className="text-3xl font-bold">
              <span className="text-[#2DD4FF]">あなたの事業の価値を
              <br />
              最大限に引き出す力</span>
              <br />
              です。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Future;