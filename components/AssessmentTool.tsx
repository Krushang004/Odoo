'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, BarChart3 } from 'lucide-react'

interface Question {
  id: string
  text: string
  category: 'depression' | 'anxiety' | 'stress' | 'sleep'
}

interface Assessment {
  id: string
  name: string
  description: string
  questions: Question[]
  scoring: {
    min: number
    max: number
    levels: { min: number; max: number; label: string; severity: string; color: string }[]
  }
}

const assessments: Assessment[] = [
  {
    id: 'phq9',
    name: 'PHQ-9 (Depression Screening)',
    description: 'A 9-item depression screening tool used to assess the severity of depressive symptoms.',
    questions: [
      { id: '1', text: 'Little interest or pleasure in doing things?', category: 'depression' },
      { id: '2', text: 'Feeling down, depressed, or hopeless?', category: 'depression' },
      { id: '3', text: 'Trouble falling or staying asleep, or sleeping too much?', category: 'depression' },
      { id: '4', text: 'Feeling tired or having little energy?', category: 'depression' },
      { id: '5', text: 'Poor appetite or overeating?', category: 'depression' },
      { id: '6', text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down?', category: 'depression' },
      { id: '7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television?', category: 'depression' },
      { id: '8', text: 'Moving or speaking slowly enough that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?', category: 'depression' },
      { id: '9', text: 'Thoughts that you would be better off dead or of hurting yourself in some way?', category: 'depression' }
    ],
    scoring: {
      min: 0,
      max: 27,
      levels: [
        { min: 0, max: 4, label: 'Minimal Depression', severity: 'low', color: 'text-green-600' },
        { min: 5, max: 9, label: 'Mild Depression', severity: 'mild', color: 'text-yellow-600' },
        { min: 10, max: 14, label: 'Moderate Depression', severity: 'moderate', color: 'text-orange-600' },
        { min: 15, max: 19, label: 'Moderately Severe Depression', severity: 'moderate-severe', color: 'text-red-600' },
        { min: 20, max: 27, label: 'Severe Depression', severity: 'severe', color: 'text-red-800' }
      ]
    }
  },
  {
    id: 'gad7',
    name: 'GAD-7 (Anxiety Screening)',
    description: 'A 7-item anxiety screening tool used to assess the severity of anxiety symptoms.',
    questions: [
      { id: '1', text: 'Feeling nervous, anxious, or on edge?', category: 'anxiety' },
      { id: '2', text: 'Not being able to stop or control worrying?', category: 'anxiety' },
      { id: '3', text: 'Worrying too much about different things?', category: 'anxiety' },
      { id: '4', text: 'Trouble relaxing?', category: 'anxiety' },
      { id: '5', text: 'Being so restless that it is hard to sit still?', category: 'anxiety' },
      { id: '6', text: 'Becoming easily annoyed or irritable?', category: 'anxiety' },
      { id: '7', text: 'Feeling afraid, as if something awful might happen?', category: 'anxiety' }
    ],
    scoring: {
      min: 0,
      max: 21,
      levels: [
        { min: 0, max: 4, label: 'Minimal Anxiety', severity: 'low', color: 'text-green-600' },
        { min: 5, max: 9, label: 'Mild Anxiety', severity: 'mild', color: 'text-yellow-600' },
        { min: 10, max: 14, label: 'Moderate Anxiety', severity: 'moderate', color: 'text-orange-600' },
        { min: 15, max: 21, label: 'Severe Anxiety', severity: 'severe', color: 'text-red-600' }
      ]
    }
  }
]

export default function AssessmentTool() {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentHistory, setAssessmentHistory] = useState<Array<{
    id: string
    assessmentName: string
    score: number
    level: string
    date: Date
  }>>([])

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (score: number) => {
    if (!selectedAssessment) return
    
    const questionId = selectedAssessment.questions[currentQuestion].id
    setAnswers(prev => ({ ...prev, [questionId]: score }))
  }

  const handleNext = () => {
    if (currentQuestion < selectedAssessment!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    if (!selectedAssessment) return
    
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const level = selectedAssessment.scoring.levels.find(
      level => totalScore >= level.min && totalScore <= level.max
    )
    
    const result = {
      id: Date.now().toString(),
      assessmentName: selectedAssessment.name,
      score: totalScore,
      level: level?.label || 'Unknown',
      date: new Date()
    }
    
    setAssessmentHistory(prev => [result, ...prev])
    setShowResults(true)
  }

  const getCurrentAnswer = () => {
    if (!selectedAssessment) return null
    const questionId = selectedAssessment.questions[currentQuestion].id
    return answers[questionId] || null
  }

  const canProceed = () => {
    if (!selectedAssessment) return false
    const questionId = selectedAssessment.questions[currentQuestion].id
    return answers[questionId] !== undefined
  }

  const getProgressPercentage = () => {
    if (!selectedAssessment) return 0
    return ((currentQuestion + 1) / selectedAssessment.questions.length) * 100
  }

  const getRecommendations = (assessment: Assessment, score: number) => {
    const level = assessment.scoring.levels.find(
      level => score >= level.min && score <= level.max
    )
    
    if (!level) return []
    
    const recommendations: string[] = []
    
    if (level.severity === 'low') {
      recommendations.push('Continue with current self-care practices')
      recommendations.push('Maintain healthy lifestyle habits')
      recommendations.push('Consider preventive mental wellness activities')
    } else if (level.severity === 'mild') {
      recommendations.push('Practice stress management techniques')
      recommendations.push('Consider speaking with a peer support volunteer')
      recommendations.push('Explore mental wellness resources')
    } else if (level.severity === 'moderate') {
      recommendations.push('Schedule an appointment with a campus counsellor')
      recommendations.push('Consider professional mental health support')
      recommendations.push('Implement daily coping strategies')
    } else {
      recommendations.push('Seek immediate professional help')
      recommendations.push('Contact campus mental health services')
      recommendations.push('Consider crisis intervention if needed')
    }
    
    return recommendations
  }

  if (showResults && selectedAssessment) {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const recommendations = getRecommendations(selectedAssessment, totalScore)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">Assessment Complete</h2>
          <p className="text-gray-600">Here are your results and recommendations</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Results Card */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Your Results</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Assessment</p>
                <p className="font-medium">{selectedAssessment.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Score</p>
                <p className="text-2xl font-bold text-primary-600">{totalScore}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-medium">{assessmentHistory[0]?.level}</p>
              </div>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSelectedAssessment(null)
              setShowResults(false)
            }}
            className="btn-secondary"
          >
            Take Another Assessment
          </button>
          <button
            onClick={() => {
              setSelectedAssessment(null)
              setShowResults(false)
            }}
            className="btn-primary"
          >
            Return to Home
          </button>
        </div>
      </motion.div>
    )
  }

  if (selectedAssessment) {
    const question = selectedAssessment.questions[currentQuestion]
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Assessment Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{selectedAssessment.name}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{selectedAssessment.description}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-mental-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {selectedAssessment.questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
          
          <div className="space-y-3">
            {[
              { value: 0, label: 'Not at all' },
              { value: 1, label: 'Several days' },
              { value: 2, label: 'More than half the days' },
              { value: 3, label: 'Nearly every day' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  getCurrentAnswer() === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === selectedAssessment.questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-mental-500 rounded-full flex items-center justify-center mx-auto">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Mental Health Assessment</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Take a confidential screening to understand your current mental health status and get personalized recommendations.
        </p>
      </div>

      {/* Assessment Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <motion.div
            key={assessment.id}
            whileHover={{ scale: 1.02 }}
            className="card hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStartAssessment(assessment)}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-mental-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{assessment.name}</h3>
              <p className="text-gray-600">{assessment.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{assessment.questions.length} questions</span>
                <span>~5-10 minutes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assessment History */}
      {assessmentHistory.length > 0 && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Recent Assessments</h2>
          <div className="space-y-4">
            {assessmentHistory.slice(0, 5).map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{result.assessmentName}</p>
                  <p className="text-sm text-gray-600">
                    {result.date.toLocaleDateString()} • Score: {result.score}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.level.includes('Severe') ? 'bg-red-100 text-red-800' :
                  result.level.includes('Moderate') ? 'bg-orange-100 text-orange-800' :
                  result.level.includes('Mild') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {result.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800">Important Notice</h3>
            <p className="text-yellow-700 text-sm mt-1">
              These assessments are screening tools and not diagnostic instruments. They are designed to help identify 
              potential mental health concerns and guide you toward appropriate resources. For professional diagnosis 
              and treatment, please consult with a qualified mental health professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
