import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

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
      return NextResponse.json(
        { message: 'User level not set' },
        { status: 404 }
      );
    }

    const minLevel = Math.max(1, user.level - 5);
    const maxLevel = user.level + 5;

    console.log('minLevel : ', minLevel);
    console.log('maxLevel : ', maxLevel);
    // 2단계: 사용자 레벨에 맞는 문제 조회
    const answeredQuestionIds = await prisma.userAnswer.findMany({
      where: {
        userId,
      },
      select: {
        questionId: true,
      },
    });
    const answeredIds = answeredQuestionIds.map((a) => a.questionId);

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

    console.log(unansweredQuestions);
    return NextResponse.json(unansweredQuestions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
