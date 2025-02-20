// src/components/ValueProposition/index.tsx
'use client';

import { motion } from 'framer-motion';

const ValueProposition = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF605] to-transparent" />

      <div className="container-custom relative z-10 max-w-4xl mx-auto px-4">
        {/* ヘッダー */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            衝撃の事実を、
            <br />
            <span className="text-[#8B5CF6]">あなたにお伝えします。</span>
          </h2>
          
          <p className="text-xl text-gray-200 mt-6">
            ブルーランプを使ったAILPは、コピーライター以上の反応率、<br></br>
            制作会社以上のクオリティ、ノーコード以上の速度とコストでLPが完成
          </p>
        </motion.div>

        {/* ポジショニングマップ */}
        <div className="relative h-[600px] w-full max-w-[800px] mx-auto mb-20">
          {/* 背景グリッド */}
          <div className="absolute inset-0 bg-gray-800/20 rounded-lg border border-gray-700" />

          {/* 軸 */}
          <div className="absolute inset-0">
            {/* Y軸：コスト */}
            <div className="absolute h-full w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 left-1/2 transform -translate-x-1/2">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-gray-400 whitespace-nowrap">
                高コスト
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 whitespace-nowrap">
                低コスト
              </div>
            </div>
            {/* X軸：反応率 */}
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 top-1/2 transform -translate-y-1/2">
              <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 text-gray-400 whitespace-nowrap">
                低反応率
              </div>
              <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 text-gray-400 whitespace-nowrap">
                高反応率
              </div>
            </div>
          </div>
          {/* 制作会社（左上） */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-[20%] top-[20%] w-40"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-blue-400/20 rounded-lg blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900 p-4 rounded-lg border border-blue-400/50">
                <p className="text-blue-400 font-bold">制作会社</p>
                <p className="text-sm text-gray-400">150-200万円〜</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-300">・高額なコスト</p>
                  <p className="text-xs text-gray-300">・反応率は不確実</p>
                  <p className="text-xs text-gray-300">・修正に時間が必要</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ブルーランプ（右上） */}
        {/* ブルーランプ（右上） */}
<motion.div
  initial={{ scale: 0 }}
  whileInView={{ scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="absolute right-[10%] top-[10%] w-40" // 位置を右上に調整
>
  <div className="relative group">
    {/* カードの本体 */}
    <div className="relative bg-gray-900 p-4 rounded-lg border border-yellow-400/50 transform group-hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-2">
        <p className="text-yellow-400 font-bold">ブルーランプ(AILP)</p>
      </div>
      <div className="mt-2 space-y-1">
        <p className="text-sm text-gray-400">最高の反応率</p>
        <p className="text-xs text-gray-300">・AIによる最適化</p>
        <p className="text-xs text-gray-300">・確実な成果</p>
        <p className="text-xs text-gray-300">・5時間で完成</p>
      </div>
    </div>

    {/* ホバーエフェクト */}
    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-[#8B5CF6]/30 to-yellow-400/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* 星マーク - カードの前面に配置 */}
    <div className="absolute -top-3 -right-3 w-12 h-12 z-20"> {/* z-indexを上げて前面に */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md animate-pulse" />
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full text-yellow-400 relative z-10"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.431 8.332 1.21-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.21z"/>
        </svg>
      </motion.div>
    </div>
  </div>
</motion.div>

            

          {/* ノーコード（左下） */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute left-[20%] bottom-[20%] w-40"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-red-400/20 rounded-lg blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900 p-4 rounded-lg border border-red-400/50">
                <p className="text-red-400 font-bold">ノーコード</p>
                <p className="text-sm text-gray-400">月額3-5万円</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-300">・自己作業が必要</p>
                  <p className="text-xs text-gray-300">・反応率が低い</p>
                  <p className="text-xs text-gray-300">・機能に制限あり</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* コピーライター（右下） */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute right-[20%] bottom-[20%] w-40"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-orange-400/20 rounded-lg blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900 p-4 rounded-lg border border-orange-400/50">
                <p className="text-orange-400 font-bold">コピーライター</p>
                <p className="text-sm text-gray-400">20-50万円〜</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-300">・文章のみ高品質</p>
                  <p className="text-xs text-gray-300">・デザインは別</p>
                  <p className="text-xs text-gray-300">・反応率は良好</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;