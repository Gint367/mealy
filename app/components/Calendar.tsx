"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MonthPicker } from "@/components/MonthPicker";
import { YearPicker } from "@/components/YearPicker";
import { MealEditPopup } from './MealEditPopup';

interface CalendarEvent {
    id: string
    date: Date
    title: string
    portionSize: number
}

export function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
    const monthPickerRef = useRef<HTMLDivElement>(null);
    const yearPickerRef = useRef<HTMLDivElement>(null);
    const [selectedMeal, setSelectedMeal] = useState<CalendarEvent | null>(null);

    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch('/api/meals')
                if (!response.ok) {
                    throw new Error('Failed to fetch meals')
                }
                const data = await response.json()
                const calendarEvents = data.map((meal: any) => ({
                    date: new Date(meal.date),
                    title: meal.recipe.title
                }))
                setEvents(calendarEvents)
            } catch (err) {
                console.error(err)
            }
        }
        fetchMeals()
    }, [])

    // This part of the code is responsible for closing the month and year picker when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isMonthPickerOpen &&
                monthPickerRef.current &&
                !monthPickerRef.current.contains(event.target as Node)) {
                setIsMonthPickerOpen(false);
            }
            if (isYearPickerOpen &&
                yearPickerRef.current &&
                !yearPickerRef.current.contains(event.target as Node)) {
                setIsYearPickerOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMonthPickerOpen, isYearPickerOpen]);

    const handleDateSelect = (date: Date) => {
        const event = getEventForDate(date);
        if (event) {
            setSelectedMeal(event);
            setIsPopupOpen(true);
        }
    }

    const handleDateChange = (year: number | null, month: number | null) => {
        const newYear = year ?? currentMonth.getFullYear()
        const newMonth = month ?? currentMonth.getMonth()
        setCurrentMonth(new Date(newYear, newMonth, 1))
        setIsMonthPickerOpen(false)
        setIsYearPickerOpen(false)
    }
    const handleMonthSelect = (month: number) => handleDateChange(null, month)
    const handleYearSelect = (year: number) => handleDateChange(year, null)

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = (firstDay.getDay() + 6) % 7 // Adjust to start from Monday
        return { daysInMonth, startingDay }
    }

    const getEventForDate = (date: Date) => {
        return events.find(event =>
            event.date.toDateString() === date.toDateString()
        )
    }

    const handleUpdatePortionSize = (id: string, newSize: number) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, portionSize: newSize } : event
        ));
    };

    const handleDeleteMeal = (id: string) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }


    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
        <div className="relative mx-auto p-4 w-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Button variant="ghost" size="icon" onClick={previousMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex gap-2">
                            <h2
                                className="text-xl font-semibold text-foreground cursor-pointer"
                                onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
                            >
                                {currentMonth.toLocaleString('default', { month: 'long' })}
                            </h2>
                            <h2
                                className="text-xl font-semibold text-foreground cursor-pointer"
                                onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
                            >
                                {currentMonth.getFullYear()}
                            </h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    {isMonthPickerOpen && (
                        <div ref={monthPickerRef} className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-popover p-4 rounded-md shadow-md">
                            <MonthPicker
                                currentDate={currentMonth}
                                onSelect={handleMonthSelect}
                            />
                        </div>
                    )}
                    {isYearPickerOpen && (
                        <div ref={yearPickerRef} className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-popover p-4 rounded-md shadow-md">
                            <YearPicker
                                currentDate={currentMonth}
                                onSelect={handleYearSelect}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-7 gap-px bg-muted">
                        {weekDays.map((day) => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-foreground bg-background">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: startingDay }).map((_, index) => (
                            <div key={`empty-${index}`} className="p-3 bg-muted/50" />
                        ))}
                        {days.map((day) => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                            const event = getEventForDate(date)
                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateSelect(date)}
                                    className={cn(
                                        "p-3 bg-card hover:bg-accent transition-colors relative h-24 text-left",
                                        "focus:outline-none focus:ring-1 focus:ring-ring ",
                                        event && "bg-accent/50"
                                    )}
                                >
                                    <span className="text-sm font-medium text-foreground">{day}</span>
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
            {selectedMeal && (
                <MealEditPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    meal={selectedMeal}
                    onDelete={handleDeleteMeal}
                    onUpdatePortionSize={handleUpdatePortionSize}
                />
            )}
        </div>
    )
}

