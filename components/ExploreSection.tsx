
import React from 'react';
import { ArrowRightIcon } from './Icons';

interface CardProps {
  title: string[];
  image?: string;
  bgColorClass: string;
  textColorClass: string;
  isLarge?: boolean;
}

const ExploreCard: React.FC<CardProps> = ({ title, image, bgColorClass, textColorClass, isLarge }) => {
  return (
    <div className={`relative flex-shrink-0 w-32 h-40 rounded-xl p-3 flex flex-col justify-between overflow-hidden ${bgColorClass} transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer`}>
      {image && <img src={image} alt={title.join(' ')} className="absolute inset-0 w-full h-full object-cover" />}
      <div className={`relative z-10 font-bold text-lg ${textColorClass}`}>
        {title.map((line, index) => <p key={index}>{line}</p>)}
      </div>
      {isLarge && <ArrowRightIcon className={`relative z-10 w-6 h-6 self-start ${textColorClass}`} />}
    </div>
  );
};

const ExploreSection: React.FC = () => {
  const exploreItems = [
    { title: ['Explore', 'Doha'], bgColorClass: 'bg-violet-50 border border-violet-200', textColorClass: 'text-gray-800', isLarge: true },
    { title: ['Off-Road', 'Safety', 'Check'], image: 'https://picsum.photos/id/10/200/300', bgColorClass: 'bg-gray-800', textColorClass: 'text-white' },
    { title: ['Protect your', 'car'], image: 'https://picsum.photos/id/111/200/300', bgColorClass: 'bg-indigo-600', textColorClass: 'text-white' },
    { title: ['Best car', 'deals - on', 'Market'], image: 'https://picsum.photos/id/145/200/300', bgColorClass: 'bg-indigo-400', textColorClass: 'text-white' },
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4">
      {exploreItems.map((item, index) => (
        <ExploreCard key={index} {...item} />
      ))}
    </div>
  );
};

export default ExploreSection;
