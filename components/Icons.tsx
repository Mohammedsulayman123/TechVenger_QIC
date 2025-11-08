import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
  </svg>
);

export const CarIllustration: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 123 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M112.5 40.5H118C120.485 40.5 122.5 38.4853 122.5 36V30C122.5 27.5147 120.485 25.5 118 25.5H112.5V40.5Z" fill="#D6D6E3"/>
        <path d="M5.5 40.5H0C-2.48528 40.5 -4.5 38.4853 -4.5 36V30C-4.5 27.5147 -2.48528 25.5 0 25.5H5.5V40.5Z" fill="#D6D6E3"/>
        <path d="M109 52C113.142 52 116.5 48.6421 116.5 44.5C116.5 40.3579 113.142 37 109 37C104.858 37 101.5 40.3579 101.5 44.5C101.5 48.6421 104.858 52 109 52Z" fill="white" stroke="#A7A9BE" strokeWidth="3"/>
        <path d="M26 52C30.1421 52 33.5 48.6421 33.5 44.5C33.5 40.3579 30.1421 37 26 37C21.8579 37 18.5 40.3579 18.5 44.5C18.5 48.6421 21.8579 52 26 52Z" fill="white" stroke="#A7A9BE" strokeWidth="3"/>
        <path d="M112.5 25.5H12C12 25.5 9.99999 26 12 19C14 12 26.5 7.5 38 7.5H84.5C92 7.5 102 12.5 107.5 20.5C113 28.5 112.5 25.5 112.5 25.5Z" fill="#E6E7F0"/>
        <path d="M5.5 40.5H112.5V25.5H12C12 25.5 9.99999 26 12 19C14 12 26.5 7.5 38 7.5H84.5C92 7.5 102 12.5 107.5 20.5C113 28.5 112.5 25.5 112.5 25.5M5.5 40.5V25.5M5.5 40.5C9.64214 40.5 13 43.8579 13 48C13 52.1421 9.64214 55.5 5.5 55.5M5.5 40.5H112.5M112.5 40.5C108.358 40.5 105 43.8579 105 48C105 52.1421 108.358 55.5 112.5 55.5M112.5 25.5V40.5" stroke="#A7A9BE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="23.5" y="25.5" width="22" height="15" rx="3" fill="#D6D6E3" stroke="#A7A9BE" strokeWidth="3"/>
    </svg>
);

export const SparkleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

export const CheckShieldIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const CarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 2.25 12v-1.5a3.375 3.375 0 0 0 3.375-3.375H15M2.25 12h3.375m13.5 0h3.375m-3.375 0a3.375 3.375 0 0 1 3.375-3.375V6.75A3.375 3.375 0 0 0 16.5 3.375h-9a3.375 3.375 0 0 0-3.375 3.375v1.5" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const GridIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75h2.25A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);

export const AvaAiIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v3.44l1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72h3.44a.75.75 0 010 1.5h-3.44l1.72 1.72a.75.75 0 11-1.06 1.06l-1.72-1.72v3.44a.75.75 0 01-1.5 0v-3.44l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72H4.5a.75.75 0 010-1.5h3.44l-1.72-1.72a.75.75 0 011.06-1.06l1.72 1.72V5.25A.75.75 0 019 4.5zM15.97 1.47a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06L17.69 6H15a.75.75 0 010-1.5h2.69l-1.72-1.72a.75.75 0 010-1.06zM21.53 15.97a.75.75 0 010 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V15a.75.75 0 011.5 0v2.69l1.72-1.72a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

export const ChassisCarIllustration: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 5)">
      <ellipse cx="50" cy="45" rx="48" ry="8" fill="#A5B4FC" />
      <ellipse cx="50" cy="42" rx="45" ry="6" fill="#C7D2FE" />
      <path d="M90 30 C88 20, 80 15, 70 15 H30 C20 15, 12 20, 10 30" stroke="#8A9BCA" strokeWidth="2" fill="#E0E7FF" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M80 15 Q 75 5, 50 5 Q 25 5, 20 15" stroke="#8A9BCA" strokeWidth="2" fill="#E0E7FF" />
      <path d="M75 15 H25" stroke="#8A9BCA" strokeWidth="2" fill="none" />
      <path d="M5 30 H 95 V 35 H 5 V 30 Z" fill="#E0E7FF" stroke="#8A9BCA" strokeWidth="2"/>
    </g>
  </svg>
);

