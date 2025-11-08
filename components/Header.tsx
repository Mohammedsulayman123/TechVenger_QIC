
import React from 'react';
import { UserIcon } from './Icons';

interface HeaderProps {
  onNavigateToProfile: () => void;
  onNavigateToCoins?: () => void;
  qCoins: number;
  xp: number;
  level: number;
  tier: string;
  xpProgress: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToProfile, onNavigateToCoins, qCoins, xp, level, tier, xpProgress }) => {
  return (
    <div className="w-full">
      <header className="flex items-center justify-between">
        <button onClick={onNavigateToProfile} className="flex items-center space-x-3 text-left flex-grow">
          <div className="relative w-12 h-12">
            {/* Circular XP Progress */}
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - xpProgress / 100)}`}
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
            {/* Profile icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-lg">Welcome,</p>
            <p className="text-gray-500">Dear Friend!</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">{tier} Tier</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Lv {level}</span>
            </div>
          </div>
        </button>
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={onNavigateToCoins}
            className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="font-bold text-gray-800">{qCoins}</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </button>
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
            <span className="text-xs text-gray-600">⚡</span>
            <span className="font-bold text-gray-800 text-sm">{xp} XP</span>
          </div>
        </div>
      </header>
      {/* XP Progress Bar */}
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${xpProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Header;