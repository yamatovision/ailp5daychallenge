'use client';

import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/common/ParticlesBackground';
import TypeWriter from '@/components/common/TypeWriter';
import Timer from '@/components/common/Timer';
import { useComponentTracker } from '@/hooks/useComponentTracker';

const HeroVariantA = () => {
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
      className="min-h-screen bg-[#1a1520] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden"
    >
      <ParticlesBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF610] via-[#6366F110] to-transparent opacity-30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container-custom max-w-[640px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="inline-block bg-gradient-to-r from-[#8B5CF620] to-[#6366F110] px-6 py-3 rounded-full border border-[#8B5CF630]">
            <span className="text-sm md:text-base">
              文章力不要、デザインセンス不要、ITスキルも一切不要
            </span>
          </div>

          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            <TypeWriter 
              text="AIで作る 刺さるLP 5日間無料チャレンジ！"
              delay={80}
            />
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg md:text-xl text-gray-300"
          >
            たった5日で、あなたの事業の"強み"を最大限引き出す最強集客LPが完成(このLPもこの工程で作成しています)
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative p-8 border-2 border-[#8B5CF630] rounded-lg bg-gradient-to-br from-[#8B5CF608] to-[#6366F108]"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#8B5CF6]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#6366F1]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#8B5CF6]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#6366F1]" />
            
            <div className="text-xl md:text-2xl font-bold">
            AIで作る 刺さるLP 5日間無料チャレンジ！
              <br />
              <span className="text-[#a78bfa]">
                参加者無料募集中
              </span>
            </div>
          </motion.div>

          <Timer />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4"
          >
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="メールアドレスを入力"
                required
                className="w-full p-4 rounded-lg bg-[#1a1520]/50 border border-[#8B5CF630]
                         focus:border-[#a78bfa] focus:outline-none transition-all
                         placeholder:text-gray-500"
                onChange={() => trackClick('email_input')}
              />
              <button 
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-[#2DD4FF] to-[#06C755] hover:from-[#47E2FF] hover:to-[#07E363] 
                       text-white font-bold py-5 px-6 rounded-lg
                       transition-all duration-300 transform hover:-translate-y-1
                       shadow-lg shadow-[#2DD4FF40] relative
                       group overflow-hidden"
                onClick={() => trackClick('cta_button')}
              >
                <div className="relative z-10">
                  <span className="text-lg md:text-xl block mb-1">
                    無料で参加する
                  </span>
                  <span className="text-2xl md:text-3xl block font-extrabold">
                    AIで作る刺さるLPチャレンジ
                  </span>
                  <span className="text-sm block mt-1 opacity-90">
                    ＼ 今すぐエントリーできます ／
                  </span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent
                            opacity-0 group-hover:opacity-20 transform -skew-x-45
                            transition-all duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroVariantA;