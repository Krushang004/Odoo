'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, MessageCircle, Heart, Flag, Shield, UserCheck, Clock, TrendingUp, Send, Search } from 'lucide-react'

interface Peer {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'busy'
  specialization: string[]
  rating: number
  totalSessions: number
  isVerified: boolean
  languages: string[]
}

interface SupportRequest {
  id: string
  title: string
  description: string
  category: 'anxiety' | 'depression' | 'stress' | 'academic' | 'relationships' | 'general'
  urgency: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: Date
  responses: number
  lastActivity: Date
  tags: string[]
}

interface SupportResponse {
  id: string
  requestId: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    isPeer: boolean
  }
  createdAt: Date
  helpful: number
  isVerified: boolean
}

const peers: Peer[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: '👨‍🎓',
    status: 'online',
    specialization: ['Anxiety', 'Academic Stress', 'Peer Pressure'],
    rating: 4.9,
    totalSessions: 47,
    isVerified: true,
    languages: ['English', 'Mandarin']
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: '👩‍🎓',
    status: 'online',
    specialization: ['Depression', 'Family Issues', 'Cultural Identity'],
    rating: 4.8,
    totalSessions: 52,
    isVerified: true,
    languages: ['English', 'Hindi', 'Gujarati']
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    avatar: '👨‍🎓',
    status: 'busy',
    specialization: ['Relationship Issues', 'Loneliness', 'Social Anxiety'],
    rating: 4.7,
    totalSessions: 38,
    isVerified: true,
    languages: ['English']
  },
  {
    id: '4',
    name: 'Sofia Rodriguez',
    avatar: '👩‍🎓',
    status: 'offline',
    specialization: ['Trauma', 'PTSD', 'Crisis Support'],
    rating: 4.9,
    totalSessions: 61,
    isVerified: true,
    languages: ['English', 'Spanish']
  }
]

