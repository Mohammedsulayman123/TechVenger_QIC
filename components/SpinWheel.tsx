import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpinWheelProps {
  onEarnCoins?: (amount: number) => void;
  onEarnXP?: (amount: number) => void;
}

const DAILY_SPIN_LIMIT = 3;

const rewards = [
  { name: 'Q-Coins', icon: '💰', message: 'You won 200 Q-Coins!', amount: 200, probability: 0.645, color: '#fef3c7', textColor: '#ca8a04', type: 'coins' as const },
  { name: 'XP Boost', icon: '⚡', message: 'You unlocked a 2× XP Boost for the next 24 hours!', multiplier: 2, duration: 24, probability: 0.175, color: '#dbeafe', textColor: '#2563eb', type: 'xpBoost' as const },
  { name: 'Discount Coupon', icon: '🛡️', message: 'You got a 5% discount on your next QIC policy renewal!', discount: 5, probability: 0.075, color: '#ede9fe', textColor: '#7c3aed', type: 'coupon' as const },
  { name: 'Partner Perk', icon: '🚗', message: 'You won a Free Car Wash at a partner location!', perk: 'Free Car Wash', probability: 0.1, color: '#fce7f3', textColor: '#db2777', type: 'perk' as const },
  { name: 'Jackpot', icon: '🎉', message: 'Jackpot! You won 1 Month of Premium Free!', jackpot: '1 Month Premium Free', probability: 0.005, color: '#dcfce7', textColor: '#16a34a', type: 'jackpot' as const },
];

const segmentAngle = 360 / rewards.length;

// Create a clip-path for a pie slice of segmentAngle
const segmentClipPath = (() => {
    const angleRad = segmentAngle * (Math.PI / 180);
    const tanValue = Math.tan(angleRad / 2);
    // These percentages are for a w-1/2 h-full div with origin-right
    // to form a triangular wedge of segmentAngle, pointing left.
    const y1 = 50 - 50 * tanValue;
    const y2 = 50 + 50 * tanValue;
    return `polygon(100% 50%, 0% ${y1}%, 0% ${y2}%)`;
})();

