import React, { useState, useEffect, useRef } from 'react';
import { AvaAiIcon, PaperAirplaneIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'Main' | 'My cars' | 'Insurance' | 'City' | 'Profile' | 'Ava AI';

interface AvaResponse {
  text: string;
  action?: {
    type: 'navigate';
    page: Page;
  };
}

interface Message {
  text: string;
  sender: 'user' | 'ava';
  attachment?: {
    type: 'image' | 'document';
    file: File;
    preview?: string;
  };
}

interface TriviaQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface AvaAiPageProps {
    onNavigate: (page: Page) => void;
    onEarnCoins?: (amount: number) => void;
}

// Daily trivia questions pool
const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What does comprehensive insurance cover?",
    options: [
      "Only collision damage",
      "Theft, vandalism, natural disasters, and other non-collision damage",
      "Only medical expenses",
      "Nothing important"
    ],
    correct: 1,
    explanation: "Comprehensive insurance covers damage from theft, vandalism, natural disasters, falling objects, and other non-collision incidents. It's essential for protecting your vehicle from various risks!"
  },
  {
    question: "What is a deductible in car insurance?",
    options: [
      "The amount you pay monthly",
      "The amount you pay out of pocket before insurance covers the rest",
      "The total coverage amount",
      "A bonus payment"
    ],
    correct: 1,
    explanation: "A deductible is the amount you pay out of pocket before your insurance company covers the remaining costs. Lower deductibles mean higher premiums, and vice versa."
  },
  {
    question: "What does liability insurance cover?",
    options: [
      "Damage to your own car",
      "Damage and injuries you cause to others",
      "Only medical expenses",
      "Theft and vandalism"
    ],
    correct: 1,
    explanation: "Liability insurance covers damage and injuries you cause to other people and their property. It's typically required by law and doesn't cover your own vehicle."
  },
  {
    question: "What is collision insurance?",
    options: [
      "Insurance for natural disasters",
      "Insurance that covers damage to your car from accidents",
      "Insurance for theft",
      "Insurance for medical expenses"
    ],
    correct: 1,
    explanation: "Collision insurance covers damage to your vehicle resulting from a collision with another vehicle or object, regardless of who is at fault."
  },
  {
    question: "When should you review your insurance policy?",
    options: [
      "Never",
      "Only when you have a claim",
      "Annually or when major life changes occur",
      "Every month"
    ],
    correct: 2,
    explanation: "You should review your policy annually or when major life changes occur (new car, moving, marriage, etc.) to ensure you have adequate coverage."
  },
  {
    question: "What affects your car insurance premium?",
    options: [
      "Only your age",
      "Your driving record, age, location, vehicle type, and coverage level",
      "Only your car's color",
      "Nothing"
    ],
    correct: 1,
    explanation: "Multiple factors affect premiums: driving history, age, location, vehicle make/model, coverage level, and even credit score in some regions."
  },
  {
    question: "What is gap insurance?",
    options: [
      "Insurance for gaps in coverage",
      "Insurance that covers the difference between what you owe and your car's value",
      "Insurance for tire damage",
      "A type of liability insurance"
    ],
    correct: 1,
    explanation: "Gap insurance covers the difference between what you owe on your car loan and the car's actual cash value if it's totaled or stolen."
  },
  {
    question: "What does uninsured motorist coverage protect against?",
    options: [
      "Your own uninsured status",
      "Accidents with drivers who have no insurance or insufficient coverage",
      "Only hit-and-run accidents",
      "Nothing"
    ],
    correct: 1,
    explanation: "Uninsured/underinsured motorist coverage protects you if you're in an accident with a driver who has no insurance or insufficient coverage."
  }
];

