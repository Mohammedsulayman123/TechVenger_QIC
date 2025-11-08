import React, { useState, useEffect } from 'react';
import { 
  BackArrowIcon,
  CalendarIcon,
  TrendingUpIcon,
  // FIX: Import TrophyIcon
  TrophyIcon,
  BadgeIcon,
  MissionIcon,
  FireIcon,
  ShieldDropIcon,
  PassportQuizIcon,
  EarlyBirdIcon,
  LockIcon,
  ChevronRightIcon
} from './Icons';

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  iconColor: string;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, iconColor, iconBgColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/50 p-5 text-center flex flex-col items-center justify-center transition-colors duration-200">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor} dark:opacity-80`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-3">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
  </div>
);

interface StreakItemProps {
  title: string;
  value: string;
  goal: string;
  icon: React.ElementType;
  progress: number;
  valueColor: string;
}

const StreakItem: React.FC<StreakItemProps> = ({ title, value, goal, icon: Icon, progress, valueColor }) => {
  const progressColor =
    valueColor.includes('orange')
      ? 'bg-orange-500'
      : valueColor.includes('blue')
      ? 'bg-blue-500'
      : valueColor.includes('green')
      ? 'bg-green-500'
      : 'bg-red-500';
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${valueColor}`} />
          <p className="font-semibold text-gray-800 dark:text-gray-200">{title}</p>
        </div>
        <span className={`font-semibold ${valueColor}`}>{value}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
        <div className={`${progressColor} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
      </div>
      {goal && <p className="text-xs text-gray-500 dark:text-gray-400">{goal}</p>}
    </div>
  );
};

// Circular progress ring component
const CircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const radius = 36;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        stroke="rgba(255,255,255,0.3)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        strokeDashoffset={strokeDashoffset}
        cx={radius}
        cy={radius}
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
};

