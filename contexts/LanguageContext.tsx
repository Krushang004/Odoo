'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { INDIAN_LANGUAGES, LANGUAGE_GREETINGS } from '../config/ai'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  getGreeting: () => string
  getLanguageName: (code: string) => string
  getNativeName: (code: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang)
    }
  }

  const getGreeting = () => {
    return LANGUAGE_GREETINGS[currentLanguage as keyof typeof LANGUAGE_GREETINGS] || LANGUAGE_GREETINGS.en
  }

  const getLanguageName = (code: string) => {
    const lang = INDIAN_LANGUAGES.find(l => l.code === code)
    return lang ? lang.name : 'English'
  }

  const getNativeName = (code: string) => {
    const lang = INDIAN_LANGUAGES.find(l => l.code === code)
    return lang ? lang.native : 'English'
  }

  // Load saved language on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedLanguage')
      if (saved && INDIAN_LANGUAGES.some(l => l.code === saved)) {
        setCurrentLanguage(saved)
      }
    }
  }, [])

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      getGreeting,
      getLanguageName,
      getNativeName
    }}>
      {children}
    </LanguageContext.Provider>
  )
}
