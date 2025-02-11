// src/components/Curriculum/index.tsx
'use client';

import { motion } from 'framer-motion';

const curriculumData = [
  {
    day: '01',
    date: '2月24日（月）13:00～14:30',
    title: '爆速AILP作成の全体像',
    points: [
      '5日間チャレンジの全体像の解説',
      'ノーコードツールよりもAILPの方が強い理由',
      'ブルーランプ(提供ツール)による市場分析と最適化'
    ]
  },
  {
    day: '02',
    date: '2月25日（火）13:00～14:30',
    title: '売れるLP構成の設計',
    points: [
      'マネしたいLPの選定方法',
      '参考LPに沿った文章作成の実践',
      'ブルーランプによるLP文章作成'
    ]
  },
  {
    day: '03',
    date: '2月26日（水）13:00～14:30',
    title: 'LP構築とコンテンツ最適化',
    points: [
      'ディレクトリ構造の設計',
      'ブルーランプによるコーディング',
      'セクション別コード生成の極意'
    ]
  },
  {
    day: '04',
    date: '2月27日（木）13:00～14:30',
    title: '実践QAセッション',
    points: [
      'つまずきやすいポイントの解消',
      '具体的な改善アドバイス',
      '成功事例の詳細解説'
    ]
  },
  {
    day: '05',
    date: '2月28日（金）13:00～14:30',
    title: 'デプロイと収益化戦略',
    points: [
      'インターネットへのデプロイ実践',
      '継続的な改善の仕組み化',
      '次のステップの具体的展開'
    ]
  }
];

const Curriculum = () => {
  return (
    <div className="py-24 bg-[#0D1117] relative">
      {/* ヘッダー部分 */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#2DD4FF] text-lg mb-4"
        >
          ＼ あなたにチャレンジしていただく ／
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-white mb-4"
        >
          5日間チャレンジの
          <br />
          内容はこちら
        </motion.h2>
      </div>

      {/* カリキュラム内容 */}
      <div className="max-w-3xl mx-auto px-4">
        {curriculumData.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative mb-8 last:mb-0"
          >
            {/* DAYラベル */}
            <div className="absolute -left-4 -top-4 bg-[#8B5CF6] text-black rounded-lg px-6 py-2 transform -rotate-6 font-bold z-10">
              <span className="text-sm">DAY</span>
              <span className="text-xl ml-1">{day.day}</span>
            </div>
            {/* コンテンツカード */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 pt-12 ml-8 hover:border-[#2DD4FF40] transition-all duration-300">
              {/* 日時 */}
              <div className="bg-[#2DD4FF20] text-[#2DD4FF] px-4 py-2 rounded-md inline-block mb-4">
                {day.date}
              </div>

              {/* タイトル */}
              <h3 className="text-xl font-bold text-white mb-4">
                『{day.title}』
              </h3>

              {/* ポイント */}
              <ul className="space-y-2">
                {day.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#2DD4FF] rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 接続線 */}
            {index < curriculumData.length - 1 && (
              <div className="absolute left-12 bottom-0 w-0.5 h-8 bg-[#2DD4FF] opacity-20" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;