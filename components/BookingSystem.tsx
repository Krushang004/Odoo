'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, MapPin, Phone, Mail, Shield, CheckCircle, AlertTriangle } from 'lucide-react'

interface Counsellor {
  id: string
  name: string
  specialization: string[]
  availability: string[]
  location: string
  phone: string
  email: string
  rating: number
  image: string
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
  counsellorId: string
}

interface Appointment {
  id: string
  counsellorId: string
  counsellorName: string
  date: string
  time: string
  reason: string
  urgency: 'low' | 'medium' | 'high'
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: Date
}

const counsellors: Counsellor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: ['Anxiety', 'Depression', 'Academic Stress'],
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'Block A, Room 101',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@university.edu',
    rating: 4.8,
    image: '👩‍⚕️'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: ['Relationship Issues', 'Family Problems', 'Identity'],
    availability: ['Tuesday', 'Thursday'],
    location: 'Block A, Room 102',
    phone: '+1 (555) 123-4568',
    email: 'michael.chen@university.edu',
    rating: 4.9,
    image: '👨‍⚕️'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: ['Trauma', 'PTSD', 'Crisis Intervention'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    location: 'Block A, Room 103',
    phone: '+1 (555) 123-4569',
    email: 'emily.rodriguez@university.edu',
    rating: 4.7,
    image: '👩‍⚕️'
  }
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
]

export default function BookingSystem() {
  const [selectedCounsellor, setSelectedCounsellor] = useState<Counsellor | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentReason, setAppointmentReason] = useState('')
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [activeTab, setActiveTab] = useState<'book' | 'appointments' | 'counsellors'>('book')

  const getAvailableDates = (counsellor: Counsellor) => {
    const today = new Date()
    const dates: string[] = []
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      
      if (counsellor.availability.includes(dayName)) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    
    return dates
  }

  const getAvailableTimeSlots = (counsellorId: string, date: string) => {
    // Simulate availability based on existing appointments
    const existingAppointments = appointments.filter(
      apt => apt.counsellorId === counsellorId && apt.date === date
    )
    
    return timeSlots.map(time => ({
      id: `${counsellorId}-${date}-${time}`,
      time,
      available: !existingAppointments.some(apt => apt.time === time),
      counsellorId
    }))
  }

  const handleBookAppointment = () => {
    if (!selectedCounsellor || !selectedDate || !selectedTime || !appointmentReason) {
      return
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      counsellorId: selectedCounsellor.id,
      counsellorName: selectedCounsellor.name,
      date: selectedDate,
      time: selectedTime,
      reason: appointmentReason,
      urgency,
      status: 'pending',
      createdAt: new Date()
    }

    setAppointments(prev => [newAppointment, ...prev])
    setShowConfirmation(true)
    
    // Reset form
    setSelectedCounsellor(null)
    setSelectedDate('')
    setSelectedTime('')
    setAppointmentReason('')
    setUrgency('medium')
  }

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    )
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showConfirmation) {
    const appointment = appointments[0]
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900">Appointment Booked!</h2>
        <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
        
        <div className="card text-left">
          <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Counsellor:</span>
              <span className="font-medium">{appointment.counsellorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{appointment.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => setShowConfirmation(false)}
            className="btn-primary w-full"
          >
            Book Another Appointment
          </button>
          <button
            onClick={() => {
              setShowConfirmation(false)
              setActiveTab('appointments')
            }}
            className="btn-secondary w-full"
          >
            View My Appointments
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
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Book Counselling Session</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Schedule confidential appointments with our qualified mental health professionals. 
          All sessions are private and designed to support your mental wellness journey.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          {[
            { id: 'book', label: 'Book Appointment', icon: Calendar },
            { id: 'appointments', label: 'My Appointments', icon: Clock },
            { id: 'counsellors', label: 'Our Team', icon: User }
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
        {activeTab === 'book' && (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Step 1: Select Counsellor */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Step 1: Choose a Counsellor</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {counsellors.map((counsellor) => (
                  <div
                    key={counsellor.id}
                    onClick={() => setSelectedCounsellor(counsellor)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCounsellor?.id === counsellor.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-4xl">{counsellor.image}</div>
                      <h4 className="font-semibold">{counsellor.name}</h4>
                      <div className="text-sm text-gray-600">
                        {counsellor.specialization.join(', ')}
                      </div>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{counsellor.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Select Date and Time */}
            {selectedCounsellor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-4">Step 2: Choose Date & Time</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Choose a date</option>
                      {getAvailableDates(selectedCounsellor).map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedDate && getAvailableTimeSlots(selectedCounsellor.id, selectedDate).map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 text-sm rounded-lg border-2 transition-all ${
                            selectedTime === slot.time
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : slot.available
                              ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Appointment Details */}
            {selectedCounsellor && selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-4">Step 3: Appointment Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit
                    </label>
                    <textarea
                      value={appointmentReason}
                      onChange={(e) => setAppointmentReason(e.target.value)}
                      placeholder="Please describe what you'd like to discuss..."
                      className="input-field"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="flex space-x-3">
                      {[
                        { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
                        { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
                        { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
                      ].map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setUrgency(level.value as any)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            urgency === level.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    disabled={!appointmentReason.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'appointments' && (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-xl font-semibold mb-6">My Appointments</h3>
              
              {appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No appointments scheduled yet.</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="btn-primary mt-4"
                  >
                    Book Your First Appointment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{appointment.counsellorName}</h4>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(appointment.urgency)}`}>
                            {appointment.urgency}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {appointment.time}
                        </div>
                        <div>
                          <span className="font-medium">Booked:</span> {appointment.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </div>
                      
                      {appointment.status === 'pending' && (
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                          className="btn-secondary text-sm"
                        >
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'counsellors' && (
          <motion.div
            key="counsellors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {counsellors.map((counsellor) => (
                <div key={counsellor.id} className="card">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{counsellor.image}</div>
                    <h3 className="text-xl font-semibold">{counsellor.name}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {counsellor.specialization.map((spec) => (
                            <span key={spec} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                        <div className="text-sm text-gray-600">
                          {counsellor.availability.join(', ')}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{counsellor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{counsellor.location}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{counsellor.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{counsellor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Your Privacy is Protected</h3>
            <p className="text-blue-700 text-sm mt-1">
              All appointments and conversations are completely confidential. Your information is protected by 
              professional confidentiality standards and will not be shared without your explicit consent, 
              except in cases where there is a risk of harm to yourself or others.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
