'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, AlertTriangle, Calendar, MessageCircle, Brain, Shield, Download, Filter, Eye } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  crisisInterventions: number
  averageSessionDuration: number
  satisfactionRating: number
}

interface TrendData {
  date: string
  users: number
  sessions: number
  assessments: number
  crisisAlerts: number
}

interface CategoryData {
  category: string
  count: number
  percentage: number
  color: string
}

interface DemographicData {
  ageGroup: string
  count: number
  percentage: number
}

const analyticsData: AnalyticsData = {
  totalUsers: 2847,
  activeUsers: 892,
  totalSessions: 1543,
  crisisInterventions: 23,
  averageSessionDuration: 18.5,
  satisfactionRating: 4.6
}

const trendData: TrendData[] = [
  { date: 'Jan', users: 120, sessions: 85, assessments: 45, crisisAlerts: 2 },
  { date: 'Feb', users: 135, sessions: 92, assessments: 52, crisisAlerts: 1 },
  { date: 'Mar', users: 142, sessions: 98, assessments: 58, crisisAlerts: 3 },
  { date: 'Apr', users: 158, sessions: 112, assessments: 67, crisisAlerts: 2 },
  { date: 'May', users: 165, sessions: 125, assessments: 73, crisisAlerts: 4 },
  { date: 'Jun', users: 178, sessions: 138, assessments: 81, crisisAlerts: 1 }
]

const categoryData: CategoryData[] = [
  { category: 'Anxiety', count: 456, percentage: 32, color: '#fbbf24' },
  { category: 'Depression', count: 389, percentage: 27, color: '#3b82f6' },
  { category: 'Academic Stress', count: 312, percentage: 22, color: '#ef4444' },
  { category: 'Relationship Issues', count: 178, percentage: 13, color: '#ec4899' },
  { category: 'Other', count: 89, percentage: 6, color: '#6b7280' }
]

const demographicData: DemographicData[] = [
  { ageGroup: '18-20', count: 892, percentage: 31 },
  { ageGroup: '21-23', count: 1023, percentage: 36 },
  { ageGroup: '24-26', count: 678, percentage: 24 },
  { ageGroup: '27+', count: 254, percentage: 9 }
]

