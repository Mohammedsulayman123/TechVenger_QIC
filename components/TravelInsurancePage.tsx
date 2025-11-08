import React, { useState, useEffect } from 'react';
import { BackArrowIcon, ChevronRightIcon } from './Icons';

interface TravelInsurancePageProps {
  onNavigateBack: () => void;
  qCoins?: number;
  onUseCoins?: (amount: number) => void;
}

const TravelInsurancePage: React.FC<TravelInsurancePageProps> = ({ onNavigateBack, qCoins = 0, onUseCoins }) => {
  const [tripType, setTripType] = useState<'single' | 'multi' | 'visiting'>('single');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [useCoinsDiscount, setUseCoinsDiscount] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState(0);

  const quickDestinations = ['GCC', 'Worldwide', 'Schengen', 'Georgia'];

  // Calculate discount based on coins (1 coin = 0.1% discount, max 20% discount = 200 coins)
  const maxCoinsForDiscount = 200;
  const discountPerCoin = 0.1; // 0.1% per coin
  const maxDiscount = 20; // 20% max discount

  useEffect(() => {
    if (useCoinsDiscount && qCoins > 0) {
      const availableCoins = Math.min(qCoins, maxCoinsForDiscount);
      setCoinsToUse(availableCoins);
    } else {
      setCoinsToUse(0);
    }
  }, [useCoinsDiscount, qCoins]);

  const discountPercentage = useCoinsDiscount ? Math.min((coinsToUse * discountPerCoin), maxDiscount) : 0;
  const coinsAvailable = qCoins >= 10; // Minimum 10 coins needed for discount

  const handleCheckPrice = () => {
    // Handle price check logic here
    const priceData = {
      tripType,
      destination,
      departureDate,
      returnDate,
      travelers,
      useCoinsDiscount,
      coinsUsed: useCoinsDiscount ? coinsToUse : 0,
      discountPercentage: useCoinsDiscount ? discountPercentage : 0
    };
    
    if (useCoinsDiscount && onUseCoins && coinsToUse > 0) {
      // Deduct coins when purchasing
      onUseCoins(-coinsToUse);
    }
    
    console.log('Checking price for:', priceData);
  };

  const coverageSections = [
    {
      title: 'Health',
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      coverages: [
        { name: 'Emergency medical care', limit: 'USD 1,000,000' },
        { name: 'Emergency dental treatment', limit: 'USD 250 per claim' },
        { name: 'Search and rescue', limit: 'USD 10,000' },
        { name: 'Travel accident', limit: 'USD 50,000' }
      ]
    },
    {
      title: 'Trip',
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      coverages: [
        { name: 'Trip cancellation or delay', limit: 'USD 5,000' },
        { name: 'Personal liability', limit: 'USD 1,000,000' },
        { name: 'Legal help abroad', limit: 'USD 25,000' },
        { name: 'Unscheduled return', limit: 'USD 2,500' }
      ]
    },
    {
      title: 'Luggage',
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10v10l-8-4m8-4l-8-4m8 4l8-4" />
        </svg>
      ),
      coverages: [
        { name: 'Baggage loss or damage', limit: 'USD 3,000' },
        { name: 'Personal belongings', limit: 'USD 1,500' },
        { name: 'Travel documents', limit: 'USD 500' },
        { name: 'Delayed baggage', limit: 'USD 300' }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section with Gradient */}
      <header className="bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-400 p-6 pt-10 text-white relative overflow-hidden">
        <button onClick={onNavigateBack} className="absolute top-4 left-4 z-10 p-2">
          <BackArrowIcon className="w-5 h-5 text-white" />
        </button>
        
        {/* Airplane Graphic */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-4 opacity-90 z-0">
          <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(15deg)' }}>
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>

        {/* Globe Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 10 Q70 30 50 50 Q30 30 50 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 50 Q70 70 50 90 Q30 70 50 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 mt-8">
          <h1 className="text-3xl font-bold mb-2">Travel insurance in 2 minutes</h1>
          <p className="text-white/90 text-sm">Get insured online. Instant coverage, zero paperwork</p>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="bg-white rounded-t-3xl -mt-6 p-6 space-y-6 min-h-[calc(100vh-200px)]">
        {/* Trip Type Selection */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTripType('single')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              tripType === 'single'
                ? 'bg-white border-purple-500 shadow-md'
                : 'bg-purple-50 border-purple-200'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <p className={`font-semibold text-sm ${tripType === 'single' ? 'text-gray-900' : 'text-gray-700'}`}>
              Single trip
            </p>
            <p className="text-xs text-gray-500 mt-1">Up to 90 days</p>
          </button>

          <button
            onClick={() => setTripType('multi')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              tripType === 'multi'
                ? 'bg-white border-purple-500 shadow-md'
                : 'bg-purple-50 border-purple-200'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className={`font-semibold text-sm ${tripType === 'multi' ? 'text-gray-900' : 'text-gray-700'}`}>
              Multi-trip
            </p>
            <p className="text-xs text-gray-500 mt-1">Within a year</p>
          </button>

          <button
            onClick={() => setTripType('visiting')}
            className={`p-4 rounded-2xl border-2 transition-all relative ${
              tripType === 'visiting'
                ? 'bg-white border-purple-500 shadow-md'
                : 'bg-purple-50 border-purple-200'
            }`}
          >
            <div className="absolute top-2 right-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className={`font-semibold text-sm ${tripType === 'visiting' ? 'text-gray-900' : 'text-gray-700'}`}>
              Visiting Qatar
            </p>
          </button>
        </div>

        {/* Destination Country Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Destination country</label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination country"
              className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Quick Destination Buttons */}
        <div className="flex flex-wrap gap-2">
          {quickDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-700 transition-colors"
            >
              {dest}
            </button>
          ))}
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Departure</label>
            <div className="relative">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Return</label>
            <div className="relative">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-white"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Travelers Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
          <div className="relative">
            <div className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white flex items-center justify-between">
              <span className="text-gray-700 font-semibold">{travelers} person{travelers !== 1 ? 's' : ''}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                >
                  −
                </button>
                <button
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Coin Discount Section */}
        {coinsAvailable && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="font-bold text-gray-800">Use Q-Coins for Discount</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">{qCoins.toLocaleString()} coins</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useCoinsDiscount}
                onChange={(e) => setUseCoinsDiscount(e.target.checked)}
                className="w-5 h-5 rounded border-purple-500 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                Apply {discountPercentage.toFixed(1)}% discount ({coinsToUse} coins)
              </span>
            </label>
            {useCoinsDiscount && (
              <p className="text-xs text-purple-600 mt-2 font-semibold">
                💰 Save up to {maxDiscount}% when using {maxCoinsForDiscount} coins!
              </p>
            )}
          </div>
        )}

        {/* Check Price Button */}
        <button
          onClick={handleCheckPrice}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Check your price
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* What's Covered Section */}
        <div className="pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's covered</h2>
          
          <div className="space-y-4">
            {coverageSections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-xl">
                      {section.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                    See details
                  </button>
                </div>
                
                <div className="space-y-3">
                  {section.coverages.map((coverage, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium text-sm">{coverage.name}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{coverage.limit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInsurancePage;

