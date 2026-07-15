import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-900 overflow-x-hidden relative">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-accent-red/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <Navbar />
      <main className="flex-grow pt-16 z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
