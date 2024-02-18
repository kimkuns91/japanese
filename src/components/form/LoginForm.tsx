'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RiKakaoTalkFill } from 'react-icons/ri';

const LoginForm = () => {
  const router = useRouter();

  return (
    /* eslint-disable-next-line */
    <div className="flex w-full max-w-[330px] mx-auto flex-col gap-4 min-h-screen z-20 py-28 lg:py-40">
      <div className="mt-8">
        <button
          className="flex w-full flex-row items-center justify-center gap-1 rounded-md bg-[#FEE500] px-5 py-3 font-medium text-slate-900"
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          <RiKakaoTalkFill className="text-2xl" />
          카카오로 1초 만에 시작하기
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
