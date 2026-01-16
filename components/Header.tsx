
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center space-y-2">
      <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-900/20">
        <i className="fas fa-paper-plane text-2xl text-white"></i>
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        SKYBOUND AI
      </h1>
      <p className="text-slate-400 text-lg max-w-md mx-auto">
        Transform your grounded photos into majestic aerial masterpieces.
      </p>
    </header>
  );
};
