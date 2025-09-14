
import React from 'react';
import { User, View } from '../types';
import { HomeIcon, StethoscopeIcon, UserCircleIcon } from './icons';

interface HeaderProps {
  user: User;
  setView: (view: View) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, setView, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-teal-600 font-bold text-xl cursor-pointer" onClick={() => setView('dashboard')}>
              TeleHealth+
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => setView('dashboard')} className="text-slate-700 hover:bg-teal-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"><HomeIcon /> Dashboard</button>
                <button onClick={() => setView('doctors')} className="text-slate-700 hover:bg-teal-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"><StethoscopeIcon /> Find a Doctor</button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
             <div className="mr-4 text-slate-700">Welcome, {user.name}</div>
             <button onClick={() => setView('userProfile')} className="p-1 rounded-full text-slate-400 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <UserCircleIcon className="h-8 w-8" />
            </button>
            <button onClick={onLogout} className="ml-4 text-slate-700 hover:text-teal-600 text-sm font-medium">Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
};