export const RentCarKeysIllustration: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="rotate(-20 40 30)">
      <rect x="20" y="10" width="40" height="25" rx="10" fill="#C7D2FE" stroke="#8A9BCA" strokeWidth="2"/>
      <circle cx="30" cy="22" r="3" fill="#A5B4FC"/>
      <circle cx="40" cy="22" r="3" fill="#A5B4FC"/>
      <circle cx="50" cy="22" r="3" fill="#A5B4FC"/>
      <circle cx="20" cy="22" r="8" fill="none" stroke="#8A9BCA" strokeWidth="2"/>
      <path d="M12 22 H -5 L -8 20 H -15 V 24 H -8 L -5 22" fill="#C7D2FE" stroke="#8A9BCA" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
    </g>
  </svg>
);

export const LocationPinIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.223.654-.369.889-.496 1.976-1.229 2.948-2.198.973-.97 1.693-2.14 2.198-3.303.506-1.164.8-2.476.8-3.835 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 1.359.294 2.67.8 3.835.506 1.163 1.225 2.333 2.198 3.303.972.97 2.059 1.702 2.948 2.198.254.146.468.269.654.369a5.745 5.745 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const SadAvatarIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="40" fill="#FEF3C7"/>
    <path d="M25 65 C 40 85, 60 85, 75 65 A 40 40 0 0 1 25 65 Z" fill="#8D5524"/>
    <path d="M30 35 A 20 20 0 0 1 70 35 A 40 40 0 0 0 30 35 Z" fill="#F3F4F6"/>
    <circle cx="42" cy="48" r="3" fill="#111827"/>
    <circle cx="58" cy="48" r="3" fill="#111827"/>
    <path d="M47 62 Q 50 56, 53 62" stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

export const StarCoinIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.788 3.212a.75.75 0 011.062 0l2.25 2.25a.75.75 0 00.531.22l3.181.462a.75.75 0 01.416 1.28l-2.3 2.242a.75.75 0 00-.215.662l.542 3.17a.75.75 0 01-1.088.79l-2.845-1.496a.75.75 0 00-.7.001l-2.844 1.496a.75.75 0 01-1.088-.79l.542-3.17a.75.75 0 00-.215-.662l-2.3-2.242a.75.75 0 01.416-1.28l3.181-.462a.75.75 0 00.531-.22l2.25-2.25z" clipRule="evenodd"/>
  </svg>
);

export const InsuranceCarIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M5 45 a 10 10 0 0 1 20 0z" fill="#D1D5DB" />
        <path d="M75 45 a 10 10 0 0 1 20 0z" fill="#D1D5DB" />
        <path d="M90,30 C90,15 80,10 65,10 L35,10 C20,10 10,15 10,30 L90,30 Z" fill="#F3F4F6"/>
        <path d="M0,45 L100,45 L95,30 L5,30 L0,45 Z" fill="#E5E7EB"/>
        <path d="M30 30 L 45 10 L 55 10 L 70 30 Z" fill="#A5B4FC"/>
    </svg>
);

export const TravelLuggageIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="20" y="25" width="60" height="70" rx="10" fill="#E5E7EB"/>
        <rect x="15" y="40" width="70" height="10" fill="#D1D5DB"/>
        <path d="M40 25 V 10 a 10 10 0 0 1 20 0 V 25" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="4"/>
        <circle cx="35" cy="90" r="5" fill="#9CA3AF"/>
        <circle cx="65" cy="90" r="5" fill="#9CA3AF"/>
        <path d="M85 70 a 5 5 0 0 1 10 0 v 10 a 5 5 0 0 1 -10 0 z" fill="#A5B4FC" />
    </svg>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.75 9h16.5M3.75 15h16.5M12 3c-3.46 0-6.5 2.13-7.5 5h15c-1-2.87-4.04-5-7.5-5z"/>
  </svg>
);

export const UmbrellaIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75a10.5 10.5 0 0 1 19.5 0M12 21.75V12.75"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c-2.43 0-4.5-1.91-4.5-4.25a4.5 4.5 0 1 1 9 0c0 2.34-2.07 4.25-4.5 4.25z"/>
  </svg>
);

