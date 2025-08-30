'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, AlertTriangle, Heart, Brain, Shield } from 'lucide-react'
import axios from 'axios'
import { AI_CONFIG, MENTAL_HEALTH_CONTEXT, INDIAN_LANGUAGES, LANGUAGE_GREETINGS } from '../config/ai'
import { useLanguage } from '../contexts/LanguageContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  type?: 'crisis' | 'support' | 'resource'
}

const crisisKeywords = ['suicide', 'kill myself', 'want to die', 'end it all', 'hurt myself']
const supportKeywords = ['anxiety', 'depression', 'stress', 'overwhelmed', 'can\'t cope']

export default function AIChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm here to provide mental health support and guidance in multiple Indian languages. I'm not a replacement for professional help, but I can offer coping strategies and resources. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'support'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, setLanguage, getGreeting } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectMessageType = (text: string): 'crisis' | 'support' | 'resource' => {
    const lowerText = text.toLowerCase()
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'crisis'
    }
    if (supportKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'support'
    }
    return 'resource'
  }

  const getCurrentLanguageGreeting = () => {
    return LANGUAGE_GREETINGS[currentLanguage as keyof typeof LANGUAGE_GREETINGS] || LANGUAGE_GREETINGS.en
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    // Update welcome message with new language
    const newGreeting = LANGUAGE_GREETINGS[newLanguage as keyof typeof LANGUAGE_GREETINGS] || LANGUAGE_GREETINGS.en
    setMessages(prev => [
      {
        id: '1',
        text: `Hello! I'm here to provide mental health support and guidance in multiple Indian languages. I'm not a replacement for professional help, but I can offer coping strategies and resources.\n\n${newGreeting}`,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'support'
      }
    ])
  }

  const generateResponse = async (userMessage: string) => {
    const messageType = detectMessageType(userMessage)
    
    setIsTyping(true)
    
    try {
      // Call the real AI API with proper Perplexity AI structure
      console.log('Making API call to:', AI_CONFIG.API_URL)
      console.log('API Key:', AI_CONFIG.API_KEY.substring(0, 20) + '...')
      
      const response = await axios.post(AI_CONFIG.API_URL, {
        model: AI_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: MENTAL_HEALTH_CONTEXT
          },
          {
            role: 'user',
            content: `User message: "${userMessage}"\n\nMessage type detected: ${messageType}\n\nPreferred language: ${currentLanguage}\n\nPlease provide a supportive, empathetic response appropriate for this situation. If this is a crisis message, prioritize safety and provide emergency resources. Respond in ${currentLanguage} if possible, or provide a bilingual response.`
          }
        ],
        max_tokens: AI_CONFIG.MAX_TOKENS,
        temperature: AI_CONFIG.TEMPERATURE,
        stream: false
      }, {
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      })

      console.log('API Response Status:', response.status)
      console.log('API Response Headers:', response.headers)
      console.log('API Response Data:', response.data)
      
      // Handle Perplexity AI response structure
      let aiResponse = ''
      if (response.data.choices && response.data.choices[0]?.message?.content) {
        aiResponse = response.data.choices[0].message.content
        console.log('Found response in choices[0].message.content')
      } else if (response.data.text) {
        aiResponse = response.data.text
        console.log('Found response in text field')
      } else if (response.data.response) {
        aiResponse = response.data.response
        console.log('Found response in response field')
      } else if (response.data.error) {
        console.error('API Error:', response.data.error)
        throw new Error(`API Error: ${response.data.error.message || response.data.error}`)
      } else {
        console.log('Unexpected API response structure:', response.data)
        throw new Error('Unexpected API response structure')
      }
      
      if (aiResponse && aiResponse.trim()) {
        console.log('Returning AI response:', aiResponse.substring(0, 100) + '...')
        return aiResponse.trim()
      } else {
        throw new Error('Empty response from AI API')
      }
      
    } catch (error: any) {
      console.error('AI API Error:', error)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
        console.error('Response headers:', error.response.headers)
      } else if (error.request) {
        console.error('No response received:', error.request)
      } else {
        console.error('Error setting up request:', error.message)
      }
      
      // Enhanced fallback responses with variety and language support
      const currentGreeting = getCurrentLanguageGreeting()
      
      if (messageType === 'crisis') {
        const crisisResponses = [
          `I'm very concerned about what you're sharing. This is a serious situation that requires immediate professional help. Please:\n\n` +
          `• Call the National Suicide Prevention Lifeline: 988 (US) or your local crisis hotline\n` +
          `• Go to the nearest emergency room\n` +
          `• Contact campus security or a trusted adult immediately\n\n` +
          `You are not alone, and there are people who want to help you. Your life has value.\n\n` +
          `${currentGreeting}`,
          
          `This sounds like a crisis situation that needs immediate attention. Please:\n\n` +
          `• Call emergency services: 911 (US) or your local emergency number\n` +
          `• Reach out to campus mental health services\n` +
          `• Contact a trusted friend, family member, or counselor\n\n` +
          `Your safety is the most important thing right now.\n\n` +
          `${currentGreeting}`
        ]
        return crisisResponses[Math.floor(Math.random() * crisisResponses.length)]
      } else if (messageType === 'support') {
        const supportResponses = [
          `I understand you're going through a difficult time. Here are some immediate coping strategies:\n\n` +
          `• Take 5 deep breaths: inhale for 4 counts, hold for 4, exhale for 6\n` +
          `• Use the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n` +
          `• Step outside for fresh air and sunlight\n` +
          `• Call a friend or family member\n\n` +
          `Would you like me to help you find professional support resources?\n\n` +
          `${currentGreeting}`,
          
          `It sounds like you're experiencing significant stress. Remember that it's okay to not be okay. Some helpful strategies:\n\n` +
          `• Practice progressive muscle relaxation\n` +
          `• Write down your thoughts and feelings\n` +
          `• Listen to calming music\n` +
          `• Take a warm shower or bath\n\n` +
          `Have you considered speaking with a campus counsellor? I can help you book an appointment.\n\n` +
          `${currentGreeting}`,
          
          `I hear that you're struggling right now. Let's work through this together:\n\n` +
          `• Try the butterfly hug technique: cross your arms and tap your shoulders alternately\n` +
          `• Practice mindful breathing with a 4-7-8 pattern\n` +
          `• Engage in a simple activity you enjoy\n` +
          `• Consider reaching out to our peer support network\n\n` +
          `What would be most helpful for you right now?\n\n` +
          `${currentGreeting}`
        ]
        return supportResponses[Math.floor(Math.random() * supportResponses.length)]
      } else {
        const resourceResponses = [
          `I'm here to help you with mental wellness! Here are some resources:\n\n` +
          `• Check out our relaxation audio library\n` +
          `• Access mental health guides and videos\n` +
          `• Connect with peer support volunteers\n` +
          `• Learn about stress management techniques\n\n` +
          `What specific area would you like to explore?\n\n` +
          `${currentGreeting}`,
          
          `Great question! We have many resources available:\n\n` +
          `• Mindfulness and meditation guides\n` +
          `• Academic stress management tips\n` +
          `• Social connection strategies\n` +
          `• Sleep hygiene information\n\n` +
          `Is there a particular challenge you'd like help with?\n\n` +
          `${currentGreeting}`,
          
          `Excellent! We offer comprehensive mental health support:\n\n` +
          `• Interactive workshops on stress management\n` +
          `• Guided meditation sessions\n` +
          `• Academic counseling services\n` +
          `• Social support groups\n\n` +
          `Which area interests you most?\n\n` +
          `${currentGreeting}`
        ]
        return resourceResponses[Math.floor(Math.random() * resourceResponses.length)]
      }
    } finally {
      setIsTyping(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    
    const response = await generateResponse(inputText)
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'assistant',
      timestamp: new Date(),
      type: detectMessageType(inputText)
    }

    setMessages(prev => [...prev, assistantMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMessageIcon = (message: Message) => {
    if (message.sender === 'user') {
      return <User className="w-6 h-6 text-primary-600" />
    }
    
    switch (message.type) {
      case 'crisis':
        return <AlertTriangle className="w-6 h-6 text-red-500" />
      case 'support':
        return <Heart className="w-6 h-6 text-mental-500" />
      default:
        return <Bot className="w-6 h-6 text-calm-600" />
    }
  }

  const getMessageStyle = (message: Message) => {
    if (message.sender === 'user') {
      return 'chat-bubble user'
    }
    
    switch (message.type) {
      case 'crisis':
        return 'bg-red-50 border border-red-200 text-red-800'
      case 'support':
        return 'bg-mental-50 border border-mental-200 text-mental-800'
      default:
        return 'chat-bubble assistant'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-500 to-mental-500 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Mental Health Assistant</h3>
              <p className="text-sm opacity-90">Available 24/7 • Confidential • Supportive</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm opacity-90">Language:</label>
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {INDIAN_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex space-x-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <div className="flex-shrink-0">
                  {getMessageIcon(message)}
                </div>
              )}
              
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${getMessageStyle(message)}`}>
                <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0">
                  {getMessageIcon(message)}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-3"
          >
            <div className="flex-shrink-0">
              <Bot className="w-6 h-6 text-calm-600" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send)"
            className="flex-1 input-field resize-none"
            rows={2}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-4"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Language and Safety Notice */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">🌐</span>
              <span>Available in {INDIAN_LANGUAGES.length} Indian languages</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">💬</span>
              <span>Type in any language - I'll respond accordingly</span>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 inline mr-1" />
            <span>Confidential • Crisis: Call 988</span>
          </div>
        </div>
      </div>
    </div>
  )
}
