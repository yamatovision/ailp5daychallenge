// src/components/FloatingCTA/index.tsx
'use client';

import { motion } from 'framer-motion';

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const FloatingCTA = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/95 to-transparent pb-6 pt-8"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-[#8B5CF6]/30 shadow-lg"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* タイトル */}
          <div className="text-center mb-4">
            <div className="text-[#2DD4FF] font-bold text-lg mb-1">
              AIが作る 刺さるLP 5日間無料チャレンジ
            </div>
            <div className="text-white text-sm">
              文章力もデザインセンスもITスキルも不要
            </div>
          </div>

          {/* 入力フォーム */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 p-4 text-lg rounded-xl bg-gray-800/90 border-2 border-[#8B5CF6]/30 
                       focus:border-[#8B5CF6] focus:outline-none transition-all
                       placeholder:text-gray-500"
            />
            
            <motion.button
              animate={pulseAnimation}
              whileHover={{
                scale: 1.02,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #2DD4FF 100%)',
              }}
              whileTap={{ scale: 0.98 }}
              className="relative text-white font-bold py-4 px-8 text-lg rounded-xl
                       whitespace-nowrap shadow-lg transition-all duration-300
                       bg-[#8B5CF6] hover:shadow-[#8B5CF6]/20 hover:shadow-xl"
              style={{
                transition: 'all 0.3s ease'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
              <span className="relative z-10">無料で参加する</span>
            </motion.button>
          </div>

          {/* 特典訴求 */}
          <div className="mt-3 text-center">
            <p className="text-[#2DD4FF] text-sm">
              ＼ 全9大特典付き！参加者に特別プレゼント ／
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;