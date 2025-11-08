
import React from 'react';
import { CheckShieldIcon } from './Icons';

const InfoSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gradient-to-b from-purple-400 to-purple-700 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative h-48 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
          <div className="z-10 flex flex-col">
            <h3 className="font-bold text-2xl text-white leading-tight">Invite your</h3>
            <h3 className="font-bold text-2xl text-white leading-tight">friends</h3>
            <p className="text-white text-sm mt-2 font-medium">And earn a QAR 50 gift</p>
            <p className="text-white text-sm font-medium">card!</p>
          </div>
          
          {/* Gift Card Illustration */}
          <div className="absolute bottom-0 right-0 w-32 h-32 transform rotate-12 translate-x-4 translate-y-4">
            <div className="relative w-full h-full">
              {/* Gift Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-800 rounded-lg shadow-xl" style={{ transform: 'perspective(500px) rotateY(-15deg) rotateX(5deg)' }}>
                {/* Bow */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-purple-900 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-purple-300 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-purple-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-purple-300 rounded-full"></div>
                </div>
                
                {/* Brand Logos */}
                <div className="absolute top-8 left-2 right-2 space-y-1">
                  <p className="text-white text-xs font-bold">IKEA</p>
                  <p className="text-white text-xs font-bold">GO SPORT</p>
                </div>
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-xs font-bold transform -rotate-12">talab</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom left progress/navigation line */}
          <div className="absolute bottom-2 left-4 w-12 h-0.5 bg-white/60 rounded-full"></div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-2xl flex items-center justify-between h-[88px] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
          <p className="font-semibold text-gray-800">QIC insurance catalog</p>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <CheckShieldIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl flex items-center justify-between h-[88px] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer">
          <p className="font-semibold text-gray-800">QIC help center</p>
          <div className="bg-gray-200 px-3 py-1 rounded-full text-gray-600 font-bold text-sm">
            SOS
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
