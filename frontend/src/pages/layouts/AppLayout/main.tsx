import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">TODO List App</h1>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-white mt-auto py-4 text-center text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} TODO List App. All rights reserved.</p>
      </footer>
    </div>
  );
};
