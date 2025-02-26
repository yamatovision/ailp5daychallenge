'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Timer from '@/components/common/Timer';
import { useComponentTracker } from '@/hooks/useComponentTracker';

const CallToActionVariantB = () => {
  // コンポーネント計測フックの使用
  const { componentRef, trackClick, trackConversion } = useComponentTracker('cta');
  
  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // コンバージョンイベントを記録
    trackConversion('email_signup');
    
    // メール送信処理（実際の実装ではここでAPIを呼び出すなど）
    alert('登録ありがとうございます！確認メールをお送りしました。');
  };
  
  return (
    <div 
      ref={componentRef}
      className="py-24 bg-gradient-to-b from-[#0D1117] to-[#101b29] relative overflow-hidden"
    >
      {/* 背景エフェクト - バリアントBでは異なるグラデーション */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E510] via-[#2DD4FF10] to-transparent" />
      </div>

      <div className="container-custom relative z-10 max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* 左側: 特典情報 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-[#4F46E530]"
          >
            <h3 className="text-2xl font-bold text-[#2DD4FF] mb-6">
              参加特典一覧
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#2DD4FF] mr-2 font-bold">✓</span>
                <span>LP制作用AI質問テンプレート集（75,000円相当）</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2DD4FF] mr-2 font-bold">✓</span>
                <span>コンバージョン率2倍の秘訣解説動画（35,000円相当）</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2DD4FF] mr-2 font-bold">✓</span>
                <span>LP制作素材集100点以上（画像・デザイン要素）</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2DD4FF] mr-2 font-bold">✓</span>
                <span>高速LPデザインテンプレート5種類</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2DD4FF] mr-2 font-bold">✓</span>
                <span className="font-medium">専門家による無料LP添削（抽選3名様限定）</span>
              </li>
            </ul>
            
            <div className="mt-6 text-center">
              <motion.div
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
                className="bg-gradient-to-r from-[#4F46E520] to-[#2DD4FF20] p-3 rounded-lg"
              >
                <p className="text-lg font-bold text-white">
                  豪華特典の総額: <span className="text-[#2DD4FF]">147,000円相当</span>
                </p>
                <p className="text-sm text-gray-300">
                  期間限定無料プレゼント中
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* 右側: 登録フォーム */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF]">
              今すぐ無料で参加する
            </h2>

            <div className="text-xl font-bold mb-4">
              AIで作る 刺さるLP 5日間無料チャレンジ！
            </div>

            {/* タイマー */}
            <Timer />

            {/* 申し込みフォーム */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-[#4F46E530]"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    メールアドレス <span className="text-[#2DD4FF]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    className="w-full p-4 rounded-lg bg-gray-800 border border-[#4F46E530] 
                           focus:border-[#4F46E5] focus:outline-none transition-all"
                    onChange={() => trackClick('email_input')}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    ※ご登録いただいたメールに詳細と特典をお送りします
                  </p>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] hover:from-[#5E58F6] hover:to-[#47E2FF]
                         text-white font-bold py-4 px-6 rounded-lg
                         transition-all duration-300 shadow-lg shadow-[#4F46E530]
                         transform hover:-translate-y-1"
                  onClick={() => trackClick('cta_button')}
                >
                  <span className="text-xl block">
                    無料で参加して特典をもらう
                  </span>
                </button>
                
                <div className="text-sm text-center text-gray-400 mt-2">
                  <span className="block mb-1">
                    残り <span className="text-[#2DD4FF] font-bold">3名様限定</span> の特典付き
                  </span>
                  <span className="block text-xs">
                    ※個人情報は厳重に管理し、チャレンジに関する連絡以外には使用しません
                  </span>
                </div>
              </form>
            </motion.div>

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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionVariantB;