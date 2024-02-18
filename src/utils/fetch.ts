import { cache } from 'react';

export const getQuiz = cache(async (userId: string) => {
  // 1단계: 사용자 레벨 조회
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      level: true,
    },
  });

  if (!user || user.level === null) {
    return { message: 'User level not set' };
  }

  const minLevel = Math.max(1, user.level - 5);
  const maxLevel = user.level + 5;
  const answeredQuestionIds = await prisma.userAnswer.findMany({
    where: {
      userId,
    },
    select: {
      questionId: true,
    },
  });
  const answeredIds = answeredQuestionIds.map((a: any) => a.questionId);

  const unansweredQuestions = await prisma.question.findMany({
    where: {
      NOT: {
        id: {
          in: answeredIds,
        },
      },
      AND: {
        level: {
          lte: minLevel,
          gte: maxLevel,
        },
      },
    },
    take: 10,
    orderBy: { id: 'asc' },
    include: {
      choices: true,
    },
  });
  return unansweredQuestions;
});
