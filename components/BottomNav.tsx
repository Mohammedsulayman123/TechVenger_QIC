import React from 'react';
import { HomeIcon, CarIcon, ShieldIcon, GridIcon, AvaAiIcon } from './Icons';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-1 w-16 group focus:outline-none">
      <Icon className={`w-6 h-6 transform transition-all duration-300 ease-in-out group-hover:scale-110 ${isActive ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'text-gray-400 dark:text-gray-500'}`} />
      <span className={`text-xs font-semibold transition-colors duration-300 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
      <div className={`w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full transition-transform duration-300 ease-out ${isActive ? 'scale-100' : 'scale-0'}`}></div>
    </button>
  );
};

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const navItems = [
        { label: 'Main', icon: HomeIcon },
        { label: 'My cars', icon: CarIcon },
        { label: 'Ava AI', icon: AvaAiIcon },
        { label: 'Insurance', icon: ShieldIcon },
        { label: 'City', icon: GridIcon },
    ];
  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex justify-around items-start py-2">
        {navItems.map((item) => (
             <NavItem 
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={activeTab === item.label}
                onClick={() => onTabChange(item.label)}
            />
        ))}
      </div>
    </footer>
  );
};

export default BottomNav;