'use client';

import Button from '@/components/Button';
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
  const router = useRouter()
  const [userInput, setUserInput] = useState('');
  const [inputWidth, setInputWidth] = useState('auto');
  const [isCorrect, setIsCorrect] = useState(false);

  const sentenceParts = question.sentence.split('___');
  const answerLength = question.word.length;

  const correctSound = new Audio('/audios/correct.mp3');
  const wrongSound = new Audio('/audios/wrong.mp3');
  const completeSound = new Audio('/audios/complete.mp3');


  useEffect(() => {
    setInputWidth(`${Math.max(answerLength * 22, 40)}px`);
  }, [question, answerLength]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setInputWidth(
      `${Math.max(e.target.value.length * 22, answerLength * 22)}px`
    );
  };

  const handleChoiceClick = (choice: string) => {
    setUserInput(choice); // 선택한 답변을 userInput 상태에 저장

    // 정답 확인 로직
    if (choice === question.word) {
      correctSound.play(); 
      // 다음 문제가 있으면 다음 문제로 넘어감
      if (currentIndex < questionsLength - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserInput(''); // userInput 상태 초기화
      } else {
        // 모든 문제를 완료한 경우
        toast.success('모든 문제를 완료했습니다!');
        completeSound.play(); 
        router.push('/')
      }
    } else {
      wrongSound.play()
    }
  };

  const checkAnswer = () => {
    if (userInput.trim() === question.word) {
      toast.success('정답입니다!');
      setIsCorrect(true);
      if (currentIndex < questionsLength - 1) {
      } else {
        toast.success('모든 문제를 완료했습니다!');
      }
    } else {
      setIsCorrect(false);
    }
  };

  const goToNextQuestion = () => {
    if (currentIndex < questionsLength - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setIsCorrect(false);
    } else {
      alert('모든 문제를 완료했습니다!');
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 top-[-38px] z-10 rounded-md bg-[#8BC4F1] px-6 py-2 text-lg font-semibold text-[#FFF]">
          레벨 {question.level}
        </div>
        <div className="relative z-[20] w-[400px] overflow-hidden rounded-md shadow-lg">
          <div className="h-28 bg-[#EEF7FD] px-6 pt-8 text-lg font-semibold">
            <p dangerouslySetInnerHTML={{ __html: question.translation }}></p>
          </div>
          <div className="h-28 bg-[#FBFBFB] px-6 pt-8 text-lg font-semibold">
            {sentenceParts[0]}{' '}
            <input
              className="rounded-md bg-[#D8E9FB] px-2 py-1 outline-none"
              style={{ width: inputWidth }}
              value={userInput}
              onChange={handleInputChange}
              onBlur={checkAnswer}
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
              'm-1 rounded-md bg-[#D8E9FB] py-3 text-xl font-bold shadow-lg',
              'transition-all ease-in-out hover:opacity-70'
            )}
          >
            {choice.text}
          </button>
        ))}
      </div>
      {isCorrect && (
        <div className="mt-4 flex justify-end">
          <Button onClick={goToNextQuestion}>다음 문제</Button>
        </div>
      )}
    </div>
  );
};
export default StudyWrap;
