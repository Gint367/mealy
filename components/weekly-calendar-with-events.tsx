'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mock data for events - one event per day
const mockEvents = [
  { title: 'Team Meeting', time: '09:00 AM' },
  { title: 'Dentist Appointment', time: '11:30 AM' },
  { title: 'Lunch with Client', time: '12:45 PM' },
  { title: 'Project Deadline', time: '03:00 PM' },
  { title: 'Gym Session', time: '05:30 PM' },
  { title: 'Movie Night', time: '08:00 PM' },
  { title: 'Sunday Brunch', time: '10:30 AM' },
]

export default function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getWeekDates = (date: Date) => {
    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(date)
      day.setDate(date.getDate() - date.getDay() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentDate)

  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={prevWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous Week
          </Button>
          <h2 className="text-lg font-semibold text-center">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <Button variant="outline" size="sm" onClick={nextWeek}>
            Next Week
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => (
            <div key={index} className="border rounded-lg p-2">
              <div className={`text-center mb-2 font-semibold ${isToday(date) ? 'bg-primary text-primary-foreground rounded-md p-1' : ''}`}>
                <div>{days[index]}</div>
                <div>{date.getDate()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs bg-secondary text-secondary-foreground rounded p-2">
                  <div className="font-medium">{mockEvents[index].title}</div>
                  <div>{mockEvents[index].time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}