'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState('');
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [level, setLevel] = useState(1);
  // 모든 choices의 isCorrect를 기본적으로 false로 초기화합니다.
  const [choices, setChoices] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = choices.map((choice, i) => {
      if (i === index) {
        return { ...choice, text };
      }
      return choice;
    });
    setChoices(newChoices);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedChoices = choices.map((choice) => ({
      ...choice,
      // 입력한 단어와 choice의 텍스트가 같으면 true, 아니면 false
      isCorrect: choice.text === word,
    }));
    // API 호출로 백엔드에 데이터 전송
    const response = await axios.post('/api/questions', {
      sentence: question,
      word,
      translation,
      level,
      choices: updatedChoices,
    });
    if (response.status === 200) {
      toast.success('Question created successfully!');
    } else {
      // 에러 처리
      toast.error('Failed to create question.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col gap-2 py-4"
    >
      <div className="flex flex-col gap-2">
        <label>문장</label>
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>단어</label>
        <Input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>한국어 번역</label>
        <Input
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>레벨</label>
        <Input
          type="number"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          required
        />
      </div>
      {choices.map((choice, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label>답안 {index + 1}</label>
          <Input
            type="text"
            value={choice.text}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            required
          />
        </div>
      ))}
      <Button type="submit">만들기</Button>
    </form>
  );
}
