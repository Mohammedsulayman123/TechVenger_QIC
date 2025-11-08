
import React from 'react';
import { ArrowUpIcon } from './Icons';

const ChatBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-full shadow-sm border border-gray-200">
      <input
        type="text"
        placeholder="💬 “Ask Ava — your smart insurance companion”"
        className="bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none flex-grow ml-2"
      />
      <button className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center flex-shrink-0">
        <ArrowUpIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default ChatBar;
