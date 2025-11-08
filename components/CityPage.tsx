
import React from 'react';
import {
    MarketCarIcon,
    RentalKeysIcon,
    DetailingIcon,
    WashIcon,
    RepairsIcon,
    CarHistoryIcon,
    CarPriceCheckIcon,
    PromoIcon,
    EventsIcon,
    IslamIcon,
    LocationsIcon,
    BlogIcon
} from './Icons';

interface ServiceCardProps {
  title: string;
  icon: React.ElementType;
  points?: number;
  isLarge?: boolean;
  isNew?: boolean;
  className?: string;
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon: Icon, points, isLarge, isNew, className }) => (
    <div className={`bg-violet-50 dark:bg-gray-800 p-4 rounded-2xl border border-violet-100 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 relative flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer ${className}`}>
        <div>
            {isNew && <span className="absolute top-3 right-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-1 rounded-full">New</span>}
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
            {points && (
                <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">+{points}</span>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-pink-500"></div>
                 </div>
            )}
        </div>
        <div className="flex justify-end items-end h-full">
            <Icon className={`${isLarge ? 'w-full h-auto mt-4 object-contain' : 'w-16 h-16'} dark:opacity-80`} />
        </div>
    </div>
);

const LifestyleCard: React.FC<ServiceCardProps> = ({ title, icon: Icon }) => (
     <div className="bg-violet-50 dark:bg-gray-800 p-3 rounded-2xl border border-violet-100 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        <div className="w-16 h-16 flex items-center justify-center">
             <Icon className="w-12 h-12 dark:opacity-80" />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white text-sm mt-2">{title}</h3>
    </div>
)


const CityPage: React.FC = () => {
  return (
    <div className="p-6 pt-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">City</h1>

      <section className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Drive</h2>
        <div className="grid grid-cols-2 gap-4" style={{ gridTemplateRows: 'repeat(4, 90px)' }}>
            <ServiceCard title="Market" icon={MarketCarIcon} isLarge isNew className="row-span-2"/>
            <ServiceCard title="Rental" icon={RentalKeysIcon} />
            <ServiceCard title="Detailing" icon={DetailingIcon} points={2000} />
            <ServiceCard title="Wash" icon={WashIcon} points={2000} />
            <ServiceCard title="Repairs" icon={RepairsIcon} />
            <ServiceCard title="Car history" icon={CarHistoryIcon} />
            <ServiceCard title="Car price checker" icon={CarPriceCheckIcon} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Lifestyle</h2>
         <div className="grid grid-cols-3 gap-4">
            <LifestyleCard title="Promo" icon={PromoIcon} />
            <LifestyleCard title="Events" icon={EventsIcon} />
            <LifestyleCard title="Islam" icon={IslamIcon} />
            <LifestyleCard title="Locations" icon={LocationsIcon} />
            <LifestyleCard title="Blog" icon={BlogIcon} />
        </div>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-gray-400 dark:text-gray-500 text-xs px-4">
            The non-insurance services are provided by Anoud Tech, a subsidiary of QIC
        </p>
      </footer>
    </div>
  );
};

export default CityPage;
