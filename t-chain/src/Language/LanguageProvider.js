import React, { useState } from 'react';
import { LanguageContext } from './LanguageContext';
import en from './en';
import zh from './zh';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh'); // default language
  const translations = language === 'zh' ? zh : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};