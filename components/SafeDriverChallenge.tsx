import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BackArrowIcon } from './Icons';

interface SafeDriverChallengeProps {
  onNavigateBack: () => void;
  onEarnCoins?: (amount: number) => void;
  onEarnXP?: (amount: number) => void;
}

interface Obstacle {
  id: number;
  x: number;
  y: number;
  type: 'pothole' | 'reckless' | 'puddle';
  lane: number;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  lane: number;
}

const SafeDriverChallenge: React.FC<SafeDriverChallengeProps> = ({ onNavigateBack, onEarnCoins, onEarnXP }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'ended'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [coins, setCoins] = useState(0);
  const [collisions, setCollisions] = useState(0);
  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [avaStartMessage, setAvaStartMessage] = useState<string>('');
  const [gameSpeed, setGameSpeed] = useState(1);
  const [obstacleSpawnRate, setObstacleSpawnRate] = useState(2000);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  
  // Track gameplay patterns for personalization
  const obstacleTypesHitRef = useRef<{ pothole: number; reckless: number; puddle: number }>({
    pothole: 0,
    reckless: 0,
    puddle: 0
  });

  // Game state
  const playerLaneRef = useRef(1); // 0, 1, or 2 (left, center, right)
  const obstaclesRef = useRef<Obstacle[]>([]);
  const coinsRef = useRef<Coin[]>([]);
  const lastObstacleSpawnRef = useRef(0);
  const lastCoinSpawnRef = useRef(0);
  const reactionTimesRef = useRef<number[]>([]);
  const lastLaneChangeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();
  const coinsAwardedRef = useRef(false);
  const lastFeedbackTimeRef = useRef(0);

  const LANES = [80, 160, 240]; // X positions for 3 lanes
  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 600;

  // Generate personalized AI feedback using Gemini
  const generateAIFeedback = async (
    context: 'during' | 'end',
    gameStats?: {
      score: number;
      collisions: number;
      coins: number;
      timeSurvived: number;
      averageReactionTime: number;
      obstacleTypesHit: { pothole: number; reckless: number; puddle: number };
      finalScore: number;
    }
  ): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // Fallback feedback
      if (context === 'during') {
        if (collisions === 0 && score > 50) {
          return 'Excellent control — your collision-free streak earns +10% bonus!';
        } else if (collisions > 2) {
          return 'Slow down on wet roads — slippery turns cost 2 seconds.';
        }
        return '';
      } else {
        if (gameStats) {
          if (gameStats.collisions === 0) {
            return "Perfect run! You're a true safe driver champion! 🏆";
          } else if (gameStats.collisions <= 2) {
            return "Great job! With a bit more practice, you'll master this!";
          } else {
            return "Keep practicing! Every expert was once a beginner.";
          }
        }
        return '';
      }
    }

    try {
      let prompt = '';
      
      if (context === 'during') {
        prompt = `You are Ava, a friendly and encouraging AI driving coach. The player is currently playing a safe driving game. Provide a brief, motivating, and personalized tip (max 60 characters) based on their current performance:

Current Stats:
- Score: ${score}
- Collisions: ${collisions}
- Coins collected: ${coins}
- Time remaining: ${timeLeft} seconds

Current Situation: ${collisions === 0 && score > 50 ? 'Player is doing excellent - no collisions yet!' : collisions > 2 ? 'Player is struggling with multiple collisions' : 'Player is doing okay'}

Provide a short, encouraging, and actionable tip. Be friendly and supportive. Keep it under 60 characters.`;
      } else {
        // End game feedback
        if (!gameStats) return '';
        
        prompt = `You are Ava, a friendly and encouraging AI driving coach. The player just finished a safe driving challenge game. Provide personalized, encouraging feedback based on their performance (2-3 sentences):

Game Performance:
- Final Score: ${gameStats.finalScore}
- Collisions: ${gameStats.collisions}
- Q-Coins Collected: ${gameStats.coins}
- Time Survived: ${gameStats.timeSurvived} seconds
- Average Reaction Time: ${gameStats.averageReactionTime.toFixed(0)}ms
- Obstacle Types Hit: Potholes: ${gameStats.obstacleTypesHit.pothole}, Reckless Drivers: ${gameStats.obstacleTypesHit.reckless}, Puddles: ${gameStats.obstacleTypesHit.puddle}

Performance Analysis:
${gameStats.collisions === 0 ? 'Perfect run - no collisions!' : gameStats.collisions <= 2 ? 'Good performance with minor mistakes' : 'Needs improvement - multiple collisions'}
${gameStats.averageReactionTime < 300 ? 'Excellent reaction time!' : gameStats.averageReactionTime < 500 ? 'Good reaction time' : 'Reaction time could be improved'}

Provide personalized, encouraging feedback that:
1. Acknowledges their specific achievements or areas for improvement
2. Gives specific, actionable advice based on their obstacle types hit
3. Is motivating and supportive
4. Mentions their reaction time if relevant
5. Keeps it friendly and conversational (like talking to a friend)

Be specific about which obstacles they struggled with and give practical tips.`;
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error('No response from API');
      }

      return text.trim();
    } catch (error) {
      console.error('Error generating AI feedback:', error);
      // Return fallback feedback
      if (context === 'during') {
        if (collisions === 0 && score > 50) {
          return 'Excellent control — your collision-free streak earns +10% bonus!';
        } else if (collisions > 2) {
          return 'Slow down on wet roads — slippery turns cost 2 seconds.';
        }
        return '';
      } else {
        if (gameStats) {
          if (gameStats.collisions === 0) {
            return "Perfect run! You're a true safe driver champion! 🏆";
          } else if (gameStats.collisions <= 2) {
            return "Great job! With a bit more practice, you'll master this!";
          } else {
            return "Keep practicing! Every expert was once a beginner.";
          }
        }
        return '';
      }
    }
  };

  // Draw taxi car (top-down view)
  const drawTaxi = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const carWidth = 50;
    const carHeight = 80;

    // Car body (light gray/silver)
    ctx.fillStyle = '#D3D3D3';
    ctx.strokeStyle = '#A0A0A0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const r = 8;
    ctx.moveTo(x - carWidth/2 + r, y - carHeight/2);
    ctx.lineTo(x + carWidth/2 - r, y - carHeight/2);
    ctx.quadraticCurveTo(x + carWidth/2, y - carHeight/2, x + carWidth/2, y - carHeight/2 + r);
    ctx.lineTo(x + carWidth/2, y + carHeight/2 - r);
    ctx.quadraticCurveTo(x + carWidth/2, y + carHeight/2, x + carWidth/2 - r, y + carHeight/2);
    ctx.lineTo(x - carWidth/2 + r, y + carHeight/2);
    ctx.quadraticCurveTo(x - carWidth/2, y + carHeight/2, x - carWidth/2, y + carHeight/2 - r);
    ctx.lineTo(x - carWidth/2, y - carHeight/2 + r);
    ctx.quadraticCurveTo(x - carWidth/2, y - carHeight/2, x - carWidth/2 + r, y - carHeight/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Windows (dark gray)
    ctx.fillStyle = '#2A2A2A';
    ctx.fillRect(x - carWidth/2 + 5, y - carHeight/2 + 10, carWidth - 10, 20); // Front window
    ctx.fillRect(x - carWidth/2 + 5, y + carHeight/2 - 30, carWidth - 10, 20); // Rear window
    ctx.fillRect(x - carWidth/2 - 15, y - 15, 10, 30); // Left window
    ctx.fillRect(x + carWidth/2 + 5, y - 15, 10, 30); // Right window

    // Taxi sign on roof (orange/amber)
    ctx.fillStyle = '#FF8C00';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const signR = 3;
    const signX = x - 20;
    const signY = y - carHeight/2 - 8;
    const signW = 40;
    const signH = 12;
    ctx.moveTo(signX + signR, signY);
    ctx.lineTo(signX + signW - signR, signY);
    ctx.quadraticCurveTo(signX + signW, signY, signX + signW, signY + signR);
    ctx.lineTo(signX + signW, signY + signH - signR);
    ctx.quadraticCurveTo(signX + signW, signY + signH, signX + signW - signR, signY + signH);
    ctx.lineTo(signX + signR, signY + signH);
    ctx.quadraticCurveTo(signX, signY + signH, signX, signY + signH - signR);
    ctx.lineTo(signX, signY + signR);
    ctx.quadraticCurveTo(signX, signY, signX + signR, signY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // "TAXI" text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TAXI', x, y - carHeight/2 - 2);

    // Side mirrors
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - carWidth/2 - 5, y - 20, 4, 8);
    ctx.fillRect(x + carWidth/2 + 1, y - 20, 4, 8);

    // Wheels
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.arc(x - 15, y + carHeight/2 - 5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y + carHeight/2 - 5, 6, 0, Math.PI * 2);
    ctx.fill();

    // Taillights
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.ellipse(x - 18, y + carHeight/2, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 18, y + carHeight/2, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw warning triangle obstacle
  const drawWarning = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string) => {
    const size = 40;
    
    // Red triangle with rounded corners
    ctx.fillStyle = '#FF0000';
    ctx.strokeStyle = '#CC0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - size/2);
    ctx.lineTo(x - size/2, y + size/2);
    ctx.lineTo(x + size/2, y + size/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // White exclamation mark
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', x, y + 2);

    // Type indicator (small text below)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px Arial';
    ctx.fillText(type === 'pothole' ? 'P' : type === 'reckless' ? 'R' : 'W', x, y + size/2 + 10);
  };

  // Draw Q-Coin
  const drawCoin = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const radius = 15;
    
    // Solid vibrant red circle (matching header design)
    ctx.fillStyle = '#FF1744';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw road lanes
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    for (let i = 0; i < LANES.length - 1; i++) {
      const x = (LANES[i] + LANES[i + 1]) / 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    const currentTime = Date.now();
    const playerY = CANVAS_HEIGHT - 100;

    // Spawn obstacles
    if (currentTime - lastObstacleSpawnRef.current > obstacleSpawnRate) {
      const lane = Math.floor(Math.random() * 3);
      const types: ('pothole' | 'reckless' | 'puddle')[] = ['pothole', 'reckless', 'puddle'];
      const type = types[Math.floor(Math.random() * types.length)];
      obstaclesRef.current.push({
        id: Date.now(),
        x: LANES[lane],
        y: -50,
        type,
        lane
      });
      lastObstacleSpawnRef.current = currentTime;
    }

    // Spawn coins
    if (currentTime - lastCoinSpawnRef.current > 3000) {
      const lane = Math.floor(Math.random() * 3);
      coinsRef.current.push({
        id: Date.now() + 10000,
        x: LANES[lane],
        y: -50,
        lane
      });
      lastCoinSpawnRef.current = currentTime;
    }

    // Update obstacles
    obstaclesRef.current = obstaclesRef.current.map(obstacle => ({
      ...obstacle,
      y: obstacle.y + 3 * gameSpeed
    })).filter(obstacle => {
      // Check collision
      if (obstacle.y > playerY - 40 && obstacle.y < playerY + 40 && 
          obstacle.lane === playerLaneRef.current) {
        setCollisions(prev => prev + 1);
        // Track obstacle type hit for personalization
        obstacleTypesHitRef.current[obstacle.type]++;
        return false;
      }
      return obstacle.y < CANVAS_HEIGHT + 50;
    });

    // Update coins
    coinsRef.current = coinsRef.current.map(coin => ({
      ...coin,
      y: coin.y + 3 * gameSpeed
    })).filter(coin => {
      // Check coin collection
      if (coin.y > playerY - 30 && coin.y < playerY + 30 && 
          coin.lane === playerLaneRef.current) {
        setCoins(prev => prev + 1);
        setScore(prev => prev + 10);
        return false;
      }
      return coin.y < CANVAS_HEIGHT + 50;
    });

    // Draw obstacles
    obstaclesRef.current.forEach(obstacle => {
      const typeLabel = obstacle.type === 'pothole' ? 'Pothole' : 
                       obstacle.type === 'reckless' ? 'Reckless' : 'Puddle';
      drawWarning(ctx, obstacle.x, obstacle.y, typeLabel);
    });

    // Draw coins
    coinsRef.current.forEach(coin => {
      drawCoin(ctx, coin.x, coin.y);
    });

    // Draw player taxi
    drawTaxi(ctx, LANES[playerLaneRef.current], playerY);

    // AI Personalization with Gemini (throttled to avoid too many API calls)
    if (!isGeneratingFeedback && currentTime - lastFeedbackTimeRef.current > 5000) {
      if (collisions === 0 && score > 50 && score % 100 === 0) {
        // Player doing well - increase difficulty and get AI feedback
        if (gameSpeed < 1.5) {
          setGameSpeed(prev => Math.min(prev + 0.1, 1.5));
          setObstacleSpawnRate(prev => Math.max(prev - 100, 1500));
        }
        lastFeedbackTimeRef.current = currentTime;
        setIsGeneratingFeedback(true);
        generateAIFeedback('during').then(feedback => {
          if (feedback) {
            setAiFeedback(feedback);
            setTimeout(() => setAiFeedback(''), 4000);
          }
          setIsGeneratingFeedback(false);
        }).catch(() => {
          setIsGeneratingFeedback(false);
        });
      } else if (collisions > 0 && collisions % 2 === 0) {
        // Player struggling - reduce difficulty and get AI feedback
        if (gameSpeed > 0.7) {
          setGameSpeed(prev => Math.max(prev - 0.1, 0.7));
          setObstacleSpawnRate(prev => Math.min(prev + 200, 3000));
        }
        lastFeedbackTimeRef.current = currentTime;
        setIsGeneratingFeedback(true);
        generateAIFeedback('during').then(feedback => {
          if (feedback) {
            setAiFeedback(feedback);
            setTimeout(() => setAiFeedback(''), 4000);
          }
          setIsGeneratingFeedback(false);
        }).catch(() => {
          setIsGeneratingFeedback(false);
        });
      }
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, gameSpeed, obstacleSpawnRate, collisions, score]);

  // Handle swipe/touch
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (gameState !== 'playing') return;

    const now = Date.now();
    const reactionTime = now - lastLaneChangeRef.current;
    reactionTimesRef.current.push(reactionTime);

    if (direction === 'left' && playerLaneRef.current > 0) {
      playerLaneRef.current--;
    } else if (direction === 'right' && playerLaneRef.current < 2) {
      playerLaneRef.current++;
    }
    lastLaneChangeRef.current = now;
  }, [gameState]);

  // Touch/swipe handlers
  useEffect(() => {
    if (gameState !== 'playing') return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        handleSwipe(deltaX > 0 ? 'right' : 'left');
      }
    };

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleSwipe('left');
      if (e.key === 'ArrowRight') handleSwipe('right');
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, handleSwipe]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Award coins and XP when game ends, and generate personalized AI feedback
  useEffect(() => {
    if (gameState === 'ended') {
      const calculatedFinalScore = score + (60 - timeLeft) * 10 - collisions * 50;
      const averageReactionTime = reactionTimesRef.current.length > 0
        ? reactionTimesRef.current.reduce((a, b) => a + b, 0) / reactionTimesRef.current.length
        : 0;
      
      // Set Ava's dynamic end-game message based on score
      const isHighScore = calculatedFinalScore >= 500;
      
      if (!coinsAwardedRef.current && onEarnCoins) {
        const earnedCoins = coins * 10 + (collisions === 0 ? 200 : 0);
        if (earnedCoins > 0) {
          onEarnCoins(earnedCoins);
          coinsAwardedRef.current = true;
        }
      }
      
      if (!xpAwarded && onEarnXP) {
        if (isHighScore) {
          // Award 150 XP for high score
          onEarnXP(150);
          setAiFeedback("Impressive! You're road-ready. You earned +150 XP and the Safe Driver badge 🏅.");
        } else {
          // Award calculated XP for lower scores
          const earnedXP = Math.max(0, Math.floor(calculatedFinalScore / 10)); // Scale down for lower scores
          if (earnedXP > 0) {
            onEarnXP(earnedXP);
          }
          setAiFeedback("Not bad! Try again to improve your reaction time and claim the next badge.");
        }
        setXpAwarded(true);
      }
      
      // Generate personalized end-game AI feedback (optional, for additional context)
      if (!isGeneratingFeedback) {
        setIsGeneratingFeedback(true);
        generateAIFeedback('end', {
          score,
          collisions,
          coins,
          timeSurvived: 60 - timeLeft,
          averageReactionTime,
          obstacleTypesHit: obstacleTypesHitRef.current,
          finalScore: calculatedFinalScore
        }).then(feedback => {
          // Keep the dynamic message, but we can use feedback for additional context if needed
          setIsGeneratingFeedback(false);
        });
      }
    }
  }, [gameState, coins, collisions, score, timeLeft, onEarnCoins, onEarnXP, xpAwarded, isGeneratingFeedback]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameLoop]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCoins(0);
    setCollisions(0);
    setGameSpeed(1);
    setObstacleSpawnRate(2000);
    setAiFeedback('');
    setIsGeneratingFeedback(false);
    setAvaStartMessage("Buckle up! Let's see how safely you can drive. I'll quiz you on real-life driving situations 🚗💡.");
    playerLaneRef.current = 1;
    obstaclesRef.current = [];
    coinsRef.current = [];
    lastObstacleSpawnRef.current = 0;
    lastCoinSpawnRef.current = 0;
    reactionTimesRef.current = [];
    lastLaneChangeRef.current = Date.now();
    coinsAwardedRef.current = false;
    setXpAwarded(false);
    // Reset obstacle tracking
    obstacleTypesHitRef.current = {
      pothole: 0,
      reckless: 0,
      puddle: 0
    };
    
    // Clear start message after 5 seconds
    setTimeout(() => {
      setAvaStartMessage('');
    }, 5000);
  };

  const averageReactionTime = reactionTimesRef.current.length > 0
    ? reactionTimesRef.current.reduce((a, b) => a + b, 0) / reactionTimesRef.current.length
    : 0;

  const finalScore = score + (60 - timeLeft) * 10 - collisions * 50;
  const earnedCoins = coins * 10 + (collisions === 0 ? 200 : 0);
  
  // Determine if high or low score (threshold: 500 points)
  const isHighScore = finalScore >= 500;

  if (gameState === 'menu') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Safe Driver Challenge</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎮 Game Rules</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Swipe left/right or use arrow keys to change lanes</li>
              <li>• Avoid obstacles: potholes, reckless drivers, and puddles</li>
              <li>• Collect Q-Coins for bonus points</li>
              <li>• Survive 1 minute to win!</li>
            </ul>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'ended') {
    const gotBadge = collisions === 0;
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Game Over</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Score</h2>
            <div className="text-4xl font-bold text-blue-600 mb-6">{finalScore}</div>
            
            {gotBadge && (
              <div className="mb-4 p-4 bg-yellow-100 rounded-xl">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-yellow-800">Safe Driver Badge Earned!</div>
              </div>
            )}

            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Q-Coins Collected:</span>
                <span className="font-bold">{coins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Collisions:</span>
                <span className="font-bold text-red-600">{collisions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Survived:</span>
                <span className="font-bold">{60 - timeLeft}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Reaction:</span>
                <span className="font-bold">{averageReactionTime.toFixed(0)}ms</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Q-Coins Earned:</span>
                    <span className="font-bold text-green-600">+{earnedCoins}</span>
                </div>
              </div>
            </div>
          </div>

          {aiFeedback && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-indigo-600 mb-1 font-semibold">Ava AI Coach</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{aiFeedback}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 flex items-center bg-white border-b border-gray-200">
        <div className="w-9 flex-shrink-0">
          <button onClick={() => setGameState('ended')} className="p-2 -ml-2">
            <BackArrowIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Safe Driver Challenge</h1>
        <div className="w-9 flex-shrink-0"></div>
      </header>
      
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="text-gray-600">Time: </span>
            <span className="font-bold text-blue-600">{timeLeft}s</span>
          </div>
          <div>
            <span className="text-gray-600">Score: </span>
            <span className="font-bold">{score}</span>
          </div>
          <div>
            <span className="text-gray-600">Coins: </span>
            <span className="font-bold text-yellow-600">{coins}</span>
          </div>
        </div>
        {avaStartMessage && (
          <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-indigo-600 mb-1 font-semibold">Ava AI</p>
                <p className="text-gray-700 text-sm leading-relaxed">{avaStartMessage}</p>
              </div>
            </div>
          </div>
        )}
        {aiFeedback && !avaStartMessage && (
          <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded-lg text-xs text-center">
            {aiFeedback}
          </div>
        )}
      </div>

      <div className="flex justify-center p-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-gray-300 rounded-lg bg-black"
          style={{ touchAction: 'none' }}
        />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="text-center text-sm text-gray-600 mb-2">
          Swipe left/right or use arrow keys to change lanes
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleSwipe('left')}
            className="px-6 py-3 bg-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-300"
          >
            ← Left
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="px-6 py-3 bg-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-300"
          >
            Right →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeDriverChallenge;

