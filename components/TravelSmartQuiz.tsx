import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BackArrowIcon } from './Icons';

interface TravelSmartQuizProps {
  onNavigateBack: () => void;
  onEarnCoins?: (amount: number) => void;
  onEarnXP?: (amount: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correct: number;
  tip: string;
  destination: string;
}

// Question pool - 20 questions
const questionPool: Question[] = [
  {
    question: 'What should you do before traveling internationally?',
    options: [
      'Check visa requirements',
      'Pack at the last minute',
      'Ignore travel advisories',
      'Skip travel insurance'
    ],
    correct: 0,
    tip: 'Always check visa requirements and travel advisories before international trips!',
    destination: 'International Travel'
  },
  {
    question: 'What does comprehensive travel insurance typically cover?',
    options: [
      'Only flight cancellations',
      'Medical emergencies, trip cancellations, and lost luggage',
      'Just hotel bookings',
      'Nothing important'
    ],
    correct: 1,
    tip: 'Comprehensive travel insurance protects you from multiple travel risks!',
    destination: 'Insurance Basics'
  },
  {
    question: 'How early should you arrive at the airport for international flights?',
    options: [
      '30 minutes before',
      '1 hour before',
      '2-3 hours before',
      'Right at departure time'
    ],
    correct: 2,
    tip: 'Arriving 2-3 hours early gives you time for check-in, security, and unexpected delays.',
    destination: 'Airport Tips'
  },
  {
    question: 'What should you keep in your carry-on bag?',
    options: [
      'All luggage',
      'Important documents, medications, and valuables',
      'Only snacks',
      'Nothing'
    ],
    correct: 1,
    tip: 'Keep essentials in your carry-on in case checked luggage is delayed or lost!',
    destination: 'Packing Tips'
  },
  {
    question: 'What is the best way to protect yourself from travel-related illnesses?',
    options: [
      'Ignore vaccinations',
      'Drink untreated water',
      'Get recommended vaccinations and take health precautions',
      'Avoid all medical advice'
    ],
    correct: 2,
    tip: 'Preventive measures like vaccinations can save your trip from health issues!',
    destination: 'Health & Safety'
  },
  {
    question: 'What should you do if your passport expires while traveling?',
    options: [
      'Continue traveling',
      'Contact your embassy immediately',
      'Ignore it',
      'Use a fake passport'
    ],
    correct: 1,
    tip: 'Always contact your embassy if you lose your passport or it expires abroad!',
    destination: 'Emergency Preparedness'
  },
  {
    question: 'What is travel insurance\'s cancellation coverage for?',
    options: [
      'Only weather delays',
      'Unexpected events like illness or family emergencies',
      'Nothing',
      'Only flight cancellations'
    ],
    correct: 1,
    tip: 'Cancellation coverage helps you recover costs from unexpected situations that prevent travel!',
    destination: 'Insurance Coverage'
  },
  {
    question: 'How much money should you keep accessible during travel?',
    options: [
      'All your money in cash',
      'A mix of cash, cards, and digital payment options',
      'No money needed',
      'Only credit cards'
    ],
    correct: 1,
    tip: 'Diversify your payment methods - never rely on just one!',
    destination: 'Money Management'
  },
  {
    question: 'What should you do about travel documents before departure?',
    options: [
      'Make copies and store separately',
      'Leave originals at home',
      'Take only originals',
      'Don\'t need documents'
    ],
    correct: 0,
    tip: 'Always make copies of important documents and store them separately from originals!',
    destination: 'Document Safety'
  },
  {
    question: 'What is the purpose of travel insurance for medical emergencies?',
    options: [
      'No purpose',
      'To cover medical costs abroad which can be extremely expensive',
      'Only for minor injuries',
      'Only in your home country'
    ],
    correct: 1,
    tip: 'Medical costs abroad can be astronomical - insurance is essential!',
    destination: 'Medical Coverage'
  },
  {
    question: 'What should you research about your destination?',
    options: [
      'Nothing',
      'Local customs, laws, and travel advisories',
      'Only the weather',
      'Only hotel prices'
    ],
    correct: 1,
    tip: 'Understanding local customs and laws prevents awkward situations and legal issues!',
    destination: 'Destination Research'
  },
  {
    question: 'What is important to know about travel insurance claims?',
    options: [
      'You can claim anything',
      'Keep receipts and document everything',
      'Claims are automatic',
      'No documentation needed'
    ],
    correct: 1,
    tip: 'Proper documentation is crucial for successful insurance claims!',
    destination: 'Insurance Claims'
  },
  {
    question: 'When should you buy travel insurance?',
    options: [
      'After you arrive',
      'As soon as you book your trip',
      'Never',
      'Only for expensive trips'
    ],
    correct: 1,
    tip: 'Buying early ensures coverage from booking date and protects against pre-trip cancellations!',
    destination: 'Insurance Timing'
  },
  {
    question: 'What should you do if you lose your luggage?',
    options: [
      'Do nothing',
      'Report immediately to airline and keep your claim receipt',
      'Buy new everything',
      'Blame the travel agent'
    ],
    correct: 1,
    tip: 'Quick reporting helps airlines locate your luggage and supports insurance claims!',
    destination: 'Lost Luggage'
  },
  {
    question: 'What does "pre-existing condition" mean in travel insurance?',
    options: [
      'Any illness you had before buying insurance',
      'Only new illnesses',
      'Nothing important',
      'Only minor issues'
    ],
    correct: 0,
    tip: 'Pre-existing conditions need to be declared when buying insurance to ensure coverage!',
    destination: 'Insurance Terms'
  },
  {
    question: 'What is travel delay coverage for?',
    options: [
      'Only for fun',
      'Meals and accommodation during unexpected delays',
      'Nothing',
      'Only flight delays'
    ],
    correct: 1,
    tip: 'Delay coverage helps with unexpected costs when travel plans are disrupted!',
    destination: 'Travel Delays'
  },
  {
    question: 'What should you do with your travel itinerary?',
    options: [
      'Keep it secret',
      'Share a copy with family or friends at home',
      'Throw it away',
      'Only keep digital copy'
    ],
    correct: 1,
    tip: 'Sharing your itinerary helps people know where you are in case of emergency!',
    destination: 'Safety Planning'
  },
  {
    question: 'What is the benefit of travel insurance for adventure activities?',
    options: [
      'No benefit',
      'Specialized coverage for risky activities like skiing or diving',
      'Only for mild activities',
      'Automatically covers everything'
    ],
    correct: 1,
    tip: 'Many standard policies exclude adventure activities - check if you need specialized coverage!',
    destination: 'Adventure Travel'
  },
  {
    question: 'What should you know about travel insurance deductibles?',
    options: [
      'They don\'t exist',
      'The amount you pay before insurance covers costs',
      'They are always zero',
      'Not important'
    ],
    correct: 1,
    tip: 'Understanding deductibles helps you choose the right policy for your needs!',
    destination: 'Insurance Basics'
  },
  {
    question: 'What is the purpose of 24/7 travel assistance services?',
    options: [
      'Just a sales gimmick',
      'Emergency help, medical referrals, and travel support anytime, anywhere',
      'Only during business hours',
      'Only for VIPs'
    ],
    correct: 1,
    tip: '24/7 assistance can be a lifesaver in emergencies abroad - check if your policy includes it!',
    destination: 'Emergency Support'
  }
];

// Helper function to randomly select and shuffle questions (fallback)
const getRandomQuestions = (count: number = 5): Question[] => {
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to generate questions using Gemini API
const generateQuestionsWithAI = async (count: number = 5): Promise<Question[]> => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found, using fallback questions');
    return getRandomQuestions(count);
  }

