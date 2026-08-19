import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('vmis_high_contrast') === 'true';
  });

  const [fontSizeScale, setFontSizeScale] = useState(() => {
    return localStorage.getItem('vmis_font_scale') || 'normal'; // 'small', 'normal', 'large', 'xlarge'
  });

  useEffect(() => {
    localStorage.setItem('vmis_high_contrast', highContrast);
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('vmis_font_scale', fontSizeScale);
    document.documentElement.classList.remove('font-scale-small', 'font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    document.documentElement.classList.add(`font-scale-${fontSizeScale}`);
  }, [fontSizeScale]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const increaseFontSize = () => {
    if (fontSizeScale === 'small') setFontSizeScale('normal');
    else if (fontSizeScale === 'normal') setFontSizeScale('large');
    else if (fontSizeScale === 'large') setFontSizeScale('xlarge');
  };

  const decreaseFontSize = () => {
    if (fontSizeScale === 'xlarge') setFontSizeScale('large');
    else if (fontSizeScale === 'large') setFontSizeScale('normal');
    else if (fontSizeScale === 'normal') setFontSizeScale('small');
  };

  const resetFontSize = () => {
    setFontSizeScale('normal');
  };

  return (
    <ThemeContext.Provider value={{
      highContrast,
      fontSizeScale,
      toggleHighContrast,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
