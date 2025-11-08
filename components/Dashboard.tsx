import React from 'react';
import Header from './Header';
import ExploreSection from './ExploreSection';
import AddCarCard from './AddCarCard';
import InfoSection from './InfoSection';
import QicWorldCard from './QicWorldCard';

interface DashboardProps {
  onNavigateToProfile: () => void;
  onNavigateToQicWorld: () => void;
  onNavigateToCoins?: () => void;
  qCoins: number;
  xp: number;
  level: number;
  tier: string;
  xpProgress: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToProfile, onNavigateToQicWorld, onNavigateToCoins, qCoins, xp, level, tier, xpProgress }) => {
  return (
    <div className="p-6 space-y-6">
      <Header onNavigateToProfile={onNavigateToProfile} onNavigateToCoins={onNavigateToCoins} qCoins={qCoins} xp={xp} level={level} tier={tier} xpProgress={xpProgress} />
      <ExploreSection />
      <AddCarCard />
      <QicWorldCard onClick={onNavigateToQicWorld} />
      <InfoSection />
    </div>
  );
};

export default Dashboard;