
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
    <div className="bg-[#F3F4F8]">
      {/* Header Section */}
      <header className="bg-gradient-to-b from-violet-500 to-indigo-800 p-6 pt-10 text-white rounded-b-3xl relative overflow-hidden">
        <div className="flex justify-end items-center">
          <button className="flex items-center space-x-2 text-sm font-semibold">
            <span>Get help</span>
            <span className="w-7 h-7 bg-white/25 rounded-full flex items-center justify-center">
              <LocationPinIcon className="w-5 h-5 text-white" />
            </span>
          </button>
        </div>
        <div className="mt-4">
          <h1 className="text-4xl font-bold">Insurance 360</h1>
          <p className="text-indigo-200 mt-1">Get insured to gain complete protection</p>
        </div>

        {/* Interactive Avatar Display */}
        <div className="relative h-48 mt-6 flex justify-center items-center">
            <button className="absolute left-0 flex items-center bg-white/25 p-2 pr-4 rounded-lg text-sm">
                <ChevronLeftIcon className="w-5 h-5"/>
                <span className="font-semibold ml-1">Car</span>
            </button>

          <div className="absolute w-40 h-40 border-4 border-dashed border-white rounded-full opacity-50 transform rotate-45"></div>

          <div className="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
            <SadAvatarIcon className="w-24 h-24" />
          </div>

           <button 
                onClick={onNavigateToTravelInsurance}
                className="absolute right-0 flex items-center bg-white/25 p-2 pl-4 rounded-lg text-sm hover:bg-white/35 transition-colors"
            >
                <span className="font-semibold mr-1">Travel</span>
                <ChevronRightIcon className="w-5 h-5"/>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6 -mt-8">
        {/* Promo Card */}
        <div className="bg-gradient-to-r from-pink-400 to-orange-300 p-4 rounded-2xl flex items-center justify-between text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
          <p className="font-semibold max-w-[18ch]">Get up to 800,000 Coins when you buy or renew car policy — redeem for gifts!</p>
          <StarCoinIcon className="w-16 h-16 opacity-80" />
        </div>

        {/* Spin Wheel Section */}
        <SpinWheel onEarnCoins={onEarnCoins} onEarnXP={onEarnXP} />

        {/* Catalog Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Catalog</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <h3 className="font-bold text-gray-800">Car</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">+2000</span>
                <InsuranceCarIcon className="w-20 h-auto -mb-2 -mr-2" />
              </div>
            </div>
             <button 
                onClick={onNavigateToTravelInsurance}
                className="bg-white p-4 rounded-2xl border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left w-full"
            >
              <h3 className="font-bold text-gray-800">Travel outbound</h3>
              <div className="flex justify-between items-end mt-4">
                <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">+500</span>
                <TravelLuggageIcon className="w-16 h-auto -mb-2 -mr-2" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Full Catalog List */}
        <div className="space-y-3 pt-2">
            {insuranceProducts.map((product) => (
                 <div key={product.name} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-violet-50 cursor-pointer">
                    <p className="font-semibold text-gray-800 text-base">{product.name}</p>
                    <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0 ml-4">
                        <product.icon className="w-6 h-6 text-indigo-500" />
                    </div>
                </div>
            ))}
        </div>

        <p className="text-center text-gray-400 text-xs pt-4">Powered by QIC, regulated by QCB</p>
      </div>
    </div>
  );
};

export default InsurancePage;
