
import React from 'react';
import { ChassisCarIllustration, RentCarKeysIllustration, MoonIcon, SunIcon } from './Icons';
import { useDarkMode } from '../contexts/DarkModeContext';

const MyCarsPage: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const handleToggle = () => {
    console.log('Toggling dark mode. Current state:', isDarkMode);
    toggleDarkMode();
    // Verify the class was changed
    setTimeout(() => {
      console.log('HTML classes after toggle:', document.documentElement.className);
      console.log('Dark mode state after toggle:', !isDarkMode);
    }, 100);
  };
  
  return (
    <div className="p-6 pt-12 space-y-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Let's add a car</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Access vehicle info, policy details, and extra services</p>
          </div>
          {/* Dark Mode Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggle();
            }}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <MoonIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            )}
          </button>
        </div>

        <div className="bg-gradient-to-br from-violet-100 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-5 rounded-2xl flex justify-between items-center shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Automatically</h2>
                <p className="text-gray-600 dark:text-gray-300">by chassis number</p>
                <button className="mt-4 bg-indigo-500 dark:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/50 hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all">
                    Enter number
                </button>
            </div>
            <ChassisCarIllustration className="w-24 h-auto -mr-4 dark:opacity-80" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl flex justify-between items-center border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Manually</h2>
            </div>
            <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600">
                Fill in car details
            </button>
        </div>

        <div className="bg-violet-50 dark:bg-gray-800 p-5 rounded-2xl flex justify-between items-center shadow-sm dark:shadow-gray-900/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Rent car</h2>
                <p className="text-gray-600 dark:text-gray-300">Your ride for any occasion</p>
            </div>
            <RentCarKeysIllustration className="w-20 h-auto -mr-2 dark:opacity-80" />
        </div>
    </div>
  );
};
export default MyCarsPage;
