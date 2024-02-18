import { Question as PrismaQuestion } from '@prisma/client';

export interface Question extends PrismaQuestion {
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}
