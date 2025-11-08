
import React from 'react';
import { SparkleIcon } from './Icons';

const ServiceCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-violet-50 p-4 rounded-2xl transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
        <p className="font-semibold text-gray-800">Fix. Clean.</p>
        <p className="font-semibold text-gray-800">Maintain</p>
        <SparkleIcon className="w-8 h-8 text-indigo-400 mt-2" />
      </div>
      <div className="bg-violet-50 p-4 rounded-2xl transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
        <p className="font-semibold text-gray-800">Buy & sell cars</p>
        <p className="font-bold text-2xl text-indigo-700 mt-2">
          qic<span className="text-indigo-400">·</span>market
        </p>
      </div>
    </div>
  );
};

export default ServiceCards;
