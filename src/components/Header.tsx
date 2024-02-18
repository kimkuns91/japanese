'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import SideBar from './SideBar';

const Header = () => {
  const { data: session } = useSession();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <div className="container flex items-center gap-4 border-b border-slate-200 py-4 text-lg">
        <FaBars
          className="cursor-pointer"
          onClick={() => {
            setIsSideBarOpen(true);
          }}
        />
        <p>{session?.user.name} 님</p>
      </div>
      {isSideBarOpen && (
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}
    </>
  );
};
export default Header;