const crisisData = [
  { type: 'Suicidal Ideation', count: 8, severity: 'high' },
  { type: 'Self-Harm', count: 5, severity: 'high' },
  { type: 'Severe Anxiety', count: 6, severity: 'medium' },
  { type: 'Depression Crisis', count: 4, severity: 'medium' }
]

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months')
  const [selectedView, setSelectedView] = useState('overview')

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-mental-500 rounded-full flex items-center justify-center mx-auto">
          <BarChart3 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Anonymous analytics and insights to help identify mental health trends and plan effective interventions.
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          {[
            { id: '1month', label: '1 Month' },
            { id: '3months', label: '3 Months' },
            { id: '6months', label: '6 Months' },
            { id: '1year', label: '1 Year' }
          ].map((timeframe) => (
            <button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe.id
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'demographics', label: 'Demographics', icon: Users },
            { id: 'crisis', label: 'Crisis Data', icon: AlertTriangle }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <view.icon className="w-4 h-4 inline mr-2" />
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Dashboard */}
      {selectedView === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalUsers)}</h3>
              <p className="text-gray-600">Total Users</p>
              <div className="text-sm text-green-600 mt-2">+12% from last month</div>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalSessions)}</h3>
              <p className="text-gray-600">Total Sessions</p>
              <div className="text-sm text-green-600 mt-2">+8% from last month</div>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{analyticsData.averageSessionDuration}m</h3>
              <p className="text-gray-600">Avg. Session Duration</p>
              <div className="text-sm text-green-600 mt-2">+2.3m from last month</div>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{analyticsData.satisfactionRating}/5</h3>
              <p className="text-gray-600">Satisfaction Rating</p>
              <div className="text-sm text-green-600 mt-2">+0.2 from last month</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Growth Trend */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">User Growth Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Session vs Assessments */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Sessions vs Assessments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#10b981" />
                  <Bar dataKey="assessments" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Mental Health Concerns by Category</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {categoryData.map((category) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{category.count}</div>
                      <div className="text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Trends Dashboard */}
      {selectedView === 'trends' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Comprehensive Trend Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} name="Sessions" />
                <Line type="monotone" dataKey="assessments" stroke="#f59e0b" strokeWidth={2} name="Assessments" />
                <Line type="monotone" dataKey="crisisAlerts" stroke="#ef4444" strokeWidth={2} name="Crisis Alerts" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Monthly Growth Rates</h3>
              <div className="space-y-4">
                {trendData.slice(1).map((month, index) => {
                  const prevMonth = trendData[index]
                  const userGrowth = ((month.users - prevMonth.users) / prevMonth.users * 100).toFixed(1)
                  const sessionGrowth = ((month.sessions - prevMonth.sessions) / prevMonth.sessions * 100).toFixed(1)
                  
                  return (
                    <div key={month.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{month.date}</span>
                      <div className="text-right">
                        <div className={`text-sm ${parseFloat(userGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Users: {userGrowth}%
                        </div>
                        <div className={`text-sm ${parseFloat(sessionGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Sessions: {sessionGrowth}%
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Peak Usage Times</h3>
              <div className="space-y-3">
                {[
                  { time: '9:00 AM - 11:00 AM', users: 234, percentage: 26 },
                  { time: '2:00 PM - 4:00 PM', users: 198, percentage: 22 },
                  { time: '7:00 PM - 9:00 PM', users: 267, percentage: 30 },
                  { time: '10:00 PM - 12:00 AM', users: 193, percentage: 22 }
                ].map((timeSlot) => (
                  <div key={timeSlot.time} className="flex items-center justify-between">
                    <span className="text-sm">{timeSlot.time}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${timeSlot.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{timeSlot.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Demographics Dashboard */}
      {selectedView === 'demographics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demographicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageGroup" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Age Group Details</h3>
              <div className="space-y-4">
                {demographicData.map((ageGroup) => (
                  <div key={ageGroup.ageGroup} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{ageGroup.ageGroup} years</span>
                    <div className="text-right">
                      <div className="font-semibold">{ageGroup.count}</div>
                      <div className="text-sm text-gray-500">{ageGroup.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Additional Demographics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">Gender Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Female</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Male</span>
                    <span className="font-medium">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other</span>
                    <span className="font-medium">4%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">Academic Level</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Undergraduate</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Graduate</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-2">First-Time Users</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-medium">198</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-medium text-green-600">+18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Crisis Data Dashboard */}
      {selectedView === 'crisis' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Crisis Interventions</h3>
              <div className="space-y-4">
                {crisisData.map((crisis) => (
                  <div key={crisis.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`w-5 h-5 ${
                        crisis.severity === 'high' ? 'text-red-500' : 
                        crisis.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className="font-medium">{crisis.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{crisis.count}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(crisis.severity)}`}>
                        {crisis.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Crisis Alert Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="crisisAlerts" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Response Time Analysis</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2.3m</div>
                <p className="text-gray-600">Average Response Time</p>
                <div className="text-sm text-green-600 mt-1">-0.5m from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <p className="text-gray-600">Response Rate</p>
                <div className="text-sm text-green-600 mt-1">+2% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">15</div>
                <p className="text-gray-600">Escalations to Professionals</p>
                <div className="text-sm text-red-600 mt-1">+3 from last month</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-secondary">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
        <button className="btn-primary">
          <Eye className="w-4 h-4 mr-2" />
          Generate Insights
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800">Data Privacy & Anonymity</h3>
            <p className="text-blue-700 text-sm mt-1">
              All data presented in this dashboard is completely anonymous and aggregated. 
              No individual student information is accessible, ensuring complete privacy 
              while providing valuable insights for institutional mental health planning 
              and resource allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
