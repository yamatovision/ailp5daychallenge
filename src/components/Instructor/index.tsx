// src/components/Instructor/index.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const Instructor = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container-custom relative z-10 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左側：画像セクション */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* メイン画像 */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/tatsuya.png"
                alt="Tatsuya"
                fill
                className="object-cover"
              />
              {/* サイバーパンク風オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent opacity-50" />
            </div>

            {/* 実績バッジ */}
            <motion.div
  initial={{ scale: 0 }}
  whileInView={{ scale: 1 }}
  viewport={{ once: true }}
  className="absolute -top-6 -right-6 w-32 h-32 rounded-full transform rotate-12"
>
  {/* グラデーションの背景 */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#2DD4FF] rounded-full animate-spin-slow" />
  
  {/* ぼかし効果 */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-sm" />
  
  {/* コンテンツコンテナ */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/90 to-[#6366F1]/90 rounded-full backdrop-blur-sm flex items-center justify-center">
    <div className="text-white text-center font-bold">
      <div className="text-sm">1つの講座で</div>
      <div className="text-xl">8.4億円売上</div>
    </div>
  </div>
</motion.div>
          </motion.div>

          {/* 右側：プロフィール */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-5xl font-bold mb-2">Tatsuya</h2>
              <p className="text-[#8B5CF6]">AI開発プラットフォーム「ブルーランプ」開発者</p>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
                世界最高峰の英語版Claudeを搭載した独自のAIシステムを開発。従来10ヶ月かかっていた開発を16日で実現し、リリースからわずか1ヶ月で8桁の売上を達成。
              </p>
              
              <p>
                AI教育プラットフォームの開発では、6ヶ月の工程を30日まで短縮。さらに、ベトナムのトップシステム会社との提携を実現。
                単一のコンテンツサービスで8.4億円の売上を実現し、インフォトップグランプリで1位を獲得。神職資格保持者
              </p>

              {/* モットー */}
              <div className="bg-gradient-to-r from-[#8B5CF620] to-transparent p-6 rounded-xl border-l-4 border-[#8B5CF6] my-8">
                <p className="text-xl font-bold text-white">
                  「日本のディジタル競争力を世界No1にする」
                </p>
              </div>

              <p>
                をモットーに、1700万円規模のアプリケーション開発から、非技術者による爆速開発まで、常識を覆す革新的な手法を次々と生み出している。
              </p>

              <p>
                現在は、AI開発の民主化を目指し、誰もが高度な開発スキルを身につけられる環境の構築に注力している。
              </p>
            </div>

            {/* 実績ハイライト */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-900 p-4 rounded-lg border border-[#8B5CF630]">
                <div className="text-[#8B5CF6] text-2xl font-bold">10ヶ月 → 16日</div>
                <div className="text-sm text-gray-400">開発期間短縮</div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-[#8B5CF630]">
                <div className="text-[#8B5CF6] text-2xl font-bold">8.4億円</div>
                <div className="text-sm text-gray-400">単一サービス売上</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;