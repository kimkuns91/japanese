'use client';

import { Question } from '@/types/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ProgressBar from '../ProgressBar';
import StudyWrap from './StudyWrap';

const LearningWord = () => {
  const { data: session, status } = useSession();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      if (session?.user?.id && status === 'authenticated') {
        try {
          setLoading(true);
          const response = await axios.get(`/api/learning/${session.user.id}`);
          setQuestions(response.data);
        } catch (error) {
          console.error('Learning word fetch error:', error);
          setError('문제를 불러오는 데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [session?.user?.id, status]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center gap-20 bg-[#FFE1ED] p-4">
      <ProgressBar statistics={currentIndex} />
      {questions && questions.length != 0 && (
        <StudyWrap
          question={currentQuestion}
          questionsLength={questions.length}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
};

export default LearningWord;