interface BadgeCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ icon: Icon, title, description, unlocked }) => {
  return (
    <div className={`rounded-xl p-4 flex flex-col items-center justify-center text-center border transition-colors duration-200 ${unlocked ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700' : 'bg-gray-100/60 dark:bg-gray-700/60 border-gray-200 dark:border-gray-600'}`}>
      {unlocked && Icon ? (
        <Icon className="w-8 h-8 text-pink-500 dark:text-pink-400 mb-2" />
      ) : (
        <LockIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
      )}
      <p className={`font-semibold ${unlocked ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

interface ProfilePageProps {
  onNavigateBack: () => void;
  xp: number;
  level: number;
  tier: string;
  qCoins: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateBack, xp, level, tier, qCoins }) => {
  const xpInCurrentLevel = xp % 100;
  const levelProgress = (xpInCurrentLevel / 100) * 100;

  // Calculate Smart Learner Streak (consecutive days of quiz participation)
  const calculateSmartLearnerStreak = (): { days: number; progress: number; goal: string } => {
    const quizHistory = JSON.parse(localStorage.getItem('quizParticipationHistory') || '[]');
    
    if (quizHistory.length === 0) {
      return { days: 0, progress: 0, goal: 'Answer travel safety quizzes 3 days in a row to earn the Knowledge Guru badge!' };
    }

    // Convert date strings to Date objects and normalize to start of day
    const normalizeDate = (dateStr: string): number => {
      const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    };

    // Get unique dates and sort descending (most recent first)
    const uniqueDates = [...new Set(quizHistory.map(normalizeDate))].sort((a, b) => b - a);

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    // Check if today or yesterday is in the history (allows for streak continuation)
    // Start from most recent date and count backwards
    if (uniqueDates.length > 0) {
      const mostRecentDate = uniqueDates[0];
      const daysDiff = Math.floor((todayTime - mostRecentDate) / (1000 * 60 * 60 * 24));
      
      // If most recent participation was today or yesterday, start counting
      if (daysDiff <= 1) {
        streak = 1;
        
        // Count consecutive days going backwards
        for (let i = 1; i < uniqueDates.length; i++) {
          const expectedDate = new Date(today);
          expectedDate.setDate(expectedDate.getDate() - i);
          expectedDate.setHours(0, 0, 0, 0);
          const expectedTime = expectedDate.getTime();
          
          if (uniqueDates[i] === expectedTime) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    const targetDays = 3;
    const progress = Math.min((streak / targetDays) * 100, 100);
    const remainingDays = Math.max(0, targetDays - streak);
    const goal = remainingDays > 0 
      ? `Answer travel safety quizzes ${remainingDays} more day${remainingDays > 1 ? 's' : ''} in a row to earn the Knowledge Guru badge!`
      : 'Congratulations! You earned the Knowledge Guru badge! 🎓';

    return { days: streak, progress, goal };
  };

  const [smartLearnerStreak, setSmartLearnerStreak] = useState(calculateSmartLearnerStreak());

  // Update streak when component mounts or when quiz participation might have changed
  useEffect(() => {
    setSmartLearnerStreak(calculateSmartLearnerStreak());
  }, []);

  const stats = [
    { icon: TrendingUpIcon, value: xp, label: 'Total XP Earned', iconColor: 'text-indigo-500', iconBgColor: 'bg-indigo-50' },
    { icon: TrophyIcon, value: qCoins, label: 'Q-Coins Balance', iconColor: 'text-orange-500', iconBgColor: 'bg-orange-50' },
    { icon: BadgeIcon, value: 1, label: 'Badges Collected', iconColor: 'text-purple-500', iconBgColor: 'bg-purple-50' },
    { icon: MissionIcon, value: 4, label: 'Missions Completed', iconColor: 'text-green-500', iconBgColor: 'bg-green-50' },
  ];

  const streaks = [
    { title: 'Login Streak', value: '0 days', goal: '30 more days to Streak Master badge', icon: FireIcon, progress: 10, valueColor: 'text-orange-500' },
    { title: 'Claim-Free Streak', value: '0 months', goal: '12 more months to Claim Free Hero badge', icon: ShieldDropIcon, progress: 0, valueColor: 'text-blue-500' },
    { title: 'Smart Learner Streak', value: `${smartLearnerStreak.days} day${smartLearnerStreak.days !== 1 ? 's' : ''}`, goal: smartLearnerStreak.goal, icon: PassportQuizIcon, progress: smartLearnerStreak.progress, valueColor: 'text-green-500' },
  ];

  const badges = [
    { title: 'Early Bird', description: 'Completed onboarding', unlocked: true, icon: EarlyBirdIcon },
    { title: 'Safe Driver', description: 'Perfect safe driving game', unlocked: false },
    { title: 'Travel Expert', description: 'Aced travel quiz', unlocked: false },
    { title: 'Weather Wise', description: 'Perfect weather shield game', unlocked: false },
    { title: 'Knowledge Guru', description: 'Answer quizzes 3 days in a row', unlocked: smartLearnerStreak.days >= 3 },
    { title: 'Streak Master', description: '30-day login streak', unlocked: false },
    { title: 'Claim Free Hero', description: '12 months claim-free', unlocked: false },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 pb-10 transition-colors duration-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 text-white rounded-2xl p-4 shadow-md dark:shadow-gray-900/50 relative transition-colors duration-200">
        <button onClick={onNavigateBack} className="absolute top-4 right-4 p-2 z-10 hover:bg-white/20 rounded-full transition-colors">
          <BackArrowIcon className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center space-x-4 mt-2">
          <div className="relative w-16 h-16 flex-shrink-0">
            {/* Circular XP Progress */}
            <svg className="w-16 h-16 transform -rotate-90 absolute inset-0" viewBox="0 0 64 64">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - levelProgress / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            {/* Avatar circle in center */}
            <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/20 text-xl font-bold relative z-10">
              YO
            </div>
          </div>

          <div>
            <h1 className="text-lg font-semibold">Welcome Back!</h1>
            <div className="flex space-x-2 mt-1">
              <span className="bg-white/20 px-2 py-0.5 text-xs rounded-full">{tier} Tier</span>
              <span className="bg-white/20 px-2 py-0.5 text-xs rounded-full">Level {level}</span>
            </div>
            <div className="flex items-center text-xs text-white/80 mt-1.5 space-x-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Member since Oct 2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="mt-6">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>
      
      {/* Active Streaks Section */}
      <section className="mt-5 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900/50 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
          <FireIcon className="w-5 h-5 text-orange-500" />
          <span>Active Streaks</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">Keep your streaks alive for bonus rewards!</p>

        <div className="space-y-5">
          {streaks.map((streak, index) => (
            <StreakItem key={index} {...streak} />
          ))}
        </div>
      </section>

      {/* Badges Collection Section */}
      <section className="mt-5 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900/50 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <BadgeIcon className="w-5 h-5 text-purple-500" />
            <span>Badges Collection</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">Collected {badges.filter(b => b.unlocked).length} of {badges.length} badges</p>
        <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
                <BadgeCard key={index} {...badge} />
            ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="mt-5 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900/50 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Support</h2>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-gray-900 dark:text-gray-200 font-medium">FAQs</span>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-gray-900 dark:text-gray-200 font-medium">Contact us</span>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-left">
            <span className="text-gray-900 dark:text-gray-200 font-medium">About QIC app</span>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default ProfilePage;