'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Play, Headphones, FileText, Globe, Search, Filter, Download, Heart, Clock, Users } from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'video' | 'audio' | 'document' | 'guide'
  category: 'anxiety' | 'depression' | 'stress' | 'mindfulness' | 'sleep' | 'academic' | 'relationships' | 'crisis'
  language: 'english' | 'hindi' | 'spanish' | 'mandarin' | 'french'
  duration?: string
  fileSize?: string
  views: number
  rating: number
  tags: string[]
  url: string
  thumbnail?: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Mindfulness Meditation for Beginners',
    description: 'A comprehensive guide to starting your mindfulness practice with guided meditation sessions.',
    type: 'video',
    category: 'mindfulness',
    language: 'english',
    duration: '15:30',
    views: 1247,
    rating: 4.8,
    tags: ['meditation', 'beginners', 'stress-relief', 'focus'],
    url: '#',
    thumbnail: '🧘‍♀️'
  },
  {
    id: '2',
    title: 'Deep Breathing Techniques for Anxiety',
    description: 'Learn effective breathing exercises to manage anxiety and panic attacks in real-time.',
    type: 'audio',
    category: 'anxiety',
    language: 'english',
    duration: '8:45',
    fileSize: '2.1 MB',
    views: 892,
    rating: 4.9,
    tags: ['breathing', 'anxiety', 'panic-attacks', 'calm'],
    url: '#'
  },
  {
    id: '3',
    title: 'Academic Stress Management Guide',
    description: 'Practical strategies for managing academic pressure, exam anxiety, and study-related stress.',
    type: 'document',
    category: 'academic',
    language: 'english',
    fileSize: '1.8 MB',
    views: 1567,
    rating: 4.7,
    tags: ['academic', 'study', 'exams', 'time-management'],
    url: '#'
  },
  {
    id: '4',
    title: 'Sleep Hygiene: Better Sleep Habits',
    description: 'Evidence-based techniques to improve sleep quality and establish healthy sleep routines.',
    type: 'guide',
    category: 'sleep',
    language: 'english',
    views: 2034,
    rating: 4.6,
    tags: ['sleep', 'hygiene', 'routine', 'wellness'],
    url: '#'
  },
  {
    id: '5',
    title: 'चिंता से निपटने के तरीके',
    description: 'चिंता और तनाव को प्रबंधित करने के लिए आसान और प्रभावी तकनीकें।',
    type: 'video',
    category: 'anxiety',
    language: 'hindi',
    duration: '12:20',
    views: 567,
    rating: 4.5,
    tags: ['चिंता', 'तनाव', 'मेडिटेशन', 'योग'],
    url: '#',
    thumbnail: '🧘‍♂️'
  },
  {
    id: '6',
    title: 'Técnicas de Relajación para Estudiantes',
    description: 'Métodos efectivos de relajación diseñados específicamente para estudiantes universitarios.',
    type: 'audio',
    category: 'stress',
    language: 'spanish',
    duration: '10:15',
    fileSize: '2.5 MB',
    views: 423,
    rating: 4.4,
    tags: ['relajación', 'estudiantes', 'universidad', 'bienestar'],
    url: '#'
  },
  {
    id: '7',
    title: 'Crisis Intervention Strategies',
    description: 'Immediate response techniques and resources for mental health crisis situations.',
    type: 'guide',
    category: 'crisis',
    language: 'english',
    views: 3456,
    rating: 4.9,
    tags: ['crisis', 'emergency', 'intervention', 'safety'],
    url: '#'
  },
  {
    id: '8',
    title: 'Building Healthy Relationships',
    description: 'Guidance on developing and maintaining healthy relationships with friends, family, and partners.',
    type: 'document',
    category: 'relationships',
    language: 'english',
    fileSize: '2.3 MB',
    views: 1789,
    rating: 4.6,
    tags: ['relationships', 'communication', 'boundaries', 'friendship'],
    url: '#'
  }
]

