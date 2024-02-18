import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sentence, word, translation, level, choices } = body;

    const question = await prisma.question.create({
      data: {
        sentence,
        word,
        translation,
        level,
        choices: {
          create: choices,
        },
      },
    });
    
    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
