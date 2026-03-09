import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

type Language = 'en' | 'ar';
type TranslationKey = keyof typeof en;

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  toggleLang: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = { en, ar };
const STORAGE_KEY = 'na-lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'en' || saved === 'ar') {
        setLang(saved);
      }
    });
  }, []);

  const toggleLang = useCallback(async () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    const newIsRTL = newLang === 'ar';

    setLang(newLang);
    await AsyncStorage.setItem(STORAGE_KEY, newLang);

    if (I18nManager.isRTL !== newIsRTL) {
      I18nManager.allowRTL(newIsRTL);
      I18nManager.forceRTL(newIsRTL);
      // RTL change requires app restart in React Native
      // RTL change requires app restart — user may need to manually restart
      // expo-updates reloadAsync is only available in production builds
    }
  }, [lang]);

  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      let text = translations[lang]?.[key] || translations.en[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, v);
        });
      }
      return text;
    },
    [lang]
  );

  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, dir, isRTL, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