const AvaAiPage: React.FC<AvaAiPageProps> = ({ onNavigate, onEarnCoins }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ava',
      text: "Hello! I'm Ava, your smart insurance companion. How can I assist you today? I can help you with:\n\n• Upload car registration documents - I'll extract renewal dates and set reminders\n• Analyze claim photos - I'll estimate repair costs\n• Review policy documents - I'll check your coverage and provide summaries\n• Daily Trivia - Answer 2 questions per day and win 50 Q-Coins for each correct answer! 🎯\n\nYou can also ask me about insurance, rewards, or our fun challenges!",
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [triviaState, setTriviaState] = useState<{
    active: boolean;
    currentQuestion: TriviaQuestion | null;
    waitingForAnswer: boolean;
  }>({
    active: false,
    currentQuestion: null,
    waitingForAnswer: false
  });
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check daily trivia attempts
  const getDailyTriviaCount = (): number => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyTriviaAttempts');
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.date === today) {
          return data.count || 0;
        }
      } catch (e) {
        console.error('Error parsing trivia attempts:', e);
      }
    }
    return 0;
  };

  const incrementTriviaCount = () => {
    const today = new Date().toDateString();
    const count = getDailyTriviaCount() + 1;
    localStorage.setItem('dailyTriviaAttempts', JSON.stringify({ date: today, count }));
  };

  const canPlayTrivia = (): boolean => {
    return getDailyTriviaCount() < 2;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Offer trivia on first message or when user asks about trivia/quiz
  useEffect(() => {
    // Offer trivia if user hasn't played today and it's their first interaction
    const triviaCount = getDailyTriviaCount();
    if (messages.length === 1 && triviaCount < 2) {
      setTimeout(() => {
        const offerTrivia: Message = {
          sender: 'ava',
          text: "🎯 Daily Trivia Time! Let's play! What does comprehensive insurance cover? Win 50 Q-Coins if you answer right! Just say 'play trivia' or 'quiz' to start! 🎮"
        };
        setMessages((prev) => [...prev, offerTrivia]);
      }, 2000);
    }
  }, []);

  

  // Process uploaded document
  const processDocument = async (file: File, message: string): Promise<string> => {
    const lowerCaseMessage = message.toLowerCase();
    const fileName = file.name.toLowerCase();
    const fileType = file.type;

    // Simulate document processing (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Car registration document
    if (lowerCaseMessage.includes('registration') || lowerCaseMessage.includes('renewal') || 
        fileName.includes('registration') || fileName.includes('car')) {
      // Simulate extracting renewal date (in production, use OCR/ML)
      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + 6); // Example: 6 months from now
      const formattedDate = renewalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      // Store reminder in localStorage
      const reminders = JSON.parse(localStorage.getItem('carRenewalReminders') || '[]');
      reminders.push({
        carId: 'car-1',
        renewalDate: renewalDate.toISOString(),
        createdAt: new Date().toISOString(),
        notified: false
      });
      localStorage.setItem('carRenewalReminders', JSON.stringify(reminders));

      return `✅ I've extracted your car registration details!\n\n📅 **Renewal Date:** ${formattedDate}\n\n🔔 I've set a reminder for you. You'll be notified 30 days before your registration expires. Is there anything else you'd like me to help you with?`;
    }

    // Claim photo
    if (lowerCaseMessage.includes('claim') || lowerCaseMessage.includes('damage') || 
        lowerCaseMessage.includes('repair') || lowerCaseMessage.includes('accident') ||
        fileType.startsWith('image/')) {
      // Simulate repair cost estimation (in production, use image recognition/ML)
      const estimatedCost = Math.floor(Math.random() * 5000) + 500; // $500-$5500
      const severity = estimatedCost > 3000 ? 'Moderate to Severe' : estimatedCost > 1500 ? 'Moderate' : 'Minor';
      
      return `📸 I've analyzed your claim photo!\n\n💰 **Estimated Repair Cost:** $${estimatedCost.toLocaleString()}\n\n📊 **Damage Severity:** ${severity}\n\n📝 **Next Steps:**\n1. I'll help you file a claim\n2. A claims adjuster will review your case\n3. You'll receive updates on the claim status\n\nWould you like me to help you start the claims process?`;
    }

    // Policy document scan
    if (lowerCaseMessage.includes('policy') || lowerCaseMessage.includes('coverage') || 
        lowerCaseMessage.includes('document') || lowerCaseMessage.includes('scan') ||
        fileName.includes('policy') || fileName.includes('insurance')) {
      // Simulate policy analysis (in production, use document parsing/ML)
      const hasFloodCoverage = lowerCaseMessage.includes('flood') || Math.random() > 0.5;
      const coverageTypes = ['Comprehensive', 'Collision', 'Liability'];
      if (hasFloodCoverage) coverageTypes.push('Flood Damage');
      
      return `📄 I've analyzed your policy document!\n\n✅ **Coverage Types:**\n${coverageTypes.map(type => `• ${type}`).join('\n')}\n\n${hasFloodCoverage ? '✅ **Flood Damage Coverage:** Yes, your policy includes flood damage protection.\n\n' : '⚠️ **Flood Damage Coverage:** Not included in your current policy.\n\n'}📋 **Policy Summary:**\n• Coverage Period: Active\n• Deductible: $500\n• Premium: Current\n\nWould you like a detailed breakdown of your coverage?`;
    }

    return `📎 I've received your document. I can help you with:\n\n• **Car Registration:** Extract renewal dates and set reminders\n• **Claim Photos:** Estimate repair costs and start claims\n• **Policy Documents:** Check coverage and provide summaries\n\nWhat would you like me to do with this document?`;
  };

  const getAvaResponse = (message: string, hasAttachment: boolean = false): AvaResponse => {
    const lowerCaseMessage = message.toLowerCase();
    const isNavigationRequest = /go to|open|take me to|show me|navigate to/.test(lowerCaseMessage);

    if (isNavigationRequest) {
        if (lowerCaseMessage.includes('profile') || lowerCaseMessage.includes('reward')) {
            return { text: "Sure thing! Taking you to your Profile page now.", action: { type: 'navigate', page: 'Profile' } };
        }

        if (lowerCaseMessage.includes('insurance')) {
            return { text: "You got it. Heading over to the Insurance 360 page.", action: { type: 'navigate', page: 'Insurance' } };
        }

        if (lowerCaseMessage.includes('my cars') || (lowerCaseMessage.includes('car') && !lowerCaseMessage.includes('service'))) {
            return { text: "On my way to the 'My Cars' section for you.", action: { type: 'navigate', page: 'My cars' } };
        }

        if (lowerCaseMessage.includes('city') || lowerCaseMessage.includes('doha') || lowerCaseMessage.includes('service')) {
            return { text: "Let's explore the city! Opening the 'City' page.", action: { type: 'navigate', page: 'City' } };
        }

        if (lowerCaseMessage.includes('home') || lowerCaseMessage.includes('main') || lowerCaseMessage.includes('dashboard')) {
            return { text: "No problem, going back to the main dashboard.", action: { type: 'navigate', page: 'Main' } };
        }

    }

    if (lowerCaseMessage.includes('insurance') || lowerCaseMessage.includes('policy')) {
      return { text: "Of course! I can help with that. Are you looking to buy a new policy, renew an existing one, or just want to understand your coverage? Just say 'take me to Insurance' to see all your options." };
    }

    if (lowerCaseMessage.includes('claim')) {
      if (hasAttachment) {
        return { text: "I see you've uploaded a claim photo. Let me analyze it for you..." };
      }
      return { text: "I can certainly help with claims! You can upload a photo of the damage, and I'll estimate the repair cost. Just tap the attachment button to upload your claim photo." };
    }

    // Document-related queries
    if (lowerCaseMessage.includes('upload') || lowerCaseMessage.includes('document') || lowerCaseMessage.includes('registration') || lowerCaseMessage.includes('scan')) {
      return { text: "I can help you with document processing! You can upload:\n\n• Car registration documents - I'll extract renewal dates and set reminders\n• Claim photos - I'll estimate repair costs\n• Policy documents - I'll check your coverage and provide summaries\n\nJust tap the 📎 button to upload your document!" };
    }

    if (lowerCaseMessage.includes('reward') || lowerCaseMessage.includes('xp') || lowerCaseMessage.includes('q-coin') || lowerCaseMessage.includes('profile')) {
      return { text: "You're speaking my language! You can earn XP and Q-Coins by completing missions and maintaining streaks. Check your progress on your Profile page. Say 'go to my profile' to see it." };
    }

    if (lowerCaseMessage.includes('game') || lowerCaseMessage.includes('challenge') || lowerCaseMessage.includes('spin')) {
      return { text: "Ready for some fun? We have the Spin the Wheel game on the Insurance page for daily rewards. Say 'open Insurance' to try your luck!" };
    }

    // Trivia/Quiz triggers
    if (lowerCaseMessage.includes('trivia') || lowerCaseMessage.includes('quiz') || lowerCaseMessage.includes('play')) {
      if (!canPlayTrivia()) {
        return { text: "You've already played 2 trivia questions today! Come back tomorrow for more questions and Q-Coins! 🎯" };
      }
      // Start trivia will be handled in handleSendMessage
      return { text: "Great! Let's play! 🎮" };
    }

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return { text: "Hello there! How can I make your day easier?" };
    }

     if (lowerCaseMessage.includes('car')) {
      return { text: "Looking for car services or want to manage your vehicle? The 'My Cars' and 'City' tabs are the perfect places to start. Just tell me where you want to go!" };
    }

    return { text: "I'm still learning, but I'd be happy to try and help. Could you please rephrase your question? You can also ask about insurance, rewards, or games." };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Auto-send message with file
      const message = inputValue.trim() || 'Please analyze this document';
      handleSendMessage(message, file);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startTrivia = () => {
    if (!canPlayTrivia()) {
      const limitMessage: Message = {
        sender: 'ava',
        text: "You've already played 2 trivia questions today! Come back tomorrow for more questions and Q-Coins! 🎯"
      };
      setMessages((prev) => [...prev, limitMessage]);
      return;
    }

    // Select random question
    const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    
    setTriviaState({
      active: true,
      currentQuestion: randomQuestion,
      waitingForAnswer: true
    });

    const questionMessage: Message = {
      sender: 'ava',
      text: `🎯 **Daily Trivia Question**\n\n${randomQuestion.question}\n\n${randomQuestion.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\nReply with the number (1-4) of your answer!`
    };
    setMessages((prev) => [...prev, questionMessage]);
  };

  const checkTriviaAnswer = (answer: string): boolean => {
    if (!triviaState.currentQuestion || !triviaState.waitingForAnswer) return false;

    const answerNum = parseInt(answer.trim());
    if (isNaN(answerNum) || answerNum < 1 || answerNum > 4) return false;

    const isCorrect = answerNum - 1 === triviaState.currentQuestion.correct;
    
    if (isCorrect) {
      // Award Q-Coins
      if (onEarnCoins) {
        onEarnCoins(50);
      }
      incrementTriviaCount();
      
      const correctMessage: Message = {
        sender: 'ava',
        text: `🎉 **Correct!** You won 50 Q-Coins! 💰\n\n${triviaState.currentQuestion.explanation}\n\n${canPlayTrivia() ? "Want to play another question? Just say 'play trivia'!" : "That's 2 questions for today! Come back tomorrow for more! 🎯"}`
      };
      setMessages((prev) => [...prev, correctMessage]);
    } else {
      incrementTriviaCount();
      
      const wrongMessage: Message = {
        sender: 'ava',
        text: `❌ Not quite right. The correct answer is: **${triviaState.currentQuestion.options[triviaState.currentQuestion.correct]}**\n\n${triviaState.currentQuestion.explanation}\n\n${canPlayTrivia() ? "Want to try another question? Just say 'play trivia'!" : "That's 2 questions for today! Come back tomorrow for more! 🎯"}`
      };
      setMessages((prev) => [...prev, wrongMessage]);
    }

    setTriviaState({
      active: false,
      currentQuestion: null,
      waitingForAnswer: false
    });

    return isCorrect;
  };

  const handleSendMessage = async (customMessage?: string, file?: File) => {
    const messageText = customMessage || inputValue.trim();
    if (!messageText && !file) return;

    const hasFile = file || uploadedFile;
    let filePreview: string | undefined;

    if (hasFile) {
      // Create preview for images
      if (hasFile.type.startsWith('image/')) {
        filePreview = URL.createObjectURL(hasFile);
      }
    }

    const userMessage: Message = {
      text: messageText || (hasFile ? `Uploaded: ${hasFile.name}` : ''),
      sender: 'user',
      attachment: hasFile ? {
        type: hasFile.type.startsWith('image/') ? 'image' : 'document',
        file: hasFile,
        preview: filePreview
      } : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setUploadedFile(null);
    setIsTyping(true);

    // Check if answering trivia question
    if (triviaState.waitingForAnswer) {
      const isTriviaAnswer = checkTriviaAnswer(messageText);
      setIsTyping(false);
      return;
    }

    // Check if user wants to start trivia
    const lowerCaseMessage = messageText.toLowerCase();
    if (lowerCaseMessage.includes('trivia') || lowerCaseMessage.includes('quiz') || 
        (lowerCaseMessage.includes('play') && !lowerCaseMessage.includes('game'))) {
      setIsTyping(false);
      setTimeout(() => {
        startTrivia();
      }, 500);
      return;
    }

    // Process document if file is attached
    if (hasFile) {
      try {
        const documentResponse = await processDocument(hasFile, messageText);
        const avaMessage: Message = { text: documentResponse, sender: 'ava' };
        setMessages((prev) => [...prev, avaMessage]);
        setIsTyping(false);
        return;
      } catch (error) {
        console.error('Error processing document:', error);
      }
    }

    setTimeout(() => {
      const avaResponse = getAvaResponse(messageText, !!hasFile);
      const avaMessage: Message = { text: avaResponse.text, sender: 'ava' };

      setMessages((prev) => [...prev, avaMessage]);

      setIsTyping(false);

      if (avaResponse.action?.type === 'navigate' && avaResponse.action.page) {
        setTimeout(() => {
          onNavigate(avaResponse.action.page);
        }, 800);
      }
    }, 1500 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3 sticky top-0 z-10 transition-colors duration-200">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <AvaAiIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
      </div>
        <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">Ava AI</h1>
            <p className="text-sm text-green-500 dark:text-green-400 font-semibold flex items-center">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-1.5"></span>
                Online
            </p>
        </div>
      </header>
      

      <main className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ava' && (
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <AvaAiIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm transition-colors duration-200 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 dark:bg-indigo-700 text-white rounded-br-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-lg'
              }`}
            >
              {msg.attachment && (
                <div className="mb-2">
                  {msg.attachment.type === 'image' && msg.attachment.preview ? (
                    <img 
                      src={msg.attachment.preview} 
                      alt="Uploaded" 
                      className="max-w-full h-auto rounded-lg mb-2"
                    />
                  ) : (
                    <div className="bg-white/20 dark:bg-gray-700/50 rounded-lg p-3 mb-2">
                      <p className="text-xs text-white dark:text-gray-200">📄 {msg.attachment.file.name}</p>
                    </div>
                  )}
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
            </div>
          </motion.div>
        ))}
         <AnimatePresence>
            {isTyping && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2 justify-start"
                >
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <AvaAiIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-lg shadow-sm">
                        <div className="flex items-center space-x-1">
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, delay: 0.1, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                            <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 transition-colors duration-200">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mr-1"
            title="Upload document or image"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Ava or upload a document..."
            className="bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none flex-grow ml-2 text-sm"
          />
          {uploadedFile && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 mr-2 flex items-center">
              📎 {uploadedFile.name.length > 15 ? uploadedFile.name.substring(0, 15) + '...' : uploadedFile.name}
            </span>
          )}
          <button
            onClick={() => handleSendMessage()}
            className="w-10 h-10 bg-indigo-600 dark:bg-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-indigo-300 dark:disabled:bg-indigo-900 transition-colors"
            disabled={!inputValue.trim() && !uploadedFile}
          >
            <PaperAirplaneIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AvaAiPage;
