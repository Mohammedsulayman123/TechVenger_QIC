import React, { useState, useEffect } from 'react';
import { BackArrowIcon } from './Icons';

interface WeatherShieldProps {
  onNavigateBack: () => void;
  onEarnCoins?: (amount: number) => void;
  onEarnXP?: (amount: number) => void;
}

type Weather = {
  type: 'rain' | 'snow' | 'storm';
  icon: string;
  color: string;
  bgGradient: string;
  correctCard: 'travel' | 'motor' | 'health';
  description: string;
};

const weathers: Weather[] = [
  { 
    type: 'rain', 
    icon: '🌧️',
    color: 'text-blue-400',
    bgGradient: 'from-blue-500 to-cyan-500',
    correctCard: 'travel',
    description: 'Rainy Season'
  },
  { 
    type: 'snow', 
    icon: '❄️',
    color: 'text-cyan-300',
    bgGradient: 'from-cyan-500 to-blue-500',
    correctCard: 'motor',
    description: 'Snow Storm'
  },
  { 
    type: 'storm', 
    icon: '⛈️',
    color: 'text-purple-400',
    bgGradient: 'from-purple-500 to-pink-500',
    correctCard: 'health',
    description: 'Thunder Storm'
  }
];

const WeatherShield: React.FC<WeatherShieldProps> = ({ onNavigateBack, onEarnCoins, onEarnXP }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [difficulty, setDifficulty] = useState(1);
  const [aiFeedback, setAiFeedback] = useState('');
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const totalRounds = 10;

  const protectionCards = [
    { id: 'travel', name: 'Travel Protection', icon: '☂️', color: 'from-blue-500 to-cyan-500', desc: 'For rain' },
    { id: 'motor', name: 'Vehicle Cover', icon: '🚘', color: 'from-orange-500 to-red-500', desc: 'For snow' },
    { id: 'health', name: 'Health Shield', icon: '😷', color: 'from-pink-500 to-purple-500', desc: 'For storm' }
  ];

  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleCardSelect('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showResult, round]);

  const handleStart = () => {
    setGameState('playing');
    setScore(0);
    setRound(0);
    setCombo(0);
    setDifficulty(1);
    setShowResult(false);
    setCoinsAwarded(false);
    setXpAwarded(false);
    setAiFeedback('');
    generateWeather();
  };

  const generateWeather = () => {
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    setCurrentWeather(randomWeather);
    setShowResult(false);
    setTimeLeft(3);
    
    // Increase difficulty every 3 rounds
    if (round > 0 && round % 3 === 0) {
      setDifficulty((d) => Math.min(3, d + 0.5));
    }
  };

  const handleCardSelect = (cardId: string) => {
    if (showResult || !currentWeather) return;

    const correct = cardId === currentWeather.correctCard;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = 10;
      const comboMultiplier = 1 + (combo * 0.1);
      const timeBonus = timeLeft > 1 ? 5 : 0;
      const points = Math.floor((basePoints + timeBonus) * comboMultiplier * difficulty);
      
      setScore(score + points);
      setCombo(combo + 1);
    } else {
      setCombo(0);
    }

    setTimeout(() => {
      if (round < totalRounds - 1) {
        setRound(round + 1);
        generateWeather();
      } else {
        generateAIFeedback();
        setGameState('complete');
      }
    }, 1500);
  };

  const generateAIFeedback = () => {
    const accuracy = (score / (totalRounds * 15)) * 100;
    
    if (accuracy >= 90) {
      setAiFeedback("Great reflexes! You're ready for the Smart Auto Hub upgrade. Storm season ahead — your travel policy includes weather coverage! 🌟");
    } else if (accuracy >= 70) {
      setAiFeedback("Solid performance! You understand weather protection well. Consider upgrading your coverage for extreme weather events. ⛈️");
    } else if (accuracy >= 50) {
      setAiFeedback("Good effort! Remember: Rain→Travel, Snow→Motor, Storm→Health. Practice makes perfect! 💡");
    } else {
      setAiFeedback("Keep practicing! Weather protection is crucial. Our AI can help you learn the patterns better. 🎯");
    }
  };

  // Award coins and XP when game completes
  useEffect(() => {
    if (gameState === 'complete' && !coinsAwarded && onEarnCoins) {
      const qCoins = Math.floor(score * 5);
      if (qCoins > 0) {
        onEarnCoins(qCoins);
        setCoinsAwarded(true);
      }
    }
    if (gameState === 'complete' && !xpAwarded && onEarnXP) {
      const earnedXP = score * 10; // Score * 10 as XP
      if (earnedXP > 0) {
        onEarnXP(earnedXP);
        setXpAwarded(true);
      }
    }
  }, [gameState, score, onEarnCoins, onEarnXP, coinsAwarded, xpAwarded]);

  if (gameState === 'intro') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Weather Shield</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🌦️</span>
              How to Play
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• AI generates random weather conditions</li>
              <li>• Select the correct protection within 3 seconds!</li>
              <li>• Rain 🌧️ → Travel Protection</li>
              <li>• Snow ❄️ → Vehicle Cover</li>
              <li>• Storm ⛈️ → Health Shield</li>
              <li>• Build combos for multipliers!</li>
              <li>• 10 rounds, difficulty rises!</li>
            </ul>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-teal-700 hover:to-green-700 transition-colors"
          >
            Start Game 🌦️
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    const accuracy = Math.round((score / (totalRounds * 15)) * 100);
    const qCoins = Math.floor(score * 5);
    const isPerfect = score >= totalRounds * 15 * 0.95; // 95% for perfect
    const maxCombo = Math.floor(combo / 2);

    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Game Complete! 🌦️</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="mb-6">
              <div className="text-7xl mb-4">
                {isPerfect ? '🏆' : accuracy >= 70 ? '🌟' : '☁️'}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Weather Shield Results</h2>
            </div>

            {isPerfect && (
              <div className="mb-4 p-4 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl">
                <div className="text-2xl mb-2">🏅</div>
                <div className="font-bold text-white">Weather Wise Badge Earned!</div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-teal-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-teal-600 mb-1">{score}</p>
                <p className="text-sm text-gray-600">Total Score</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-blue-600 mb-1">{accuracy}%</p>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-purple-600 mb-1">{maxCombo}</p>
                <p className="text-sm text-gray-600">Max Combo</p>
              </div>
            </div>

            {aiFeedback && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl text-left">
                <p className="text-sm text-teal-600 mb-1 font-semibold">AI Assistant Ava</p>
                <p className="text-gray-700">{aiFeedback}</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <p className="text-sm text-gray-600 mb-3">You earned:</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl font-bold text-yellow-600">+{score * 10} XP</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#FF1744' }}></div>
                  <span className="text-2xl font-bold text-gray-800">+{qCoins} Q-Coins</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-teal-700 hover:to-green-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentWeather) return null;

  const timeProgress = (timeLeft / 3) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 flex items-center bg-white border-b border-gray-200">
        <div className="w-9 flex-shrink-0">
          <button onClick={() => setGameState('complete')} className="p-2 -ml-2">
            <BackArrowIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Weather Shield</h1>
        <div className="w-9 flex-shrink-0"></div>
      </header>

      <div className="p-4 bg-white border-b border-gray-200">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-teal-50 rounded-xl p-3 text-center border border-teal-200">
            <p className="text-2xl font-bold text-teal-600">{round + 1}/{totalRounds}</p>
            <p className="text-xs text-gray-600">Round</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">{score}</p>
            <p className="text-xs text-gray-600">Score</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
            <p className="text-2xl font-bold text-purple-600">{combo}x</p>
            <p className="text-xs text-gray-600">Combo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-600">⏱️</span>
          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft > 2 ? 'bg-green-500' : timeLeft > 1 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${timeProgress}%` }}
            ></div>
          </div>
          <span className={`text-lg font-bold ${timeLeft <= 1 ? 'text-red-600' : 'text-gray-800'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Weather Display */}
        <div className={`bg-gradient-to-br ${currentWeather.bgGradient} rounded-2xl p-8 text-center border-2 border-gray-200 shadow-lg`}>
          <p className="text-white/90 mb-4 text-sm">Current Weather Condition:</p>
          <div className="text-8xl mb-4">{currentWeather.icon}</div>
          <p className="text-white text-2xl font-bold">{currentWeather.description}</p>
        </div>

        {/* Protection Cards */}
        <div>
          <p className="text-center mb-4 text-gray-600 font-semibold">Deploy the right protection:</p>
          <div className="grid grid-cols-3 gap-4">
            {protectionCards.map((card) => {
              const isSelected = showResult && card.id === currentWeather.correctCard;
              const isWrong = showResult && !isCorrect && card.id !== currentWeather.correctCard;
              
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardSelect(card.id)}
                  disabled={showResult}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${card.color} text-white flex flex-col items-center gap-3 transition-all border-2 shadow-lg ${
                    isSelected
                      ? 'border-green-400 ring-4 ring-green-300'
                      : isWrong
                      ? 'border-red-400 opacity-50'
                      : 'border-white/30 hover:shadow-2xl hover:scale-105'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="text-5xl">{card.icon}</div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">{card.name}</p>
                    <p className="text-xs opacity-90 mt-1">{card.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div
            className={`p-4 rounded-2xl text-center text-xl font-bold ${
              isCorrect
                ? 'bg-green-100 border-2 border-green-400 text-green-800'
                : 'bg-red-100 border-2 border-red-400 text-red-800'
            }`}
          >
            {isCorrect ? '✅ Correct!' : '❌ Wrong!'} 
            {isCorrect && combo > 1 && ` +${combo}x Combo Multiplier!`}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherShield;

