'use client';

import { useEffect, useState } from 'react';
import { IoIosBookmarks } from 'react-icons/io';

type ProgressBarProps = {
  statistics: number;
};
const ProgressBar = ({ statistics }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 애니메이션 시작
    const percentage = (statistics / 10) * 100;

    // 막대 애니메이션
    const widthTimeoutId = setTimeout(() => {
      setWidth(percentage);
    }, 100); // 100ms 후에 애니메이션 시작

    return () => {
      clearTimeout(widthTimeoutId);
    };
  }, [statistics]);
  return (
    <div className="flex w-full items-center gap-4">
      <IoIosBookmarks className="text-3xl text-pink-500" />
      <div className="mr-3 h-6 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="button h-6 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="text-sm font-medium text-gray-700">
        {(statistics / 10) * 100}%
      </div>
    </div>
  );
};

export default ProgressBar;
