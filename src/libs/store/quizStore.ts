import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const quizStore = create(
  persist(
    (set) => ({
      currentIndex: 0,
      setCurrentIndex: (index: number) => set({ currentIndex: index }),
      questionsLength: 20,
      setQuestionsLength: (length: number) => set({ questionsLength: length }),
    }),
    {
      name: 'quiz-storage', // Local Storage에 저장될 때 사용될 키
    }
  )
);

export default quizStore;
