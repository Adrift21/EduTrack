
import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { User } from '../types';

interface LayoutProps {
  children: ReactNode;
  user: User;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            School Administration Portal
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-slate-200"
            />
            <button 
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
