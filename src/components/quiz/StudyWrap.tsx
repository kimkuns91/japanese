'use client';

import { Question } from '@/types/types';
import { cn } from '@/utils/style';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface StudyWrapProps {
  question: Question;
  questionsLength: number;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
}

const StudyWrap: React.FC<StudyWrapProps> = ({
  question,
  questionsLength,
  currentIndex,
  setCurrentIndex,
}) => {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [inputWidth, setInputWidth] = useState('auto');

  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(
    null
  );
  const [wrongSound, setWrongSound] = useState<HTMLAudioElement | null>(null);
  const [completeSound, setCompleteSound] = useState<HTMLAudioElement | null>(
    null
  );

  const sentenceParts = question.sentence.split('___');
  const answerLength = question.word.length;

  useEffect(() => {
    setCorrectSound(new Audio('/audios/correct.mp3'));
    setWrongSound(new Audio('/audios/wrong.mp3'));
    setCompleteSound(new Audio('/audios/complete.mp3'));
  }, []);

  useEffect(() => {
    setInputWidth(`${Math.max(answerLength * 26, 40)}px`);
  }, [question, answerLength]);

  const handleChoiceClick = (choice: string) => {
    if (choice === question.word) {
      correctSound?.play();
      // 다음 문제가 있으면 다음 문제로 넘어감
      if (currentIndex < questionsLength - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserInput(''); // userInput 상태 초기화
      } else {
        // 모든 문제를 완료한 경우
        toast.success('모든 문제를 완료했습니다!');
        completeSound?.play();
        router.push('/');
      }
    } else {
      wrongSound?.play();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 top-[-38px] z-10 rounded-md bg-[#FEC3D7] px-6 py-2 text-lg font-semibold text-[#FFF]">
          레벨 {question.level}
        </div>
        <div className="relative z-[10] w-[400px] overflow-hidden rounded-md shadow-lg">
          <div className="h-28 bg-[#FFEAF1] px-6 pt-8 text-lg font-semibold">
            <p dangerouslySetInnerHTML={{ __html: question.translation }}></p>
          </div>
          <div className="h-28 bg-[#FFF6F9] px-6 pt-8 text-lg font-semibold">
            {sentenceParts[0]}{' '}
            <input
              className="rounded-md bg-[#FFD3E2] px-2 py-1 outline-none"
              style={{ width: inputWidth }}
              value={userInput}
              onChange={handleInputChange}
            />{' '}
            {sentenceParts[1]}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-2">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice.text)}
            className={cn(
              'm-1 rounded-md bg-[#FFBCD3] py-3 text-xl font-bold shadow-lg',
              'transition-all ease-in-out hover:opacity-70'
            )}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};
export default StudyWrap;
