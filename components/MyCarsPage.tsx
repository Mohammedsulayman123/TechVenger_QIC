
import React from 'react';
import { ChassisCarIllustration, RentCarKeysIllustration } from './Icons';

const MyCarsPage: React.FC = () => {
  return (
    <div className="p-6 pt-12 space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Let's add a car</h1>
            <p className="text-gray-500 mt-1">Access vehicle info, policy details, and extra services</p>
        </div>

        <div className="bg-gradient-to-br from-violet-100 via-white to-indigo-50 p-5 rounded-2xl flex justify-between items-center shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800">Automatically</h2>
                <p className="text-gray-600">by chassis number</p>
                <button className="mt-4 bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    Enter number
                </button>
            </div>
            <ChassisCarIllustration className="w-24 h-auto -mr-4" />
        </div>
        
        <div className="bg-white p-5 rounded-2xl flex justify-between items-center border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800">Manually</h2>
            </div>
            <button className="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                Fill in car details
            </button>
        </div>

        <div className="bg-violet-50 p-5 rounded-2xl flex justify-between items-center shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800">Rent car</h2>
                <p className="text-gray-600">Your ride for any occasion</p>
            </div>
            <RentCarKeysIllustration className="w-20 h-auto -mr-2" />
        </div>
    </div>
  );
};
export default MyCarsPage;
