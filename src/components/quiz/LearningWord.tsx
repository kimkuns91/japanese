'use client';

import { Question } from '@/types/types';
import { useState } from 'react';
import ProgressBar from '../ProgressBar';
import StudyWrap from './StudyWrap';

interface QuizContainerProps {
  quizzes: Question[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quizzes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quizzes[currentIndex];

  return (
    <div className="flex h-screen w-full flex-col items-center gap-20 bg-[#FFE1ED] p-4">
      <ProgressBar statistics={currentIndex} />
      <StudyWrap
        question={currentQuestion}
        questionsLength={quizzes.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default QuizContainer;
