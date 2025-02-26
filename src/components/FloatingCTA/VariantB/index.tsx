'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentTracker } from '@/hooks/useComponentTracker';

// より目立つパルスアニメーション
const strongPulseAnimation = {
  scale: [1, 1.05, 1],
  boxShadow: [
    '0 10px 15px -3px rgba(45, 212, 255, 0.1)',
    '0 15px 25px -5px rgba(45, 212, 255, 0.3)',
    '0 10px 15px -3px rgba(45, 212, 255, 0.1)'
  ],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const FloatingCTAVariantB = () => {
  // コンポーネント計測フックの使用
  const { componentRef, trackClick, trackConversion } = useComponentTracker('floatingCta');
  
  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // コンバージョンイベントを記録
    trackConversion('email_signup');
    
    // メール送信処理（実際の実装ではここでAPIを呼び出すなど）
    alert('登録ありがとうございます！確認メールをお送りしました。');
  };
  
  // ミニ化状態の管理
  const [isMinimized, setIsMinimized] = useState(false);
  
  // ミニ化・展開切り替え
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    trackClick(isMinimized ? 'expand_cta' : 'minimize_cta');
  };
  
  return (
    <motion.div
      ref={componentRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // ミニ化バージョン
          <motion.div
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            <motion.button
              animate={strongPulseAnimation}
              className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] text-white font-bold
                        rounded-full p-4 shadow-lg shadow-[#4F46E530] flex items-center space-x-2"
              onClick={toggleMinimize}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span className="hidden md:inline">無料チャレンジに参加</span>
            </motion.button>
            
            {/* 通知バッジ */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              1
            </div>
          </motion.div>
        ) : (
          // フル表示バージョン
          <motion.div
            key="expanded"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0F172A]/95 backdrop-blur-md rounded-xl p-5 border border-[#4F46E530] shadow-xl
                     max-w-sm w-full relative"
          >
            {/* 閉じるボタン */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={toggleMinimize}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* 緊急感を出すヘッダー */}
            <div className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] text-white py-2 px-4 rounded-lg mb-4 text-center">
              <p className="font-bold">残りわずか！特別枠の募集</p>
            </div>
            
            {/* タイトル */}
            <h3 className="text-xl font-bold mb-2 text-white">
              AI時代の必須スキル！<br />LP制作5日間無料チャレンジ
            </h3>
            
            <p className="text-gray-300 text-sm mb-4">
              特典総額<span className="text-[#2DD4FF] font-bold"> 147,000円相当</span>のスキルが手に入ります
            </p>
            
            {/* 入力フォーム */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="メールアドレス"
                required
                className="w-full p-3 text-sm rounded-lg bg-gray-800 border border-[#4F46E530] 
                         focus:border-[#4F46E5] focus:outline-none transition-all"
                onChange={() => trackClick('email_input')}
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] hover:from-[#5E58F6] hover:to-[#47E2FF]
                       text-white font-bold py-3 px-4 rounded-lg
                       transition-all duration-300 shadow-lg"
                onClick={() => trackClick('cta_button')}
              >
                今すぐ無料で参加する
              </motion.button>
            </form>
            
            {/* 特典リスト - コンパクトに */}
            <div className="mt-3 text-xs text-gray-400">
              <p className="font-bold text-center text-[#2DD4FF] mb-1">参加特典</p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="text-[#2DD4FF] mr-1">✓</span>
                  <span>AI質問テンプレート集（75,000円相当）</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2DD4FF] mr-1">✓</span>
                  <span>コンバージョン率2倍の秘訣動画</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingCTAVariantB;