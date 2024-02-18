import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from './prisma';

if (
  !process.env.KAKAO_CLIENT_ID ||
  !process.env.KAKAO_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  console.error('환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        if (account?.provider === 'kakao') {
          console.log('Kakao로 로그인 시도');

          const db_user = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          // 이미 이메일 인증으로 가입한 경우 에러 처리
          if (db_user && db_user.provider === 'credentials') {
            throw new Error(
              '이미 이메일 인증으로 가입된 계정입니다. 해당 계정으로 로그인해주세요.'
            );
          }

          if (!db_user) {
            const hashedPassword = await bcrypt.hash(randomUUID(), 12);
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                password: hashedPassword,
                image: profile?.properties?.profile_image,
                provider: 'kakao',
              },
            });

            user.id = newUser.id;
            user.image = newUser.image;
            user.role = newUser.role;
            user.provider = newUser.provider;
            return true;
          }

          user.id = db_user.id;
          user.image = db_user.image;
          user.role = db_user.role;
          user.provider = db_user.provider;
          return true;
        }
        return true;
      } catch (error) {
        console.error('로그인 도중 에러가 발생했습니다: ' + error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.provider = user.provider;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
        session.user.role = token.role as Role;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
};
