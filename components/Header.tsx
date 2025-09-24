import React from 'react';
import DumbbellIcon from './icons/DumbbellIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <DumbbellIcon className="w-8 h-8 mr-3 text-emerald-400" />
        <h1 className="text-3xl font-bold tracking-tight text-white">
          AI Fitness <span className="text-emerald-400">Planner</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;