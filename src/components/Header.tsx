'use client';

import { useSession } from 'next-auth/react';
import { FaBars } from 'react-icons/fa6';

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="container flex items-center gap-4 border-b border-slate-200 py-4 text-lg">
      <FaBars />
      <p>{session?.user.name} 님</p>
    </div>
  );
};
export default Header;
