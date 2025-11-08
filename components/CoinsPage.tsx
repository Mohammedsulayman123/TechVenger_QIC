import React, { useState } from 'react';
import { BackArrowIcon } from './Icons';

interface CoinsPageProps {
  onNavigateBack: () => void;
  qCoins: number;
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  location?: string;
  price: number;
  image: string;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ onNavigateBack, qCoins }) => {
  const [activeTab, setActiveTab] = useState<'spend' | 'earn'>('spend');

  const spendItems: RewardItem[] = [
    {
      id: '1',
      title: 'iPhone 16 Pro',
      description: '128GB, Desert Titanium',
      price: 800000,
      image: '📱'
    },
    {
      id: '2',
      title: 'Massage of back&shoulder',
      description: 'InterContinental Doha',
      location: 'InterContinental Doha',
      price: 100000,
      image: '💆'
    },
    {
      id: '3',
      title: 'Gym Equipment',
      description: 'Premium fitness gear',
      price: 150000,
      image: '🏋️'
    },
    {
      id: '4',
      title: 'City Experience',
      description: 'Explore Doha',
      price: 50000,
      image: '🏙️'
    }
  ];

  const earnOptions = [
    {
      title: 'Buy or Renew Car Policy',
      coins: 'Up to 800,000 Coins',
      description: 'Get coins when you purchase or renew your car insurance policy'
    },
    {
      title: 'Complete Daily Challenges',
      coins: '50-200 Coins',
      description: 'Earn coins by completing daily missions and challenges'
    },
    {
      title: 'Play Games',
      coins: '10-100 Coins',
      description: 'Win coins by playing Safe Driver Challenge and other games'
    },
    {
      title: 'Answer Trivia',
      coins: '50 Coins',
      description: 'Answer daily trivia questions correctly to earn coins'
    }
  ];

  // Calculate expiration date (example: Dec 31, 2025)
  const expirationDate = new Date('2025-12-31');
  const formattedExpDate = expirationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 flex items-center justify-between">
        <button onClick={onNavigateBack} className="p-2 -ml-2">
          <BackArrowIcon className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-xl font-bold text-center flex-grow">Coins</h1>
        <button className="text-white text-sm font-semibold">History</button>
      </header>

      <div className="p-6 space-y-4">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-800 font-bold text-sm mb-2">Balance</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-gray-900">{qCoins.toLocaleString()}</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3">Part of Coins expire {formattedExpDate}</p>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-semibold text-sm leading-tight">
              Get up to 800,000 Coins when you buy or renew car policy — redeem for gifts!
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-20">
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Your Rewards Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-800">Your rewards</p>
              <p className="text-xs text-gray-500">Unlocked with Coins</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-white rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('spend')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
              activeTab === 'spend'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Spend Coins
          </button>
          <button
            onClick={() => setActiveTab('earn')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
              activeTab === 'earn'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Earn Coins
          </button>
        </div>

        {/* Content */}
        {activeTab === 'spend' ? (
          <div className="grid grid-cols-2 gap-4">
            {spendItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center text-4xl">
                  {item.image}
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                {item.location && (
                  <p className="text-xs text-gray-400 mb-2">{item.location}</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-900">{item.price.toLocaleString()}</span>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {earnOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{option.title}</h3>
                  <span className="font-bold text-purple-600 text-sm">{option.coins}</span>
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinsPage;

