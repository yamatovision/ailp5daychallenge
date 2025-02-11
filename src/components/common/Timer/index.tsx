// src/components/common/Timer/index.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';

const Timer = () => {
  // targetDateをuseMemoで初期化
  const targetDate = useMemo(() => new Date('2025-02-24T13:00:00+09:00'), []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // 初回実行

    return () => clearInterval(timer);
  }, [targetDate]); // targetDateを依存配列に含める

  return (
    <div className="mb-12">
      <p className="text-gray-400 mb-4">チャレンジ開始まであと...</p>
      <div className="grid grid-cols-4 gap-4">
        {[
          { value: timeLeft.days, label: '日' },
          { value: timeLeft.hours, label: '時間' },
          { value: timeLeft.minutes, label: '分' },
          { value: timeLeft.seconds, label: '秒' }
        ].map((time, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-lg border border-[#2DD4FF30]"
          >
            <div className="text-3xl font-bold text-[#2DD4FF]">
              {String(time.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-400">{time.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;