const categories = [
  { id: 'all', label: 'All Categories', icon: BookOpen, color: 'bg-gray-500' },
  { id: 'anxiety', label: 'Anxiety', icon: BookOpen, color: 'bg-yellow-500' },
  { id: 'depression', label: 'Depression', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'stress', label: 'Stress', icon: BookOpen, color: 'bg-orange-500' },
  { id: 'mindfulness', label: 'Mindfulness', icon: BookOpen, color: 'bg-green-500' },
  { id: 'sleep', label: 'Sleep', icon: BookOpen, color: 'bg-purple-500' },
  { id: 'academic', label: 'Academic', icon: BookOpen, color: 'bg-red-500' },
  { id: 'relationships', label: 'Relationships', icon: BookOpen, color: 'bg-pink-500' },
  { id: 'crisis', label: 'Crisis', icon: BookOpen, color: 'bg-red-600' }
]

const languages = [
  { id: 'all', label: 'All Languages', flag: '🌍' },
  { id: 'english', label: 'English', flag: '🇺🇸' },
  { id: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
  { id: 'spanish', label: 'Español', flag: '🇪🇸' },
  { id: 'mandarin', label: '中文', flag: '🇨🇳' },
  { id: 'french', label: 'Français', flag: '🇫🇷' }
]

export default function ResourceHub() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage
    const matchesType = selectedType === 'all' || resource.type === selectedType
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesType
  })

  const toggleFavorite = (resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-6 h-6" />
      case 'audio': return <Headphones className="w-6 h-6" />
      case 'document': return <FileText className="w-6 h-6" />
      case 'guide': return <BookOpen className="w-6 h-6" />
      default: return <BookOpen className="w-6 h-6" />
    }
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.color : 'bg-gray-500'
  }

  const getLanguageFlag = (language: string) => {
    const lang = languages.find(l => l.id === language)
    return lang ? lang.flag : '🌍'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-calm-500 to-primary-500 rounded-full flex items-center justify-center mx-auto">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Mental Wellness Resource Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Access a comprehensive collection of mental health resources, guides, and tools designed to support 
          your mental wellness journey. Available in multiple languages and formats.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search resources, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="space-y-4">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === language.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Types */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Resource Types</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Types', icon: BookOpen },
                { id: 'video', label: 'Videos', icon: Play },
                { id: 'audio', label: 'Audio', icon: Headphones },
                { id: 'document', label: 'Documents', icon: FileText },
                { id: 'guide', label: 'Guides', icon: BookOpen }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <type.icon className="w-4 h-4 inline mr-2" />
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Resources ({filteredResources.length})
          </h2>
          <div className="text-sm text-gray-500">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No resources found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-all group"
              >
                {/* Resource Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${getCategoryColor(resource.category)} flex items-center justify-center text-white`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <button
                    onClick={() => toggleFavorite(resource.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(resource.id)
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(resource.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Resource Content */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Resource Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{getLanguageFlag(resource.language)}</span>
                      {resource.duration && (
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.duration}
                        </span>
                      )}
                      {resource.fileSize && (
                        <span>{resource.fileSize}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {resource.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {resource.rating}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{resource.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button className="btn-primary flex-1 text-sm">
                      {resource.type === 'video' ? 'Watch' : 
                       resource.type === 'audio' ? 'Listen' : 
                       resource.type === 'document' ? 'Read' : 'View'}
                    </button>
                    <button className="btn-secondary text-sm px-3">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Collections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Collections</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-gradient-to-br from-primary-50 to-mental-50 border-primary-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Quick Stress Relief</h3>
              <p className="text-gray-600">
                A curated collection of 5-minute videos and audio sessions for immediate stress relief.
              </p>
              <button className="btn-primary">Explore Collection</button>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-calm-50 to-green-50 border-calm-200">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-calm-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Academic Success Toolkit</h3>
              <p className="text-gray-600">
                Comprehensive resources for managing academic pressure and maintaining mental wellness.
              </p>
              <button className="btn-primary">Explore Collection</button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Support Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Globe className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Multi-Language Support</h3>
            <p className="text-blue-700 text-sm mt-1">
              We're committed to making mental health resources accessible to all students. 
              Our content is available in multiple languages, and we're continuously expanding 
              our language offerings. If you need resources in a specific language not currently 
              available, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
