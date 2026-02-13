
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@edutrack.pro');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a real API call.
    onLogin({
      id: '1',
      name: 'Kaan Emre Evci',
      role: 'admin',
      avatar: 'https://picsum.photos/seed/kaan/200/200'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl font-bold text-3xl mb-4 shadow-xl shadow-indigo-200">
            E
          </div>
          <h1 className="text-3xl font-bold text-slate-900">EduTrack Pro</h1>
          <p className="text-slate-500 mt-2">Sign in to the administrative dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                placeholder="admin@edutrack.pro"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 transform active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Demo Credentials:<br/>
              Email: <span className="text-slate-600 font-mono">admin@edutrack.pro</span><br/>
              Password: <span className="text-slate-600 font-mono">password</span>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-8">
          © 2024 EduTrack Systems Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};
