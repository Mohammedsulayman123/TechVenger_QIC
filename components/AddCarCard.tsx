
import React from 'react';
import { CarIllustration, SparkleIcon } from './Icons';

const AddCarCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-violet-100 to-indigo-100 p-5 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg">
      {/* Main Add Car Section */}
      <div className="flex items-center justify-between mb-4 cursor-pointer">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Add your car</h2>
          <p className="text-gray-600 mt-1 max-w-xs">
            Access insurance, car info, and services in one place
          </p>
        </div>
        <CarIllustration className="w-24 h-auto text-gray-700 -mr-4" />
      </div>
      
      {/* Service Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-white/80 hover:scale-[1.02] cursor-pointer">
          <p className="font-semibold text-gray-800 text-sm">Fix. Clean.</p>
          <p className="font-semibold text-gray-800 text-sm">Maintain</p>
          <SparkleIcon className="w-6 h-6 text-indigo-500 mt-2" />
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-white/80 hover:scale-[1.02] cursor-pointer">
          <p className="font-semibold text-gray-800 text-sm">Buy & sell cars</p>
          <p className="font-bold text-xl text-indigo-700 mt-1">
            qic<span className="text-indigo-400">·</span>market
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCarCard;
