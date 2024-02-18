import Header from '@/components/Header';
import SessionProvider from '@/components/SessionProvider';
import '@/styles/globals.css';
import { cn } from '@/utils/style';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Nanum_Gothic } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nanum_Gothic = Nanum_Gothic({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Japanese App',
  description: 'Japanese App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn(
          'scrollbar flex text-sm',
          'lg:text-base',
          nanum_Gothic.className
        )}
      >
        <SessionProvider session={session}>
          <div className="no-scrollbar relative mx-auto h-screen w-full max-w-[660px] overflow-y-auto overflow-x-hidden">
            <Header />
            {children}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              closeOnClick
              pauseOnFocusLoss={false}
              theme="light"
            />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
