
import React from 'react';
import { CarIllustration } from './Icons';

const AddCarCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-violet-100 to-indigo-100 p-5 rounded-2xl flex items-center justify-between transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Add your car</h2>
        <p className="text-gray-600 mt-1 max-w-xs">
          Access insurance, car info, and services in one place
        </p>
      </div>
      <CarIllustration className="w-24 h-auto text-gray-700 -mr-4" />
    </div>
  );
};

export default AddCarCard;
