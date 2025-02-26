'use client';

import React, { useState } from 'react';
import { TestableComponent } from '@/types/ab-test';
import { AnalyticsFilter } from '@/types/analytics';
import { useComponentAnalyses } from '@/hooks/useAnalytics';
import { clearTestData } from '@/lib/ab-test/client';

/**
 * ABテスト分析ダッシュボード
 */
export default function DashboardPage() {
  // フィルター
  const [filter, setFilter] = useState<AnalyticsFilter>({});
  
  // コンポーネント分析データを取得
  const { analyses, loading, refresh } = useComponentAnalyses(filter);
  
  // データをリセット
  const handleReset = async () => {
    if (confirm('すべてのテストデータをリセットしますか？この操作は元に戻せません。')) {
      await clearTestData();
      refresh();
    }
  };
  
  // フィルター変更（将来的な拡張用）
  /* const handleFilterChange = (key: keyof AnalyticsFilter, value: unknown) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }));
  }; */
  
  // コンポーネント名を表示用に変換
  const getComponentName = (componentId: TestableComponent): string => {
    const names: Record<TestableComponent, string> = {
      'hero': 'ヒーローセクション',
      'cta': 'コールトゥアクション',
      'floatingCta': 'フローティングCTA',
      'benefits': '特典・メリット',
      'curriculum': 'カリキュラム',
      'faq': 'よくある質問'
    };
    
    return names[componentId] || componentId;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          ABテスト分析ダッシュボード
        </h1>
        <p className="text-gray-400">
          コンポーネント別のパフォーマンスを分析し、最適なバリアントを特定します
        </p>
      </header>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          データを更新
        </button>
        
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          テストデータをリセット
        </button>
      </div>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 mb-12">
        {loading ? (
          <div className="col-span-full p-12 text-center">
            <p className="text-xl text-gray-400">データを読み込み中...</p>
          </div>
        ) : analyses.length === 0 ? (
          <div className="col-span-full p-12 text-center border border-gray-700 rounded-lg">
            <h3 className="text-xl mb-4">データがありません</h3>
            <p className="text-gray-400">
              まだABテストのデータが収集されていません。サイトを閲覧してデータを生成してください。
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-3 text-left">コンポーネント</th>
                  <th className="p-3 text-left">バリアント</th>
                  <th className="p-3 text-right">訪問者数</th>
                  <th className="p-3 text-right">コンバージョン数</th>
                  <th className="p-3 text-right">コンバージョン率</th>
                  <th className="p-3 text-right">平均滞在時間</th>
                  <th className="p-3 text-center">改善率</th>
                  <th className="p-3 text-center">統計的信頼度</th>
                  <th className="p-3 text-center">プレビュー</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((analysis, index) => (
                  <React.Fragment key={analysis.componentId}>
                    {/* バリアントA の行 */}
                    <tr className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-transparent'}>
                      <td rowSpan={2} className="p-3 align-middle">
                        {getComponentName(analysis.componentId)}
                      </td>
                      <td className="p-3 text-blue-400">A</td>
                      <td className="p-3 text-right">{analysis.variantA.visitors}</td>
                      <td className="p-3 text-right">{analysis.variantA.conversions}</td>
                      <td className="p-3 text-right">{analysis.variantA.conversionRate.toFixed(2)}%</td>
                      <td className="p-3 text-right">{(analysis.variantA.avgTimeOnComponent / 1000).toFixed(1)}秒</td>
                      <td rowSpan={2} className="p-3 text-center align-middle">
                        <span className={analysis.improvement > 0 ? 'text-green-400' : 'text-red-400'}>
                          {analysis.improvement > 0 ? '+' : ''}{analysis.improvement.toFixed(2)}%
                        </span>
                      </td>
                      <td rowSpan={2} className="p-3 text-center align-middle">
                        <div className="flex flex-col items-center">
                          <span className={analysis.isSignificant ? 'text-green-400' : 'text-gray-400'}>
                            {analysis.confidence.toFixed(0)}%
                          </span>
                          {analysis.isSignificant && (
                            <span className="text-xs text-green-400 mt-1">有意差あり</span>
                          )}
                        </div>
                      </td>
                      <td rowSpan={2} className="p-3 text-center align-middle">
                        <div className="flex flex-col gap-2">
                          <a 
                            href={`/?variant_${analysis.componentId}=a`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-center"
                          >
                            Aパターン
                          </a>
                          <a 
                            href={`/?variant_${analysis.componentId}=b`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm text-center"
                          >
                            Bパターン
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    {/* バリアントB の行 */}
                    <tr className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-transparent'}>
                      <td className="p-3 text-purple-400">B</td>
                      <td className="p-3 text-right">{analysis.variantB.visitors}</td>
                      <td className="p-3 text-right">{analysis.variantB.conversions}</td>
                      <td className="p-3 text-right">{analysis.variantB.conversionRate.toFixed(2)}%</td>
                      <td className="p-3 text-right">{(analysis.variantB.avgTimeOnComponent / 1000).toFixed(1)}秒</td>
                    </tr>
                    
                    {/* 区切り線 */}
                    {index < analyses.length - 1 && (
                      <tr>
                        <td colSpan={9} className="py-2">
                          <div className="border-b border-gray-700"></div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <footer className="text-center mt-12 pt-6 border-t border-gray-800 text-gray-500 text-sm">
        <p>
          ABテスト分析ダッシュボード - ユーザーデータは匿名化されており、ローカルストレージにのみ保存されています。
        </p>
      </footer>
    </div>
  );
}