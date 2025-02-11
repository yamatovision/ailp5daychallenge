// src/components/common/TypeWriter/index.tsx
'use client';
import { useState, useEffect } from 'react';

const TypeWriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  // 特定の文字列に色を付ける
  const highlightText = (text: string) => {
    return text
      .replace(/(200万円|たった5時間|完成)/g, '<span class="text-[#2DD4FF]">$1</span>');
  };

  return (
    <span 
      dangerouslySetInnerHTML={{ 
        __html: highlightText(displayText) 
      }} 
    />
  );
};

export default TypeWriter;