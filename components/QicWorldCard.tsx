import React from 'react';
import { ListItemChevronRightIcon } from './Icons';

interface QicWorldCardProps {
    onClick: () => void;
}

const QicWorldCard: React.FC<QicWorldCardProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-emerald-50 to-teal-100 p-5 rounded-2xl flex items-center justify-between text-left transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300"
    >
        <p className="font-semibold text-gray-800 leading-tight">
            <span className="text-2xl mr-3" role="img" aria-label="game controller icon">🎮</span>
            QIC World — Play & Learn to Earn Rewards!
        </p>
        <ListItemChevronRightIcon className="w-6 h-6 text-gray-500 flex-shrink-0 ml-2" />
    </button>
  );
};

export default QicWorldCard;