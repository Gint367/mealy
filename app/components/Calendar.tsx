"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DayPopup } from "@/components/day-popup"

interface CalendarEvent {
    date: Date
    title: string
}

export function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [events, setEvents] = useState<CalendarEvent[]>([
        { date: new Date(2024, 10, 1), title: "Team Meeting" },
        { date: new Date(2024, 10, 2), title: "Dentist Appointment" },
        { date: new Date(2024, 10, 8), title: "Team Building" },
        { date: new Date(2024, 10, 15), title: "Team Lunch" },
    ])

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
        setIsPopupOpen(true)
    }

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()
        return { daysInMonth, startingDay }
    }

    const getEventForDate = (date: Date) => {
        return events.find(
            event =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear()
        )
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }

    const handleSaveEvent = (date: Date, title: string) => {
        const newEvent = { date, title }
        setEvents(prevEvents => {
            const existingEventIndex = prevEvents.findIndex(
                e => e.date.toDateString() === date.toDateString()
            )
            if (existingEventIndex > -1) {
                const updatedEvents = [...prevEvents]
                updatedEvents[existingEventIndex] = newEvent
                return updatedEvents
            }
            return [...prevEvents, newEvent]
        })
    }

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className="container mx-auto p-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" onClick={previousMonth}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <h2 className="text-xl font-semibold mx-4">
                                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <Button variant="ghost" size="icon" onClick={nextMonth}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-muted">
                        {weekDays.map((day) => (
                            <div key={day} className="p-3 text-center text-sm font-medium">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: startingDay }).map((_, index) => (
                            <div key={`empty-${index}`} className="p-3 bg-background" />
                        ))}
                        {days.map((day) => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                            const event = getEventForDate(date)
                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateSelect(date)}
                                    className={cn(
                                        "p-3 bg-background hover:bg-muted transition-colors relative h-24 text-left",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        event && "bg-muted/50"
                                    )}
                                >
                                    <span className="text-sm font-medium">{day}</span>
                                    {event && (
                                        <div className="mt-1">
                                            <span className="text-xs text-muted-foreground">{event.title}</span>
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <DayPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                date={selectedDate}
                onSave={handleSaveEvent}
                existingEvent={selectedDate ? getEventForDate(selectedDate) : undefined}
            />
        </div>
    )
}

