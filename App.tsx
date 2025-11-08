import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import MyCarsPage from './components/MyCarsPage';
import Dashboard from './components/Dashboard';
import InsurancePage from './components/InsurancePage';
import CityPage from './components/CityPage';
import ProfilePage from './components/ProfilePage';
import AvaAiPage from './components/AvaAiPage';
import QicWorldPage from './components/QicWorldPage';
import CoinsPage from './components/CoinsPage';
import TravelInsurancePage from './components/TravelInsurancePage';
import SafeDriverChallenge from './components/SafeDriverChallenge';
import TravelSmartQuiz from './components/TravelSmartQuiz';
import WeatherShield from './components/WeatherShield';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Main');
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'profile', 'qicWorld', or 'game'
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  
  // Q-Coin balance - load from localStorage or default to 1000
  const [qCoins, setQCoins] = useState(() => {
    const saved = localStorage.getItem('qCoins');
    return saved ? parseInt(saved, 10) : 1000;
  });

  // XP and Level - load from localStorage or default to 0
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Calculate level from XP (100 XP per level)
  const calculateLevel = (xpValue: number) => {
    return Math.floor(xpValue / 100) + 1;
  };

  // Calculate tier from level
  const calculateTier = (level: number) => {
    if (level >= 20) return 'Diamond';
    if (level >= 15) return 'Platinum';
    if (level >= 10) return 'Gold';
    if (level >= 5) return 'Silver';
    return 'Bronze';
  };

  const level = calculateLevel(xp);
  const tier = calculateTier(level);
  const xpForNextLevel = level * 100;
  const xpInCurrentLevel = xp % 100;
  const xpProgress = (xpInCurrentLevel / 100) * 100;

  // Update Q-Coins and save to localStorage
  const updateQCoins = (amount: number) => {
    setQCoins(prev => {
      const newValue = prev + amount;
      localStorage.setItem('qCoins', newValue.toString());
      return newValue;
    });
  };

  // Update XP and save to localStorage
  const updateXP = (amount: number) => {
    setXp(prev => {
      // Check for active XP boost
      const xpBoostData = localStorage.getItem('xpBoost');
      let finalAmount = amount;
      
      if (xpBoostData) {
        try {
          const xpBoost = JSON.parse(xpBoostData);
          const now = Date.now();
          
          // Check if boost is still active
          if (xpBoost.expiresAt && now < xpBoost.expiresAt) {
            finalAmount = amount * (xpBoost.multiplier || 1);
          } else {
            // Boost expired, remove it
            localStorage.removeItem('xpBoost');
          }
        } catch (e) {
          console.error('Error parsing XP boost:', e);
        }
      }
      
      const newValue = prev + finalAmount;
      localStorage.setItem('xp', newValue.toString());
      return newValue;
    });
  };

  const handleNavigateToProfile = () => setCurrentPage('profile');
  const handleNavigateToQicWorld = () => setCurrentPage('qicWorld');
  const handleNavigateToCoins = () => setCurrentPage('coins');
  const handleNavigateToTravelInsurance = () => setCurrentPage('travelInsurance');
  const handleNavigateBack = () => {
    setCurrentPage('main');
    setCurrentGame(null);
  };
  const handleNavigateToGame = (gameName: string) => {
    setCurrentGame(gameName);
    setCurrentPage('game');
  };


  const handleNavigateFromAva = (page: 'Main' | 'My cars' | 'Insurance' | 'City' | 'Profile' | 'Ava AI') => {
    if (page === 'Profile') {
      handleNavigateToProfile();
    } else {
      setActiveTab(page);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Main':
        return <Dashboard onNavigateToProfile={handleNavigateToProfile} onNavigateToQicWorld={handleNavigateToQicWorld} onNavigateToCoins={handleNavigateToCoins} qCoins={qCoins} xp={xp} level={level} tier={tier} xpProgress={xpProgress} />;
      case 'My cars':
        return <MyCarsPage />;
      case 'Ava AI':
        return <AvaAiPage onNavigate={handleNavigateFromAva} onEarnCoins={updateQCoins} />;
      case 'Insurance':
        return <InsurancePage onEarnCoins={updateQCoins} onEarnXP={updateXP} onNavigateToTravelInsurance={handleNavigateToTravelInsurance} />;
      case 'City':
        return <CityPage />;
      default:
        return <div className="p-6 text-center text-gray-500">Content for {activeTab}</div>;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
        case 'profile':
            return <ProfilePage onNavigateBack={handleNavigateBack} xp={xp} level={level} tier={tier} qCoins={qCoins} />;
        case 'coins':
            return <CoinsPage onNavigateBack={handleNavigateBack} qCoins={qCoins} />;
        case 'travelInsurance':
            return <TravelInsurancePage onNavigateBack={handleNavigateBack} qCoins={qCoins} onUseCoins={updateQCoins} />;
        case 'qicWorld':
            return <QicWorldPage onNavigateBack={handleNavigateBack} onNavigateToGame={handleNavigateToGame} xp={xp} level={level} />;
        case 'game':
            if (currentGame === 'SafeDriverChallenge') {
                return <SafeDriverChallenge onNavigateBack={handleNavigateBack} onEarnCoins={updateQCoins} onEarnXP={updateXP} />;
            }
            if (currentGame === 'TravelSmartQuiz') {
                return <TravelSmartQuiz onNavigateBack={handleNavigateBack} onEarnCoins={updateQCoins} onEarnXP={updateXP} />;
            }
            if (currentGame === 'WeatherShield') {
                return <WeatherShield onNavigateBack={handleNavigateBack} onEarnCoins={updateQCoins} onEarnXP={updateXP} />;
            }
            return <div className="p-6 text-center text-gray-500">Game not found</div>;
        case 'main':
        default:
            return (
                 <>
                    <main className="flex-grow overflow-y-auto pb-24">
                        {renderTabContent()}
                    </main>
                    <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
                </>
            )
    }
  }

  return (
    <div className="bg-[#F3F4F8] min-h-screen font-sans flex justify-center">
      <div className={`w-full max-w-sm mx-auto ${currentPage === 'game' ? '' : 'bg-white shadow-lg'} flex flex-col`}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;