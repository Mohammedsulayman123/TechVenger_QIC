
import React from 'react';
import {
  LocationPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SadAvatarIcon,
  StarCoinIcon,
  InsuranceCarIcon,
  TravelLuggageIcon,
  GlobeIcon,
  UmbrellaIcon,
  ArmchairIcon,
  LifebuoyIcon,
  BusinessShieldIcon,
  StethoscopeIcon,
  GolfIcon,
} from './Icons';
import SpinWheel from './SpinWheel';

interface InsurancePageProps {
  onEarnCoins?: (amount: number) => void;
  onEarnXP?: (amount: number) => void;
  onNavigateToTravelInsurance?: () => void;
}

const InsurancePage: React.FC<InsurancePageProps> = ({ onEarnCoins, onEarnXP, onNavigateToTravelInsurance }) => {
    const insuranceProducts = [
        { name: "Mandatory visitors' health for your guests", icon: GlobeIcon },
        { name: 'Personal accident', icon: UmbrellaIcon },
        { name: 'Home contents', icon: ArmchairIcon },
        { name: 'Boat and yacht', icon: LifebuoyIcon },
        { name: 'Business shield', icon: BusinessShieldIcon },
        { name: 'Health', icon: StethoscopeIcon },
        { name: 'Golf', icon: GolfIcon },
    ];

  return (
    <div className="bg-[#F3F4F8] dark:bg-gray-900 transition-colors duration-200">
      {/* Header Section */}
      <header className="bg-gradient-to-b from-violet-500 to-indigo-800 dark:from-violet-600 dark:to-indigo-900 p-4 pt-6 text-white relative overflow-hidden transition-colors duration-200">
        <div className="flex justify-end items-center">
          <button className="flex items-center space-x-2 text-xs font-semibold">
            <span>Get help</span>
            <span className="w-6 h-6 bg-white/25 rounded-full flex items-center justify-center">
              <LocationPinIcon className="w-4 h-4 text-white" />
            </span>
          </button>
        </div>
        <div className="mt-3">
          <h1 className="text-2xl font-bold">Insurance 360</h1>
          <p className="text-indigo-200 text-sm mt-0.5">Get insured to gain complete protection</p>
        </div>

        {/* Interactive Avatar Display */}
        <div className="relative h-32 mt-4 flex justify-center items-center">
            <button className="absolute left-0 flex items-center bg-white/25 p-1.5 pr-3 rounded-lg text-xs">
                <ChevronLeftIcon className="w-4 h-4"/>
                <span className="font-semibold ml-1">Car</span>
            </button>

          <div className="absolute w-32 h-32 border-2 border-dashed border-white rounded-full opacity-50 transform rotate-45"></div>

          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <SadAvatarIcon className="w-16 h-16" />
          </div>

           <button 
                onClick={onNavigateToTravelInsurance}
                className="absolute right-0 flex items-center bg-white/25 p-1.5 pl-3 rounded-lg text-xs hover:bg-white/35 transition-colors"
            >
                <span className="font-semibold mr-1">Travel</span>
                <ChevronRightIcon className="w-4 h-4"/>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6 -mt-6">
        {/* Promo Card */}
        <div className="bg-gradient-to-r from-pink-400 to-orange-300 dark:from-pink-500 dark:to-orange-400 p-4 rounded-2xl flex items-center justify-between text-white shadow-lg dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
          <p className="font-semibold max-w-[18ch]">Get up to 800,000 Coins when you buy or renew car policy — redeem for gifts!</p>
          <StarCoinIcon className="w-16 h-16 opacity-80" />
        </div>

        {/* Spin Wheel Section */}
        <SpinWheel onEarnCoins={onEarnCoins} onEarnXP={onEarnXP} />

        {/* Catalog Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Catalog</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <h3 className="font-bold text-gray-800 dark:text-white">Car</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold px-2 py-1 rounded-full">+2000</span>
                <InsuranceCarIcon className="w-20 h-auto -mb-2 -mr-2 dark:opacity-80" />
              </div>
            </div>
             <button 
                onClick={onNavigateToTravelInsurance}
                className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left w-full"
            >
              <h3 className="font-bold text-gray-800 dark:text-white">Travel outbound</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold px-2 py-1 rounded-full">+500</span>
                <TravelLuggageIcon className="w-16 h-auto -mb-2 -mr-2 dark:opacity-80" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Full Catalog List */}
        <div className="space-y-2 pt-2">
            {insuranceProducts.map((product) => (
                 <div key={product.name} className="bg-white dark:bg-gray-800 p-4 rounded-2xl flex items-center justify-between border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-violet-50 dark:hover:bg-gray-700 cursor-pointer">
                    <p className="font-semibold text-gray-800 dark:text-white text-base">{product.name}</p>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full flex-shrink-0 ml-4">
                        <product.icon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                </div>
            ))}
        </div>

        <p className="text-center text-gray-400 dark:text-gray-500 text-xs pt-4">Powered by QIC, regulated by QCB</p>
      </div>
    </div>
  );
};

export default InsurancePage;