const SpinWheel: React.FC<SpinWheelProps> = ({ onEarnCoins, onEarnXP }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<typeof rewards[0] | null>(null);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  // Get daily spin count
  const getDailySpinCount = (): { count: number; date: string; adSpins: number } => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('spinWheelDailySpins');
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // If it's a new day, reset the count
        if (data.date !== today) {
          return { count: 0, date: today, adSpins: 0 };
        }
        return data;
      } catch (e) {
        console.error('Error parsing spin count:', e);
      }
    }
    
    return { count: 0, date: today, adSpins: 0 };
  };

  const [spinData, setSpinData] = useState(getDailySpinCount());
  const remainingSpins = DAILY_SPIN_LIMIT - spinData.count;
  const canSpin = remainingSpins > 0 || spinData.adSpins > 0;

  // Update spin data when component mounts
  useEffect(() => {
    setSpinData(getDailySpinCount());
  }, []);

  const getWinner = () => {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (const reward of rewards) {
      cumulativeProbability += reward.probability;
      if (rand <= cumulativeProbability) {
        return reward;
      }
    }
    return rewards[0]; // Fallback
  };

  const incrementSpinCount = (isAdSpin: boolean = false) => {
    const today = new Date().toDateString();
    const currentData = getDailySpinCount();
    
    if (isAdSpin) {
      const newData = {
        ...currentData,
        adSpins: currentData.adSpins - 1,
        date: today
      };
      localStorage.setItem('spinWheelDailySpins', JSON.stringify(newData));
      setSpinData(newData);
    } else {
      const newData = {
        ...currentData,
        count: currentData.count + 1,
        date: today
      };
      localStorage.setItem('spinWheelDailySpins', JSON.stringify(newData));
      setSpinData(newData);
    }
  };

  const handleSpin = () => {
    if (isSpinning || !canSpin) return;
    
    const isAdSpin = remainingSpins <= 0 && spinData.adSpins > 0;
    
    setIsSpinning(true);
    setWinner(null);
    const winningReward = getWinner();
    const winnerIndex = rewards.findIndex(r => r.name === winningReward.name);
    const baseRotations = 5 * 360;
    
    // The visual segments are rendered using a wedge pointing left (270deg in CSS rotate), 
    // then rotated by i * segmentAngle. The content is centered within this wedge.
    // The pointer is at the top (0deg). We need to rotate the center of the winning segment to 0deg.
    const winnerSegmentCenter = 270 + (winnerIndex * segmentAngle) + (segmentAngle / 2);
    const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8);
    
    // The final rotation should align the winner segment center with the top pointer.
    // CSS rotation is clockwise.
    const targetRotation = baseRotations - winnerSegmentCenter + randomOffset;
    
    setRotation(rotation + targetRotation);
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(winningReward);
      
      // Increment spin count
      incrementSpinCount(isAdSpin);
      
      // Apply the reward based on type
      if (winningReward.type === 'coins' && onEarnCoins && winningReward.amount) {
        onEarnCoins(winningReward.amount);
      } else if (winningReward.type === 'xpBoost') {
        // Store XP boost in localStorage with expiration
        const expiresAt = Date.now() + (winningReward.duration || 24) * 60 * 60 * 1000; // hours to milliseconds
        const xpBoost = {
          multiplier: winningReward.multiplier || 2,
          expiresAt: expiresAt,
          activatedAt: Date.now()
        };
        localStorage.setItem('xpBoost', JSON.stringify(xpBoost));
      } else if (winningReward.type === 'coupon') {
        // Store discount coupon
        const coupons = JSON.parse(localStorage.getItem('discountCoupons') || '[]');
        coupons.push({
          discount: winningReward.discount || 5,
          type: 'policy_renewal',
          earnedAt: Date.now(),
          used: false
        });
        localStorage.setItem('discountCoupons', JSON.stringify(coupons));
      } else if (winningReward.type === 'perk') {
        // Store partner perk
        const perks = JSON.parse(localStorage.getItem('partnerPerks') || '[]');
        perks.push({
          name: winningReward.perk || 'Free Car Wash',
          earnedAt: Date.now(),
          used: false
        });
        localStorage.setItem('partnerPerks', JSON.stringify(perks));
      } else if (winningReward.type === 'jackpot') {
        // Store jackpot reward
        const jackpots = JSON.parse(localStorage.getItem('jackpots') || '[]');
        jackpots.push({
          reward: winningReward.jackpot || '1 Month Premium Free',
          earnedAt: Date.now(),
          used: false
        });
        localStorage.setItem('jackpots', JSON.stringify(jackpots));
      }
    }, 6000); // Animation duration
  };

  const handleWatchAd = () => {
    if (isWatchingAd) return;
    
    setIsWatchingAd(true);
    
    // Simulate watching an ad (3 seconds)
    setTimeout(() => {
      const today = new Date().toDateString();
      const currentData = getDailySpinCount();
      const newData = {
        ...currentData,
        adSpins: currentData.adSpins + 1,
        date: today
      };
      localStorage.setItem('spinWheelDailySpins', JSON.stringify(newData));
      setSpinData(newData);
      setIsWatchingAd(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Spin & Win!</h3>
      <p className="text-gray-500 text-sm mb-2">Spin up to 3 times per day for amazing rewards.</p>
      {remainingSpins > 0 && (
        <p className="text-indigo-600 text-sm font-semibold mb-4">
          {remainingSpins} {remainingSpins === 1 ? 'spin' : 'spins'} remaining today
        </p>
      )}
      {remainingSpins === 0 && spinData.adSpins > 0 && (
        <p className="text-green-600 text-sm font-semibold mb-4">
          {spinData.adSpins} bonus {spinData.adSpins === 1 ? 'spin' : 'spins'} available
        </p>
      )}
      {remainingSpins === 0 && spinData.adSpins === 0 && (
        <p className="text-orange-600 text-sm font-semibold mb-4">
          All spins used! Watch an ad for more chances
        </p>
      )}
      
      <div className="relative w-64 h-64 flex items-center justify-center mb-4">
        {/* Pointer at top */}
        <div style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} className="absolute w-8 h-10 bg-indigo-600 top-0 left-1/2 -translate-x-1/2 -mt-4 z-10 shadow-md" />
        <motion.div
          className="w-full h-full rounded-full border-4 border-indigo-200 overflow-hidden shadow-inner bg-gray-100"
          animate={{ rotate: rotation }}
          transition={{
            duration: 5.5,
            ease: "circOut",
          }}
        >
          {rewards.map((reward, i) => (
            <div
              key={i}
              className="absolute w-1/2 h-full origin-right"
              style={{
                backgroundColor: reward.color,
                transform: `rotate(${i * segmentAngle}deg)`,
                clipPath: segmentClipPath,
                borderColor: reward.textColor,
                borderRightWidth: i % 2 === 0 ? '1px' : '0',
                borderLeftWidth: i % 2 !== 0 ? '1px' : '0',
                opacity: 0.9
              }}
            >
              <div
                className="absolute w-full h-full flex items-center"
                style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
              >
                <div 
                    className="flex flex-col items-center"
                    style={{ transform: `translate(30px, 0px) rotate(-${i * segmentAngle + segmentAngle/2}deg)` }}
                >
                    <span className="text-2xl" role="img" aria-label={reward.name}>{reward.icon}</span>
                    <span className="text-xs font-bold" style={{color: reward.textColor}}>{reward.name}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <button 
        onClick={handleSpin}
        disabled={isSpinning || !canSpin}
        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {isSpinning ? 'Spinning...' : canSpin ? 'SPIN' : 'No Spins Left'}
      </button>
      
      {/* Watch Ad Button */}
      {remainingSpins === 0 && (
        <button
          onClick={handleWatchAd}
          disabled={isWatchingAd || isSpinning}
          className="mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full text-sm shadow-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          {isWatchingAd ? (
            <>
              <span className="animate-spin">⏳</span>
              Watching Ad...
            </>
          ) : (
            <>
              <span>📺</span>
              Watch Ad for Extra Spin
            </>
          )}
        </button>
      )}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setWinner(null)}
          >
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center shadow-xl max-w-sm m-auto">
              <span className="text-6xl mb-4" role="img" aria-label={winner.name}>{winner.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
              <p className="text-gray-600">{winner.message}</p>
              <button
                onClick={() => setWinner(null)}
                className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpinWheel;

