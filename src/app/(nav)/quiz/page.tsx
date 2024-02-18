import QuizContainer from '@/components/quiz/LearningWord';
import { authOptions } from '@/libs/next-auth';
import { getQuiz } from '@/utils/fetch';
import { getServerSession } from 'next-auth';

async function fetchData(userId: string) {
  const quizzes = await getQuiz(userId);
  return quizzes;
}

export default async function QuizPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id!;
  const quizzes = await fetchData(userId);
  return <QuizContainer quizzes={quizzes} />;
}
