'use client';

import Hero from '@/components/main/Hero';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return router.push('/login');

  return (
    <div className="container flex h-screen w-full flex-col gap-4 py-4">
      <Hero />
    </div>
  );
}