const supportRequests: SupportRequest[] = [
  {
    id: '1',
    title: 'Feeling overwhelmed with final exams',
    description: 'I have 4 final exams next week and I\'m feeling extremely anxious. I can\'t sleep properly and I\'m having trouble concentrating on my studies. Any advice on managing exam stress?',
    category: 'academic',
    urgency: 'high',
    status: 'open',
    author: {
      id: 'user1',
      name: 'Anonymous Student',
      avatar: '🎓'
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    responses: 3,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    tags: ['exams', 'stress', 'anxiety', 'study']
  },
  {
    id: '2',
    title: 'Struggling with homesickness',
    description: 'This is my first semester away from home and I\'m really struggling with homesickness. I miss my family and friends, and sometimes I feel like I made the wrong choice coming here.',
    category: 'general',
    urgency: 'medium',
    status: 'in-progress',
    author: {
      id: 'user2',
      name: 'Anonymous Student',
      avatar: '🏠'
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    responses: 7,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: ['homesickness', 'adjustment', 'first-year', 'family']
  },
  {
    id: '3',
    title: 'Relationship problems affecting my studies',
    description: 'I\'m going through a difficult breakup and it\'s really affecting my ability to focus on school. I keep thinking about it during class and my grades are suffering.',
    category: 'relationships',
    urgency: 'medium',
    status: 'open',
    author: {
      id: 'user3',
      name: 'Anonymous Student',
      avatar: '💔'
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    responses: 2,
    lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    tags: ['breakup', 'relationships', 'academic-impact', 'focus']
  }
]

const supportResponses: SupportResponse[] = [
  {
    id: '1',
    requestId: '1',
    content: 'I totally understand what you\'re going through! I was in the same situation last semester. Here are some things that helped me:\n\n1. Break your study sessions into smaller chunks (25 min study, 5 min break)\n2. Practice deep breathing exercises when you feel overwhelmed\n3. Create a realistic study schedule and stick to it\n4. Remember that it\'s okay to take breaks and practice self-care\n\nYou\'ve got this! 💪',
    author: {
      id: '1',
      name: 'Alex Chen',
      avatar: '👨‍🎓',
      isPeer: true
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    helpful: 5,
    isVerified: true
  },
  {
    id: '2',
    requestId: '1',
    content: 'I agree with Alex\'s advice! Also, try to get enough sleep - I know it\'s hard when you\'re stressed, but sleep deprivation makes everything worse. Consider using apps like Headspace or Calm for guided meditation before bed.',
    author: {
      id: 'user4',
      name: 'Anonymous Student',
      avatar: '🧘‍♀️',
      isPeer: false
    },
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    helpful: 3,
    isVerified: false
  }
]

export default function PeerSupport() {
  const [activeTab, setActiveTab] = useState<'requests' | 'peers' | 'chat'>('requests')
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [newResponse, setNewResponse] = useState('')
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'general' as SupportRequest['category'],
    urgency: 'medium' as SupportRequest['urgency'],
    tags: ''
  })

  const filteredRequests = supportRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-blue-100 text-blue-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢'
      case 'offline': return '⚫'
      case 'busy': return '🟡'
      default: return '⚫'
    }
  }

  const handleSubmitResponse = () => {
    if (!newResponse.trim() || !selectedRequest) return
    
    // In a real app, this would be sent to the backend
    console.log('New response submitted:', newResponse)
    setNewResponse('')
  }

  const handleSubmitRequest = () => {
    if (!newRequest.title.trim() || !newRequest.description.trim()) return
    
    // In a real app, this would be sent to the backend
    console.log('New request submitted:', newRequest)
    setShowNewRequest(false)
    setNewRequest({
      title: '',
      description: '',
      category: 'general',
      urgency: 'medium',
      tags: ''
    })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return '1 day ago'
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-mental-500 to-primary-500 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Peer Support Network</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with trained peer support volunteers who understand what you're going through. 
          Get support, share experiences, and build connections in a safe, moderated environment.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          {[
            { id: 'requests', label: 'Support Requests', icon: MessageCircle },
            { id: 'peers', label: 'Peer Volunteers', icon: Users },
            { id: 'chat', label: 'Live Chat', icon: MessageCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'requests' && (
          <motion.div
            key="requests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search support requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="anxiety">Anxiety</option>
                <option value="depression">Depression</option>
                <option value="stress">Stress</option>
                <option value="academic">Academic</option>
                <option value="relationships">Relationships</option>
                <option value="general">General</option>
              </select>
              
              <button
                onClick={() => setShowNewRequest(true)}
                className="btn-primary px-6"
              >
                New Request
              </button>
            </div>

            {/* Support Requests List */}
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{request.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {request.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTimeAgo(request.createdAt)}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {request.responses} responses
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Last activity: {formatTimeAgo(request.lastActivity)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{request.author.avatar}</span>
                      <span className="text-sm text-gray-600">{request.author.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {request.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'peers' && (
          <motion.div
            key="peers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {peers.map((peer) => (
                <motion.div
                  key={peer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card text-center hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="text-4xl mx-auto">{peer.avatar}</div>
                      <span className="absolute -top-1 -right-1 text-lg">
                        {getStatusIcon(peer.status)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{peer.name}</h3>
                      
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{peer.rating}</span>
                        <span className="text-xs text-gray-500">({peer.totalSessions} sessions)</span>
                      </div>
                      
                      {peer.isVerified && (
                        <div className="flex items-center justify-center space-x-1 text-primary-600">
                          <UserCheck className="w-4 h-4" />
                          <span className="text-xs font-medium">Verified Peer</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Specializations</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {peer.specialization.slice(0, 2).map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Languages</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {peer.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="btn-primary w-full">
                      Start Chat
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="card text-center py-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">Live Peer Support Chat</h3>
              <p className="text-gray-600 mb-6">
                Connect with trained peer volunteers for real-time support and guidance.
              </p>
              <button className="btn-primary">
                Start a Chat Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedRequest.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTimeAgo(selectedRequest.createdAt)}
                        </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                      {selectedRequest.urgency}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Request Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{selectedRequest.author.avatar}</span>
                  <div className="flex-1">
                    <p className="text-gray-800">{selectedRequest.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {selectedRequest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Responses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Responses ({supportResponses.filter(r => r.requestId === selectedRequest.id).length})</h3>
                
                {supportResponses
                  .filter(response => response.requestId === selectedRequest.id)
                  .map((response) => (
                    <div key={response.id} className="border-l-4 border-primary-200 pl-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{response.author.avatar}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{response.author.name}</span>
                            {response.author.isPeer && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                Peer Volunteer
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(response.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-800 whitespace-pre-wrap">{response.content}</p>
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-primary-600">
                              <Heart className="w-4 h-4" />
                              <span>Helpful ({response.helpful})</span>
                            </button>
                            <button className="hover:text-primary-600">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Add Response */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Add Your Response</h3>
                <textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder="Share your thoughts, advice, or support..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!newResponse.trim()}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-2xl"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">New Support Request</h2>
                <button
                  onClick={() => setShowNewRequest(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of what you need help with"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tell us more about your situation and what kind of support you're looking for..."
                    className="input-field"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newRequest.category}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value as any }))}
                      className="input-field"
                    >
                      <option value="general">General</option>
                      <option value="anxiety">Anxiety</option>
                      <option value="depression">Depression</option>
                      <option value="stress">Stress</option>
                      <option value="academic">Academic</option>
                      <option value="relationships">Relationships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                    <select
                      value={newRequest.urgency}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value as any }))}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
                  <input
                    type="text"
                    value={newRequest.tags}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Add relevant tags separated by commas"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewRequest(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={!newRequest.title.trim() || !newRequest.description.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Safety and Guidelines */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Community Guidelines & Safety</h3>
            <p className="text-blue-700 text-sm mt-1">
              Our peer support community is moderated to ensure a safe and supportive environment. 
              Remember that peer volunteers are not professional therapists, and this platform is 
              not a substitute for professional mental health care. If you're in crisis, please 
              contact emergency services or call your local crisis hotline.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