export const ArmchairIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2zM4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M4 18v2h1.5m13 0H20v-2"/>
  </svg>
);

export const LifebuoyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24m-9.9-5.66 4.24-4.24m-4.24 9.9 4.24-4.24"/>
  </svg>
);

export const BusinessShieldIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
  </svg>
);

export const StethoscopeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75v3.75a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25v-3.75m-16.5 0V6a2.25 2.25 0 0 1 2.25-2.25h12A2.25 2.25 0 0 1 20.25 6v3.75m-16.5 0h16.5m-16.5 3.75v3.75a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25V13.5"/>
  </svg>
);

export const GolfIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.083c0-1.767-1.442-3.208-3.208-3.208S7.833 4.316 7.833 6.083v13.834h6.417V6.083z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.417h-1.5m1.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 4.5h8"/>
  </svg>
);

// City Page Icons
export const MarketCarIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="marketCarShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#marketCarShadow)">
      <path d="M95 40 C 90 25, 80 20, 65 20 H35 C20 20, 10 25, 5 40" fill="#E5E7EB"/>
      <path d="M0 40 H 100 V 50 H 0 Z" fill="#D1D5DB" />
      <path d="M85 20 L 70 5 H 30 L 15 20" fill="#F9FAFB" />
      <path d="M20 50 a 8 8 0 0 1 16 0 a 8 8 0 0 1 -16 0" fill="#9CA3AF" />
      <path d="M65 50 a 8 8 0 0 1 16 0 a 8 8 0 0 1 -16 0" fill="#9CA3AF" />
    </g>
  </svg>
);
export const RentalKeysIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="rentalKeysShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#rentalKeysShadow)">
      <g transform="translate(10, 10) rotate(25 50 50)">
        <circle cx="30" cy="30" r="20" fill="#E5E7EB" />
        <path d="M30 50 L 30 80 L 40 80 L 40 70 L 50 70 L 50 60 Z" fill="#E5E7EB" />
        <circle cx="30" cy="30" r="10" fill="#F9FAFB" />
        <path d="M80 50 L 50 80 L 60 90 L 90 60 Z" fill="#F472B6" />
      </g>
    </g>
  </svg>
);
export const DetailingIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <filter id="detailingShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
          </filter>
        </defs>
        <g filter="url(#detailingShadow)">
            <path d="M20 100 L 20 40 C 20 20, 30 10, 50 10 L 70 10 C 80 10, 80 20, 80 20 L 80 40 L 90 40 L 90 25 L 95 25 L 95 40 L 100 40 L 80 60 L 80 100 Z" fill="#E5E7EB" />
            <rect x="20" y="70" width="60" height="10" fill="#D1D5DB" />
        </g>
    </svg>
);
export const WashIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="washShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#washShadow)">
        <circle cx="50" cy="50" r="40" fill="#A5B4FC" />
        <circle cx="35" cy="35" r="10" fill="#C7D2FE"/>
        <circle cx="65" cy="35" r="10" fill="#C7D2FE"/>
        <circle cx="50" cy="65" r="12" fill="#C7D2FE"/>
        <circle cx="25" cy="55" r="8" fill="#C7D2FE"/>
        <circle cx="75" cy="55" r="8" fill="#C7D2FE"/>
    </g>
  </svg>
);
export const RepairsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="repairsShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#repairsShadow)">
        <g transform="rotate(45 50 50)">
        <path d="M20 40 C 10 50, 10 60, 20 70 L 40 90 L 50 80 L 30 60 C 40 50, 40 40, 30 30 L 20 40 Z" fill="#E5E7EB"/>
        <path d="M80 30 C 90 40, 90 50, 80 60 L 60 80 L 50 70 L 70 50 C 60 40, 60 30, 70 20 L 80 30 Z" fill="#E5E7EB"/>
        <rect x="45" y="10" width="10" height="80" rx="5" fill="#F472B6"/>
        </g>
    </g>
  </svg>
);
export const CarHistoryIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="carHistoryShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#carHistoryShadow)">
        <rect x="10" y="10" width="80" height="80" rx="10" fill="#E5E7EB"/>
        <rect x="5" y="15" width="90" height="80" rx="10" fill="#F9FAFB"/>
        <circle cx="50" cy="55" r="25" fill="#F472B6" />
        <circle cx="50" cy="55" r="15" fill="#F9FAFB" />
    </g>
  </svg>
);
export const CarPriceCheckIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="carPriceCheckShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#carPriceCheckShadow)">
        <circle cx="30" cy="70" r="20" fill="#A5B4FC" />
        <circle cx="60" cy="50" r="30" fill="#C7D2FE" />
        <circle cx="80" cy="75" r="15" fill="#E0E7FF" />
    </g>
  </svg>
);
export const PromoIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="promoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#promoShadow)">
        <path d="M10 10 L 90 10 L 90 90 L 10 90 Z" fill="#E5E7EB" transform="rotate(15 50 50)"/>
        <circle cx="35" cy="35" r="8" fill="#A5B4FC" />
        <circle cx="65" cy="65" r="8" fill="#A5B4FC" />
        <line x1="30" y1="70" x2="70" y2="30" stroke="#A5B4FC" strokeWidth="10" strokeLinecap="round"/>
    </g>
  </svg>
);
export const EventsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="eventsShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#eventsShadow)">
        <path d="M20 30 L 50 30 L 70 10 L 70 70 L 50 50 L 20 50 Z" fill="#E5E7EB"/>
        <path d="M70 40 L 90 30" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
        <path d="M70 30 L 90 20" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
        <path d="M70 50 L 90 60" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);
