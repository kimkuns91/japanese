import { cn } from '@/utils/style';
import { signOut } from 'next-auth/react';

interface SideBarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
}
const SideBar: React.FC<SideBarProps> = ({
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  return (
    <div
      className="absolute left-0 top-0 z-[30] size-full cursor-pointer  bg-slate-900/80"
      onClick={() => {
        setIsSideBarOpen(false);
      }}
    >
      <div
        className={cn(
          `sideBar flex h-full max-w-[330px] flex-col bg-white px-6 py-8`
        )}
      >
        <button
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default SideBar;
