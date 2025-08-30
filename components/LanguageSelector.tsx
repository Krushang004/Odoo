'use client'

import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { INDIAN_LANGUAGES } from '../config/ai'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  showLabel = true, 
  size = 'md' 
}) => {
  const { currentLanguage, setLanguage } = useLanguage()

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center space-x-1">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Language:</span>
        </div>
      )}
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        className={`bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${sizeClasses[size]}`}
      >
        {INDIAN_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  )
}
