'use client';

import Hero from '@/components/main/Hero';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (!session) return '/login';

  return (
    <div className="container flex h-screen w-full flex-col gap-4 py-4">
      <Hero />
    </div>
  );
}
