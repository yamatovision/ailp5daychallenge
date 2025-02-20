// src/components/Curriculum/index.tsx
'use client';

import { motion } from 'framer-motion';

const curriculumData = [
  {
    day: '01',
    date: '3月3日（日）13:00～14:30',
    title: '爆速AILP作成の全体像',
    points: [
      'なぜAIに任せるべきか',
      'ノーコードLPより早くて成果が出る',
      '100万円相当の高品質LP作成全体像'
    ]
  },
  {
    day: '02',
    date: '3月4日（月）13:00～14:30',
    title: '文章力不要の最強コンセプト作成法',
    points: [
      '収益を最大化するAI市場リサーチ',
      '刺さる表現を抽出するプロンプトの秘密',
      'CPAを最安値にするコンセプト設計'
    ]
  },
  {
    day: '03',
    date: '3月5日（火）13:00～14:30',
    title: 'デザインセンス不要の登録率の高いLPフォーマット選定',
    points: [
      '登録率の高いLPモデルをコピーする方法',
      'AIを使ってデザインをハイセンスにする秘密',
      '売れているLPを見つける簡単な方法'
    ]
  },
  {
    day: '04',
    date: '3月6日（水）13:00～14:30',
    title: 'コーディング不要の爆速LP構築法',
    points: [
      'AIに高品質なLPのコードを書かせる方法',
      '制作費100万円レベルの高品質LPを書かせるプロンプトの秘密',
      'HP業者真っ青の爆速高品質LPコード出力テクニック'
    ]
  },
  {
    day: '05',
    date: '3月7日（木）13:00～14:30',
    title: '参加費450万円の2CCXで学んだ最強セールスファネルの秘密',
    points: [
      '即日で広告費を回収するセールスファネル',
      '高単価サービスの面談を自動でバンバン受注するウェビナーファネル',
      '最も熱いモデルのチャレンジファネル'
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
          ＼ たった5日でここまでできる ／
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