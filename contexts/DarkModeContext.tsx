import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const applyDarkMode = (isDark: boolean) => {
  const htmlElement = document.documentElement;
  if (isDark) {
    htmlElement.classList.add('dark');
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.classList.remove('dark');
    htmlElement.removeAttribute('data-theme');
  }
  // Force style recalculation
  void htmlElement.offsetHeight;
};

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        const isDark = saved === 'true';
        applyDarkMode(isDark);
        return isDark;
      }
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyDarkMode(prefersDark);
      return prefersDark;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      applyDarkMode(isDarkMode);
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      // Immediately apply to DOM for instant visual feedback
      applyDarkMode(newValue);
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newValue.toString());
      }
      return newValue;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

