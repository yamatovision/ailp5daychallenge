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
            AILPはノーコードLP以上の速度と制作会社に以上の品質両方を実現します。
          
          </p>
        </motion.div>

        {/* ポジショニングマップ */}
        <div className="relative h-[600px] w-full max-w-[800px] mx-auto mb-20">
          {/* 背景グリッド */}
          <div className="absolute inset-0 bg-gray-800/20 rounded-lg border border-gray-700" />

          {/* 軸 */}
          <div className="absolute inset-0">
            {/* Y軸 */}
            <div className="absolute h-full w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 left-1/2 transform -translate-x-1/2">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-gray-40 whitespace-nowrap">
                高品質
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-40 whitespace-nowrap">
                低品質
              </div>
            </div>
            {/* X軸 */}
            <div className="absolute w-full h-0.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 top-1/2 transform -translate-y-1/2">
              <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 text-gray-40 whitespace-nowrap">
                高コスト
              </div>
              <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 text-gray-40 whitespace-nowrap">
                低コスト
              </div>
            </div>
          </div>

          {/* 4象限の説明 */}
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-50">
              高品質・高コスト
            </div>
            <div className="absolute top-[15%] right-[15%] transform translate-x-1/2 -translate-y-1/2 text-xs text-yellow-40">
              最適解
            </div>
            <div className="absolute bottom-[15%] left-[15%] transform -translate-x-1/2 translate-y-1/2 text-xs text-gray-50">
              低品質・高コスト
            </div>
            <div className="absolute bottom-[15%] right-[15%] transform translate-x-1/2 translate-y-1/2 text-xs text-gray-50">
              低品質・低コスト
            </div>
          </div>

          {/* プロット点 */}
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
                <p className="text-sm text-gray-40">200万円</p>
                <p className="text-xs text-gray-50 mt-1">・時間がかかる</p>
                <p className="text-xs text-gray-50 mt-1">・高品質は高い</p>
                <p className="text-xs text-gray-50">・追加料金が都度発生</p>
              </div>
            </div>
          </motion.div>

          {/* AILP（右上） - 星マーク付き */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute right-[20%] top-[20%] w-40"
          >
            <div className="relative group">
              {/* 星マークとその輝き効果 */}
              <div className="absolute -top-6 -right-6 w-12 h-12">
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

              {/* カードの輝き効果 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 via-[#8B5CF6]/30 to-yellow-400/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* メインカード */}
              <div className="relative bg-gray-900 p-4 rounded-lg border border-yellow-400/50 transform group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-yellow-400 font-bold">AILP</p>
                  <span className="text-[10px] text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded-full">BEST CHOICE</span>
                </div>
                <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-40">最安値</p>
                  <p className="text-xs text-gray-30">・7桁クラスの品質</p>
                  <p className="text-xs text-gray-30">・AI による最適化</p>
                  <p className="text-xs text-gray-30">・爆速で完成</p>
                </div>
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
              <div className="absolute -inset-2 bg-orange-400/20 rounded-lg blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900 p-4 rounded-lg border border-orange-400/50">
                <p className="text-orange-400 font-bold">ノーコードLP</p>
                <p className="text-sm text-gray-40">約30万円/年</p>
                <p className="text-xs text-gray-50 mt-1">・月額コストが継続的</p>
                <p className="text-xs text-gray-50">・カスタマイズに制限</p>
              </div>
            </div>
          </motion.div>

          {/* テンプレート（右下） */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute right-[20%] bottom-[20%] w-40"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-red-400/20 rounded-lg blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-900 p-4 rounded-lg border border-red-400/50">
                <p className="text-red-400 font-bold">テンプレート</p>
                <p className="text-sm text-gray-40">30万円/初期</p>
                <p className="text-xs text-gray-50 mt-1">・カスタマイズ不可</p>
                <p className="text-xs text-gray-50">・没個性的</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 説明テキスト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
         
        </motion.div>
      </div>
    </div>
  );
};

export default ValueProposition;