  try {
    const prompt = `Generate ${count} multiple-choice quiz questions about travel safety, travel insurance, and smart travel practices. Each question should have:
- A clear question text
- 4 answer options (one correct, three plausible distractors)
- A brief educational tip
- A destination/category name

Return ONLY a valid JSON array in this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0,
    "tip": "Educational tip here",
    "destination": "Category Name"
  }
]

Make sure the questions are diverse, educational, and relevant to travel safety and insurance. The "correct" field should be the index (0-3) of the correct answer.`;

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

    // Extract JSON from the response (might have markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').trim();
    }

    const questions = JSON.parse(jsonText);
    
    // Validate and ensure we have the right number
    if (Array.isArray(questions) && questions.length > 0) {
      // Ensure all questions have required fields
      const validQuestions = questions
        .filter((q: any) => q.question && q.options && Array.isArray(q.options) && q.options.length === 4 && typeof q.correct === 'number')
        .slice(0, count);
      
      if (validQuestions.length === count) {
        return validQuestions;
      }
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error generating questions with AI:', error);
    // Fallback to static questions
    return getRandomQuestions(count);
  }
};

const TravelSmartQuiz: React.FC<TravelSmartQuizProps> = ({ onNavigateBack, onEarnCoins, onEarnXP }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'complete' | 'loading'>('intro');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [aiFeedback, setAiFeedback] = useState('');
  const [answeredInTime, setAnsweredInTime] = useState(true);
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const timeLeftRef = useRef(10);

  // Daily play limit tracking
  const DAILY_PLAY_LIMIT = 3;
  
  const getDailyPlayCount = (): { count: number; date: string } => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('travelQuizDailyPlays');
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        // If it's a new day, reset the count
        if (data.date !== today) {
          return { count: 0, date: today };
        }
        return data;
      } catch (e) {
        console.error('Error parsing daily play count:', e);
      }
    }
    
    return { count: 0, date: today };
  };

  const [dailyPlayCount, setDailyPlayCount] = useState(getDailyPlayCount());
  const canPlay = dailyPlayCount.count < DAILY_PLAY_LIMIT;

  // Keep ref in sync with state
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const generateAIFeedback = useCallback(() => {
    const percentage = selectedQuestions.length > 0 ? (correctAnswers / selectedQuestions.length) * 100 : 0;

    if (percentage === 100) {
      setAiFeedback("Impressive! 5/5 correct. You're a true travel expert! Ready for unpredictable weather? ✈️");
    } else if (percentage >= 80) {
      setAiFeedback("Impressive! Great travel knowledge. Time to brace for unpredictable weather? 🌟");
    } else if (percentage >= 60) {
      setAiFeedback("Good effort! You know the basics. Consider our Travel Plus plan for extra protection. 🎒");
    } else {
      setAiFeedback("Keep learning! Travel insurance is crucial for safe adventures. Let's try again! 💡");
    }
  }, [selectedQuestions.length, correctAnswers]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = selectedQuestions.length > 0 && answerIndex === selectedQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prev => {
        const timeBonus = timeLeftRef.current > 5 ? 20 : 10;
        return prev + 100 + timeBonus;
      });
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < selectedQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(10);
        setAnsweredInTime(true);
      } else {
        generateAIFeedback();
        setGameState('complete');
      }
    }, 2500);
  }, [showResult, selectedQuestions, currentQuestion, generateAIFeedback]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setAnsweredInTime(false);
          handleAnswer(-1); // -1 indicates timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showResult, handleAnswer]);

  const handleStart = async () => {
    // Check if user has reached daily limit
    if (!canPlay) {
      return;
    }

    // Increment play count
    const today = new Date().toDateString();
    const newCount = dailyPlayCount.count + 1;
    const updatedData = { count: newCount, date: today };
    localStorage.setItem('travelQuizDailyPlays', JSON.stringify(updatedData));
    setDailyPlayCount(updatedData);

    setGameState('loading');
    setScore(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(10);
    setAnsweredInTime(true);
    setCoinsAwarded(false);
    setXpAwarded(false);
    setAiFeedback('');

    try {
      const randomQuestions = await generateQuestionsWithAI(5);
      setSelectedQuestions(randomQuestions);
      setGameState('playing');
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Error starting quiz:', error);
      // Fallback to static questions
      const fallbackQuestions = getRandomQuestions(5);
      setSelectedQuestions(fallbackQuestions);
      setGameState('playing');
      setCurrentQuestion(0);
    }
  };

  // Track quiz participation for Smart Learner Streak
  const recordQuizParticipation = () => {
    const today = new Date().toDateString();
    const quizHistory = JSON.parse(localStorage.getItem('quizParticipationHistory') || '[]');
    
    // Check if already recorded today
    if (!quizHistory.includes(today)) {
      quizHistory.push(today);
      localStorage.setItem('quizParticipationHistory', JSON.stringify(quizHistory));
    }
  };

  // Award coins and XP when quiz completes
  useEffect(() => {
    if (gameState === 'complete' && !coinsAwarded && onEarnCoins) {
      const qCoins = correctAnswers * 100;
      if (qCoins > 0) {
        onEarnCoins(qCoins);
        setCoinsAwarded(true);
      }
    }
    if (gameState === 'complete' && !xpAwarded && onEarnXP) {
      const earnedXP = score; // Use score as XP
      if (earnedXP > 0) {
        onEarnXP(earnedXP);
        setXpAwarded(true);
      }
      // Record quiz participation for streak tracking
      recordQuizParticipation();
    }
  }, [gameState, correctAnswers, score, onEarnCoins, onEarnXP, coinsAwarded, xpAwarded]);

  // Update daily play count when component mounts or date changes
  useEffect(() => {
    const updated = getDailyPlayCount();
    setDailyPlayCount(updated);
  }, []);

  if (gameState === 'loading') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Travel Smart Quiz</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Generating random questions...</p>
            <p className="text-gray-400 text-sm mt-2">Using AI to create unique questions for you!</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'intro') {
    const remainingPlays = DAILY_PLAY_LIMIT - dailyPlayCount.count;
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Travel Smart Quiz</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          {/* Daily Play Limit Info */}
          <div className={`rounded-2xl p-4 shadow-sm ${
            canPlay 
              ? 'bg-blue-50 border border-blue-200' 
              : 'bg-orange-50 border border-orange-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-semibold ${
                  canPlay ? 'text-blue-800' : 'text-orange-800'
                }`}>
                  {canPlay 
                    ? `Daily Plays: ${dailyPlayCount.count}/${DAILY_PLAY_LIMIT} used`
                    : 'Daily limit reached!'
                  }
                </p>
                <p className={`text-sm mt-1 ${
                  canPlay ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {canPlay 
                    ? `You can play ${remainingPlays} more time${remainingPlays !== 1 ? 's' : ''} today`
                    : 'Come back tomorrow to play again!'
                  }
                </p>
              </div>
              <span className={`text-2xl ${
                canPlay ? 'text-blue-500' : 'text-orange-500'
              }`}>
                {canPlay ? '🎮' : '⏰'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">✈️</span>
              How to Play
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Answer 5 randomly generated questions about travel safety</li>
              <li>• You have 10 seconds per question</li>
              <li>• Each correct answer: +100 points</li>
              <li>• Fast answers get bonus points!</li>
              <li>• Perfect score: Travel Expert Badge! ✈️</li>
            </ul>
          </div>
          <button
            onClick={handleStart}
            disabled={!canPlay}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-colors ${
              canPlay
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canPlay ? 'Start Quiz ✈️' : 'Daily Limit Reached ⏰'}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    const percentage = selectedQuestions.length > 0 ? Math.round((correctAnswers / selectedQuestions.length) * 100) : 0;
    const qCoins = correctAnswers * 100;
    const gotBadge = correctAnswers === selectedQuestions.length;

    return (
      <div className="bg-gray-50 min-h-screen">
        <header className="p-4 flex items-center bg-white border-b border-gray-200">
          <div className="w-9 flex-shrink-0">
            <button onClick={onNavigateBack} className="p-2 -ml-2">
              <BackArrowIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Quiz Complete! ✈️</h1>
          <div className="w-9 flex-shrink-0"></div>
        </header>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">
                {percentage === 100 ? '🏆' : percentage >= 80 ? '✈️' : '📚'}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Results</h2>
            </div>

            {gotBadge && (
              <div className="mb-4 p-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl">
                <div className="text-2xl mb-2">🏅</div>
                <div className="font-bold text-white">Travel Expert Badge Earned!</div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-purple-600 mb-1">{percentage}%</p>
                <p className="text-sm text-gray-600">Accuracy</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-600 mb-1">{correctAnswers}/{selectedQuestions.length}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
            </div>

            {aiFeedback && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
                <p className="text-sm text-blue-600 mb-1 font-semibold">AI Assistant Ava</p>
                <p className="text-gray-700">{aiFeedback}</p>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <p className="text-sm text-gray-600 mb-3">You earned:</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl font-bold text-yellow-600">+{score} XP</span>
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
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const progress = selectedQuestions.length > 0 ? ((currentQuestion + 1) / selectedQuestions.length) * 100 : 0;
  const timeProgress = (timeLeft / 10) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 flex items-center bg-white border-b border-gray-200">
        <div className="w-9 flex-shrink-0">
          <button onClick={() => setGameState('complete')} className="p-2 -ml-2">
            <BackArrowIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Travel Smart Quiz</h1>
        <div className="w-9 flex-shrink-0"></div>
      </header>

      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-600">Question {currentQuestion + 1} of {selectedQuestions.length || 5}</span>
          <span className="font-bold text-gray-800">Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">⏱️</span>
          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft > 5 ? 'bg-green-500' : timeLeft > 3 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${timeProgress}%` }}
            ></div>
          </div>
          <span className={`text-lg font-bold ${timeLeft <= 3 ? 'text-red-600' : 'text-gray-800'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {selectedQuestions.length > 0 && (
          <>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
              <p className="text-sm text-purple-600 mb-2 font-semibold">
                {selectedQuestions[currentQuestion].destination}
              </p>
              <p className="text-xl text-gray-800 font-semibold">
                {selectedQuestions[currentQuestion].question}
              </p>
            </div>

            <div className="space-y-3">
              {selectedQuestions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === selectedQuestions[currentQuestion].correct;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showCorrect
                        ? 'bg-green-100 border-green-500 text-gray-800'
                        : showWrong
                        ? 'bg-red-100 border-red-500 text-gray-800'
                        : 'bg-white border-gray-200 text-gray-800 hover:bg-purple-50 hover:border-purple-400'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                          showCorrect
                            ? 'bg-green-500 text-white'
                            : showWrong
                            ? 'bg-red-500 text-white'
                            : 'bg-purple-500 text-white'
                        }`}
                      >
                        {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 break-words text-left">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div
                className={`p-4 rounded-2xl border ${
                  selectedAnswer === selectedQuestions[currentQuestion].correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <p className="text-gray-800">
                  {selectedAnswer === selectedQuestions[currentQuestion].correct ? '✅ Correct! ' : 'ℹ️ '}
                  {selectedQuestions[currentQuestion].tip}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TravelSmartQuiz;

