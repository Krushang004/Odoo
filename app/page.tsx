'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3, 
  Heart, 
  Shield, 
  Brain,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'
import AIChatBox from '@/components/AIChatBox'
import BookingSystem from '@/components/BookingSystem'
import ResourceHub from '@/components/ResourceHub'
import PeerSupport from '@/components/PeerSupport'
import AdminDashboard from '@/components/AdminDashboard'
import AssessmentTool from '@/components/AssessmentTool'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home')
  const [showChat, setShowChat] = useState(false)

  const features = [
    {
      icon: Brain,
      title: 'AI-Guided Support',
      description: 'Get immediate help and coping strategies through our intelligent chat system',
      color: 'from-mental-500 to-mental-600'
    },
    {
      icon: Shield,
      title: 'Confidential Booking',
      description: 'Schedule appointments with campus counsellors privately and securely',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: BookOpen,
      title: 'Resource Hub',
      description: 'Access mental wellness guides, videos, and relaxation content',
      color: 'from-calm-500 to-calm-600'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with trained student volunteers in a moderated environment',
      color: 'from-mental-500 to-mental-600'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <AIChatBox />
      case 'booking':
        return <BookingSystem />
      case 'resources':
        return <ResourceHub />
      case 'peer-support':
        return <PeerSupport />
      case 'assessment':
        return <AssessmentTool />
      case 'admin':
        return <AdminDashboard />
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gradient">
                Mental Health Support System
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive digital platform providing stigma-free psychological support, 
                AI-guided assistance, and confidential counselling for college students.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setActiveTab('assessment')}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Take Mental Health Assessment
                </button>
                <button 
                  onClick={() => setShowChat(true)}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Start AI Chat
                </button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setActiveTab(feature.title.toLowerCase().replace(/\s+/g, '-'))}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                  <span>AI Chat Support</span>
                </button>
                <button 
                  onClick={() => setActiveTab('booking')}
                  className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span>Book Counselling</span>
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <span>Mental Wellness Resources</span>
                </button>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card bg-gradient-to-r from-primary-50 to-mental-50"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Emergency Support</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Phone className="w-8 h-8 text-primary-600 mx-auto" />
                  <h3 className="font-semibold">24/7 Helpline</h3>
                  <p className="text-gray-600">1800-123-4567</p>
                </div>
                <div className="space-y-2">
                  <Mail className="w-8 h-8 text-primary-600 mx-auto" />
                  <h3 className="font-semibold">Email Support</h3>
                  <p className="text-gray-600">support@mentalhealth.edu</p>
                </div>
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-primary-600 mx-auto" />
                  <h3 className="font-semibold">Counselling Centre</h3>
                  <p className="text-gray-600">Block A, Room 101</p>
                </div>
              </div>
            </motion.div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-mental-600" />
              <h1 className="text-xl font-bold text-gradient">Mental Health Support</h1>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {[
                { id: 'home', label: 'Home', icon: Heart },
                { id: 'assessment', label: 'Assessment', icon: Brain },
                { id: 'chat', label: 'AI Chat', icon: MessageCircle },
                { id: 'booking', label: 'Booking', icon: Calendar },
                { id: 'resources', label: 'Resources', icon: BookOpen },
                { id: 'peer-support', label: 'Peer Support', icon: Users },
                { id: 'admin', label: 'Admin', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowChat(true)}
              className="md:hidden btn-primary"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Floating Chat Button */}
      {!showChat && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-mental-500 to-mental-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      )}

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">AI Mental Health Support</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIChatBox />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
