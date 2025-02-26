'use client';

import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/common/ParticlesBackground';
import TypeWriter from '@/components/common/TypeWriter';
import Timer from '@/components/common/Timer';
import { useComponentTracker } from '@/hooks/useComponentTracker';

const HeroVariantB = () => {
  // コンポーネント計測フックの使用
  const { componentRef, trackClick, trackConversion } = useComponentTracker('hero');
  
  // メールフォーム送信時の処理
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
      className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden"
    >
      <ParticlesBackground />
      
      {/* 背景装飾 - バリアントBではより明るく目立つ背景エフェクトを使用 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E520] via-[#2DD4FF15] to-transparent opacity-40" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      
      {/* デザインアクセント（光の線） */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] via-[#2DD4FF] to-[#4F46E5] opacity-70" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F46E5] via-[#2DD4FF] to-[#4F46E5] opacity-70" />

      <div className="container-custom max-w-[640px] mx-auto relative z-10">
        <div className="text-center space-y-8">
          {/* バッジ */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-gradient-to-r from-[#4F46E520] to-[#2DD4FF20] px-6 py-3 rounded-full border border-[#4F46E530]"
          >
            <span className="text-sm md:text-base font-medium">
              プロ顔負けのLPを5日間で作れるようになる
            </span>
          </motion.div>

          {/* メインタイトル - バリアントBでは問題解決型アプローチ */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#2DD4FF] to-white"
          >
            <TypeWriter 
              text="AI時代の必須スキル！LP制作5日間無料チャレンジ"
              delay={70}
            />
          </motion.h1>

          {/* サブタイトル */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300"
          >
            なぜあなたのLPは成果が出ないのか？AIを使えば、コード不要・デザイン不要で
            <span className="text-[#2DD4FF] font-bold">誰でも簡単に高コンバージョンLPが作れる</span>ようになります
          </motion.p>

          {/* 特典ボックス - バリアントBでは特典を強調 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a222e] p-8 rounded-xl border border-[#4F46E540] shadow-lg shadow-[#4F46E510]"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              チャレンジ参加者だけの3つの特典
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <div className="text-[#2DD4FF] mr-2 mt-1">✓</div>
                <span>LP制作用AI質問テンプレート集（75,000円相当）</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#2DD4FF] mr-2 mt-1">✓</div>
                <span>コンバージョン率2倍の秘訣解説動画（35,000円相当）</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#2DD4FF] mr-2 mt-1">✓</div>
                <span>専門家による無料LP添削（1名様限定）</span>
              </li>
            </ul>
          </motion.div>

          {/* タイマー */}
          <Timer />

          {/* フォーム */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                required
                className="w-full p-4 rounded-lg bg-[#131c2d] border border-[#4F46E530]
                         focus:border-[#2DD4FF] focus:outline-none transition-all
                         placeholder:text-gray-500"
                onChange={() => trackClick('email_input')}
              />
              <p className="text-gray-400 text-xs text-left">※ご登録いただいたメールアドレスに詳細をお送りします</p>
              <button 
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-[#4F46E5] to-[#2DD4FF] hover:from-[#5E58F6] hover:to-[#47E2FF]
                       text-white font-bold py-5 px-6 rounded-lg
                       transition-all duration-300 shadow-lg shadow-[#4F46E530]
                       transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4F46E540]"
                onClick={() => trackClick('cta_button')}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-extrabold block">
                    今すぐ無料で参加する
                  </span>
                  <span className="text-sm block mt-1">
                    残り枠わずか！早めのご登録をおすすめします
                  </span>
                </div>
              </button>
            </form>
          </motion.div>
          
          {/* 信頼性要素 - バリアントBでは社会的証明を追加 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-2"
          >
            <p className="text-gray-400 text-sm">
              <span className="text-[#2DD4FF] font-bold">650名以上</span>が既にチャレンジに参加し、成果を出しています
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroVariantB;