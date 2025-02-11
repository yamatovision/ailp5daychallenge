// src/components/DemoVideo/index.tsx
'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const DemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container-custom relative z-10 max-w-5xl mx-auto px-4">
        {/* ヘッダーテキスト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            非技術者でも
            <span className="text-[#2DD4FF]">超ハイセンス</span>
            な
            <br />
            HPやLPの制作は簡単にできる！
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ただ指示を出す「だけ」で
            <br className="md:hidden" />
            ノーコードツールやテンプレートや
            <br className="md:hidden" />
            格安HP業者が作成するLPやHPとは
            <br className="md:hidden" />
            一線を画する
            <span className="text-[#2DD4FF] font-bold">ハイブランドLP,HP</span>
            を
            <br className="md:hidden" />
            作成することができます。
          </p>
        </motion.div>

        {/* 動画セクション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* デコレーション要素 */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#2DD4FF]" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#2DD4FF]" />

          {/* 動画プレイヤー */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            {/* サイバーパンク風オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent z-10" />
            
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/video-thumbnail.jpg" // サムネイル画像
              onClick={() => {
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }
                }
              }}
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              お使いのブラウザは動画再生に対応していません。
            </video>

            {/* 再生ボタン */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }}
              >
                <div className="w-20 h-20 bg-[#2DD4FF] rounded-full flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 text-black" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 5v10l7-5-7-5z" />
                  </svg>
                </div>
              </motion.button>
            )}
          </div>

          {/* 動画の説明テキスト */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-gray-400"
          >
            ※ 実際にブルーランプを使用して作成している様子です
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoVideo;