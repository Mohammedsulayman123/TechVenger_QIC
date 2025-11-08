import React, { useState, useEffect, useMemo } from 'react';
import { BackArrowIcon, ListItemChevronRightIcon, SteeringWheelIcon, PassportQuizIcon, WeatherShieldIcon } from './Icons';

interface QicWorldPageProps {
  onNavigateBack: () => void;
  onNavigateToGame?: (gameName: string) => void;
  xp: number;
  level: number;
}

interface LeaderboardPlayer {
  id: string;
  name: string;
  initials: string;
  xp: number;
  level: number;
  tier: string;
  isCurrentUser: boolean;
}

interface GameCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    iconBgColor: string;
    iconColor: string;
    onClick?: () => void;
    locked?: boolean;
    requiredXP?: number;
    currentXP?: number;
}

const GameCard: React.FC<GameCardProps> = ({ icon: Icon, title, description, iconBgColor, iconColor, onClick, locked, requiredXP, currentXP }) => {
    return (
        <button 
            onClick={locked ? undefined : onClick}
            className={`w-full bg-white p-4 rounded-2xl flex items-center text-left border border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
                locked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:bg-violet-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300'
            }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgColor} ${locked ? 'opacity-50' : ''}`}>
                {locked ? (
                    <span className="text-2xl">🔒</span>
                ) : (
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                )}
            </div>
            <div className="ml-4 flex-grow">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    {locked && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Locked</span>}
                </div>
                <p className="text-sm text-gray-500">{description}</p>
                {locked && requiredXP && currentXP !== undefined && (
                    <p className="text-xs text-orange-600 mt-1">
                        Requires {requiredXP} XP (You have {currentXP} XP)
                    </p>
                )}
            </div>
            {!locked && <ListItemChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />}
        </button>
    )
}

const QicWorldPage: React.FC<QicWorldPageProps> = ({ onNavigateBack, onNavigateToGame, xp, level }) => {
    const WEATHER_SHIELD_REQUIRED_XP = 500; // Requires 500 XP (Level 5)
    const isWeatherShieldLocked = xp < WEATHER_SHIELD_REQUIRED_XP;

    // Calculate tier from level
    const calculateTier = (levelValue: number) => {
        if (levelValue >= 20) return 'Diamond';
        if (levelValue >= 15) return 'Platinum';
        if (levelValue >= 10) return 'Gold';
        if (levelValue >= 5) return 'Silver';
        return 'Bronze';
    };

    const calculateLevel = (xpValue: number) => {
        return Math.floor(xpValue / 100) + 1;
    };

    // Initialize and manage leaderboard
    const initializeLeaderboard = (): LeaderboardPlayer[] => {
        const stored = localStorage.getItem('leaderboard');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing leaderboard:', e);
            }
        }
        
        // Default leaderboard with sample players
        const defaultPlayers: LeaderboardPlayer[] = [
            { id: 'user-1', name: 'Sarah Chen', initials: 'SC', xp: 8500, level: calculateLevel(8500), tier: calculateTier(calculateLevel(8500)), isCurrentUser: false },
            { id: 'user-2', name: 'Mike Johnson', initials: 'MJ', xp: 7200, level: calculateLevel(7200), tier: calculateTier(calculateLevel(7200)), isCurrentUser: false },
            { id: 'user-3', name: 'Emily Davis', initials: 'ED', xp: 6800, level: calculateLevel(6800), tier: calculateTier(calculateLevel(6800)), isCurrentUser: false },
            { id: 'user-4', name: 'Alex Kumar', initials: 'AK', xp: 5500, level: calculateLevel(5500), tier: calculateTier(calculateLevel(5500)), isCurrentUser: false },
            { id: 'user-5', name: 'Jordan Lee', initials: 'JL', xp: 4200, level: calculateLevel(4200), tier: calculateTier(calculateLevel(4200)), isCurrentUser: false },
            { id: 'user-6', name: 'Chris Martinez', initials: 'CM', xp: 2800, level: calculateLevel(2800), tier: calculateTier(calculateLevel(2800)), isCurrentUser: false },
            { id: 'user-7', name: 'Pat Wilson', initials: 'PW', xp: 2100, level: calculateLevel(2100), tier: calculateTier(calculateLevel(2100)), isCurrentUser: false },
            { id: 'user-8', name: 'Taylor Brown', initials: 'TB', xp: 1500, level: calculateLevel(1500), tier: calculateTier(calculateLevel(1500)), isCurrentUser: false },
            { id: 'user-9', name: 'Jamie White', initials: 'JW', xp: 900, level: calculateLevel(900), tier: calculateTier(calculateLevel(900)), isCurrentUser: false },
        ];
        
        localStorage.setItem('leaderboard', JSON.stringify(defaultPlayers));
        return defaultPlayers;
    };

    const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>(initializeLeaderboard);

    // Update current user in leaderboard when XP changes
    useEffect(() => {
        const currentUserId = 'current-user';
        const currentUserTier = calculateTier(level);
        
        setLeaderboard(prev => {
            const updated = prev.map(player => 
                player.isCurrentUser 
                    ? { ...player, xp, level, tier: currentUserTier }
                    : player
            );
            
            // If current user doesn't exist, add them
            const currentUserExists = updated.some(p => p.isCurrentUser);
            if (!currentUserExists) {
                updated.push({
                    id: currentUserId,
                    name: 'You (You)',
                    initials: 'YO',
                    xp,
                    level,
                    tier: currentUserTier,
                    isCurrentUser: true
                });
            }
            
            // Sort by XP descending
            const sorted = updated.sort((a, b) => b.xp - a.xp);
            
            // Save to localStorage
            localStorage.setItem('leaderboard', JSON.stringify(sorted));
            
            return sorted;
        });
    }, [xp, level]);

    // Calculate ranked leaderboard with positions
    const rankedLeaderboard = useMemo(() => {
        return leaderboard.map((player, index) => ({
            ...player,
            rank: index + 1
        }));
    }, [leaderboard]);

    // Get top 3 champions
    const top3Champions = useMemo(() => {
        return rankedLeaderboard.slice(0, 3);
    }, [rankedLeaderboard]);

    // Get remaining rankings (rank 4+)
    const remainingRankings = useMemo(() => {
        return rankedLeaderboard.slice(3);
    }, [rankedLeaderboard]);

    const games = [
        {
            icon: SteeringWheelIcon,
            title: 'Safe Driver Challenge',
            description: 'Test your driving knowledge and reflexes.',
            iconBgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
            onClick: () => onNavigateToGame?.('SafeDriverChallenge'),
            locked: false,
        },
        {
            icon: PassportQuizIcon,
            title: 'Travel Smart Quiz',
            description: 'Are you a savvy traveler? Find out!',
            iconBgColor: 'bg-green-100',
            iconColor: 'text-green-600',
            onClick: () => onNavigateToGame?.('TravelSmartQuiz'),
            locked: false,
        },
        {
            icon: WeatherShieldIcon,
            title: 'Weather Shield',
            description: 'Protect your car from the elements.',
            iconBgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            onClick: () => onNavigateToGame?.('WeatherShield'),
            locked: isWeatherShieldLocked,
            requiredXP: WEATHER_SHIELD_REQUIRED_XP,
            currentXP: xp,
        }
    ]

  return (
    <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
            <div className="w-9 flex-shrink-0">
                <button onClick={onNavigateBack} className="p-2 -ml-2">
                    <BackArrowIcon className="w-5 h-5 text-gray-600" />
                </button>
            </div>
            <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">QIC World</h1>
            <div className="w-9 flex-shrink-0"></div> {/* Spacer */}
        </header>
        <div className="p-6 space-y-4">
            {games.map(game => (
                <GameCard 
                    key={game.title} 
                    icon={game.icon}
                    title={game.title}
                    description={game.description}
                    iconBgColor={game.iconBgColor}
                    iconColor={game.iconColor}
                    onClick={game.onClick}
                    locked={game.locked}
                    requiredXP={game.requiredXP}
                    currentXP={game.currentXP}
                />
            ))}

            {/* Top 3 Champions Card */}
            {top3Champions.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Top 3 Champions</h2>
                    <p className="text-sm text-gray-500 mb-6">This month's leading players</p>
                    
                    <div className="flex justify-between items-start gap-4">
                        {top3Champions.map((champion, index) => {
                            const position = index + 1;
                            const isTop = position === 1;
                            const isSecond = position === 2;
                            const isThird = position === 3;
                            
                            return (
                                <div key={champion.id} className="flex-1 flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                                        isTop 
                                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-orange-300' 
                                            : isSecond
                                            ? 'bg-gray-200'
                                            : 'bg-orange-100 border-2 border-orange-300'
                                    }`}>
                                        <span className={`font-bold text-sm ${
                                            isTop ? 'text-gray-800' : 'text-gray-700'
                                        }`}>
                                            {champion.initials}
                                        </span>
                                    </div>
                                    <div className="relative mb-2">
                                        <svg className={`${isTop ? 'w-10 h-10 text-yellow-500' : isSecond ? 'w-8 h-8 text-gray-400' : 'w-8 h-8 text-orange-600'}`} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                        </svg>
                                        {!isTop && (
                                            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full flex items-center justify-center border ${
                                                isSecond ? 'border-gray-300' : 'border-orange-300'
                                            }`}>
                                                <span className={`text-xs font-bold ${
                                                    isSecond ? 'text-gray-700' : 'text-orange-700'
                                                }`}>
                                                    {position}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{champion.name}</p>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                        isTop 
                                            ? 'text-orange-700 bg-orange-100' 
                                            : 'text-gray-700 bg-gray-100'
                                    }`}>
                                        {champion.xp.toLocaleString()} XP
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* All Rankings Card */}
            {remainingRankings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">All Rankings</h2>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {remainingRankings.map((player) => (
                            <div
                                key={player.id}
                                className={`flex items-center gap-3 p-3 rounded-xl ${
                                    player.isCurrentUser 
                                        ? 'bg-blue-50 border border-blue-200' 
                                        : 'bg-gray-50'
                                }`}
                            >
                                {/* Medal Icon */}
                                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>

                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    player.isCurrentUser 
                                        ? 'bg-blue-500' 
                                        : 'bg-gray-200'
                                }`}>
                                    <span className={`font-bold text-sm ${
                                        player.isCurrentUser 
                                            ? 'text-white' 
                                            : 'text-gray-700'
                                    }`}>
                                        {player.initials}
                                    </span>
                                </div>

                                {/* Player Info */}
                                <div className="flex-grow min-w-0">
                                    <p className={`text-sm font-semibold ${
                                        player.isCurrentUser 
                                            ? 'text-blue-900' 
                                            : 'text-gray-800'
                                    }`}>
                                        {player.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{player.tier} Tier</p>
                                </div>

                                {/* XP and Rank */}
                                <div className="flex flex-col items-end flex-shrink-0">
                                    <p className={`text-sm font-semibold ${
                                        player.isCurrentUser 
                                            ? 'text-blue-600' 
                                            : 'text-blue-500'
                                    }`}>
                                        {player.xp.toLocaleString()} XP
                                    </p>
                                    <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full mt-1">
                                        Rank #{player.rank}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default QicWorldPage;