export const IslamIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="islamShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#islamShadow)">
      <circle cx="50" cy="50" r="40" fill="#E5E7EB" />
      <circle cx="45" cy="50" r="35" fill="#F9FAFB" />
      <path d="M60 30 L 65 45 L 80 45 L 70 55 L 75 70 L 60 60 L 45 70 L 50 55 L 40 45 L 55 45 Z" fill="#A5B4FC"/>
    </g>
  </svg>
);
export const LocationsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="locationsShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#locationsShadow)">
        <path d="M10 90 L 40 10 L 90 40 L 60 90 Z" fill="#E5E7EB" />
        <circle cx="50" cy="50" r="15" fill="#F472B6"/>
        <circle cx="50" cy="50" r="5" fill="white" />
    </g>
  </svg>
);
export const BlogIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="blogShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
      </filter>
    </defs>
    <g filter="url(#blogShadow)">
        <rect x="10" y="10" width="80" height="80" rx="10" fill="#E5E7EB"/>
        <rect x="15" y="5" width="80" height="80" rx="10" fill="#F3F4F6"/>
        <rect x="20" y="0" width="80" height="80" rx="10" fill="#F9FAFB"/>
    </g>
  </svg>
);

// Profile Page Icons
export const BackArrowIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
export const ProfilePersonIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
export const CoinsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
export const DocumentIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
export const ReferralIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.036 1.363-1.954 2.3-2.673a9.09 9.09 0 012.88-1.254M12 12A3.75 3.75 0 104.5 8.25 3.75 3.75 0 0012 12zM12 12a9 9 0 100 18 9 9 0 000-18z" />
    </svg>
);
export const SettingsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.716.53 1.003l.823.823c.374.374.84.58 1.332.58h1.281c.542 0 .94.56 1.033 1.11l.213 1.281c.063.374.063.761 0 1.134l-.213 1.281c-.094.55-.591 1.033-1.11 1.033h-1.281c-.492 0-.958.206-1.332.58l-.823.823c-.27.287-.467.629-.53 1.003l-.213 1.281c-.09.542-.56.94-1.11-.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.26-.716-.53-1.003l-.823-.823c-.374-.374-.84-.58-1.332.58H3.94c-.542 0-.94-.56-1.033-1.11l-.213-1.281c-.063-.374-.063-.761 0-1.134l.213-1.281c.094-.55.591-1.033 1.11-1.033h1.281c.492 0 .958-.206 1.332.58l.823.823c.27.287.467.629.53 1.003l.213-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ListItemChevronRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

// Dark Mode Icons
export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364 6.364l-1.591 1.591M21 12h-2.25m-6.364 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

