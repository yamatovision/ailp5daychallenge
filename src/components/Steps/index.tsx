// src/components/Steps/index.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'メールアドレスを入力',
    description: '入力完了後、専用オープンチャットへの案内があります。',
    icon: '/images/email-icon.svg' // メールアイコン画像
  },
  {
    number: '02',
    title: 'オープンチャットへ参加',
    description: '匿名で参加できるオープンチャットへご参加いただきます。',
    icon: '/images/chat-icon.svg' // チャットアイコン画像
  },
  {
    number: '03',
    title: '5日間チャレンジ開始',
    description: 'オープンチャットにて、セミナー内容や課題内容をご案内します。',
    icon: '/images/start-icon.svg' // 開始アイコン画像
  },
  {
    number: '04',
    title: '5日間チャレンジ完走',
    description: '完走者限定特典をお受け取りください。',
    icon: '/images/goal-icon.svg' // ゴールアイコン画像
  }
];

const Steps = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container-custom relative z-10 max-w-4xl mx-auto px-4">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-bold mb-2">5日間チャレンジ</h2>
          <p className="text-4xl font-bold text-[#2DD4FF]">参加までの流れ</p>
        </motion.div>

        {/* ステップ一覧 */}
        <div className="relative">
          {/* 接続線 */}
          <div className="absolute left-[25px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[#2DD4FF30]" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-center gap-8"
              >
                {/* ステップ番号 */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#2DD4FF] rounded-full flex items-center justify-center text-black font-bold z-10">
                  {step.number}
                </div>

                {/* コンテンツ */}
                <div className="flex-grow bg-gray-900 rounded-lg p-6 border border-[#2DD4FF30]">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* イラスト */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                  <Image
                    src={step.icon}
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;