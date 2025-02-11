// src/components/FAQ/index.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: '技術的な知識がなくても参加できますか？',
    answer: 'はい、できます。AIが全ての技術的な部分をサポートしますので、指示を出すスキルさえあれば問題ありません。'
  },
  {
    question: 'セミナー開始時間に参加できない場合はどうなりますか？',
    answer: '遅れての参加も可能です。ただし、特典は課題提出が必要となりますのでご注意ください。'
  },
  {
    question: '課題はどのくらいの時間がかかりますか？',
    answer: '1日30分~1時間程度の作業で完了できる内容です。AIが作業の大部分を担当するため、効率的に進められます。'
  },
  {
    question: '課題の提出は必須ですか？',
    answer: '提出は任意ですが、特典の受け取りには課題提出が必要となります。また、学習効果を最大化するためにも提出をお勧めしています。'
  },
  {
    question: '使用するツールの費用はかかりますか？',
    answer: '50万トークン無料で差し上げます。上手に行えばこちらで完成させることができます。足りない場合の補充に関しましてはチャレンジ内でご説明させていただきます。'
  },
  {
    question: '本当に5日間でLP制作ができるようになりますか？',
    answer: 'はい。実際に多くの参加者が5日間でオリジナルLPの制作に成功しています。完成保証付きですので、安心してご参加いただけます。'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container-custom relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">よくあるご質問</h2>
          <p className="text-gray-400">
            ご不明な点は、以下をご確認ください
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg pr-8">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#2DD4FF]"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-300 border-t border-gray-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 追加の問い合わせ案内 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            その他のご質問は、チャレンジ中にいつでもお気軽にお問い合わせください。
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;