// New Profile Page Icons
export const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 13.5h.008v.008H12v-.008z" />
    </svg>
);
export const TrendingUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.293 7.293m3.293-7.293L16.5 3.75" />
    </svg>
);
export const TrophyIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.012 9.012 0 01-6.43-3.013M21 18.75h-2.25a9.012 9.012 0 00-6.43-3.013M12 3v11.25m0 0l-3.75 3.75M12 14.25l3.75 3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0-2.25a2.25 2.25 0 00-2.25 2.25H12m2.25-2.25a2.25 2.25 0 012.25 2.25H12m-2.25 2.25h4.5" />
    </svg>
);
export const BadgeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
);
export const MissionIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);
export const FireIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 004.5-4.5 8.287 8.287 0 00-4.126-7.797 8.25 8.25 0 00-6.75 12.25A8.25 8.25 0 0012 21a8.25 8.25 0 004.5-4.5" />
    </svg>
);
export const ShieldDropIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 006.75-3.23l-1.02-1.02a7.5 7.5 0 01-11.46 0L4.25 17.77A9 9 0 0012 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 006.75-3.23l-1.02-1.02a7.5 7.5 0 01-11.46 0L4.25 17.77A9 9 0 0012 21zM4.03 14.77l1.02 1.02a7.5 7.5 0 0011.9 0l1.02-1.02A9 9 0 004.03 14.77zM12 3a9 9 0 00-6.75 3.23l1.02 1.02a7.5 7.5 0 0111.46 0l1.02-1.02A9 9 0 0012 3z" />
    </svg>
);
export const StreakCarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.375 12.938h11.25m-11.25 0a1.688 1.688 0 00-1.688 1.688v0a1.688 1.688 0 001.688 1.687h11.25a1.688 1.688 0 001.688-1.687v0a1.688 1.688 0 00-1.688-1.688m-12.375-3.375h13.5m-13.5 0a1.687 1.687 0 01-1.687-1.688v-1.687a1.688 1.688 0 011.688-1.688h13.5a1.688 1.688 0 011.687 1.688v1.687a1.688 1.688 0 01-1.688 1.688m-15.75-7.875h18" />
    </svg>
);

// Badge Icons
export const EarlyBirdIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19.5 7.5c0 1.657-3.358 3-7.5 3s-7.5-1.343-7.5-3c0-1.39 2.51-2.549 5.858-2.898.34-.035.682.02.992.158 1.34.602 2.98 1.002 4.65 1.002 1.35 0 2.65-.25 3.75-.688.11-.043.22-.08.33-.117.41-.137.83-.217 1.27-.217.16 0 .32.01.48.03.01.001.02.002.03.004V7.5zM12 18c-4.142 0-7.5-1.343-7.5-3V9.812c0 .28.14.54.38.693 1.05 1.02 2.61 1.745 4.47 2.14 1.15.244 2.37.355 3.65.355s2.5-.11 3.65-.355c1.86-.395 3.42-1.12 4.47-2.14.24-.153.38-.413.38-.693V15c0 1.657-3.358 3-7.5 3z" />
    </svg>
);
export const LockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

// QIC World Game Icons
export const SteeringWheelIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m-9-9h3m12 0h3M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);
export const PassportQuizIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M3.75 3.75h16.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.875 12.5a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 8.25c.414 0 .75.336.75.75v.25c0 .69-.56 1.25-1.25 1.25h-1.5a.75.75 0 01-.75-.75V9A.75.75 0 017 8.25h2.5z" />
    </svg>
);
export const WeatherShieldIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.142 0-7.5 3.358-7.5 7.5 0 1.95.745 3.73 1.999 5.093.04.05.08.1.12.15l3.86 4.342a1.125 1.125 0 001.012.515h.018a1.125 1.125 0 001.012-.515l3.86-4.342c.04-.05.08-.1.12-.15 1.254-1.363 2-3.143 2-5.093 0-4.142-3.358-7.5-7.5-7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.875A2.625 2.625 0 1012 10.125a2.625 2.625 0 000-5.25z" />
    </svg>
);

export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12m0 0l7.5-4.5M6 12l7.5 4.5M6 12l3.001 2.25m6.998-6.75L15 12l-3.001 2.25" />
    </svg>
);