"use client";;
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/MonthPicker";
import { YearPicker } from "@/components/YearPicker";
import { MealEditPopup } from './MealEditPopup';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth/react
import { Switch } from '@/components/ui/switch';
import MonthlyView from './CalendarMonth';
import WeeklyView from './CalendarWeek';

export interface CalendarEvent {
    id: string
    date: Date
    title: string
    portionSize: number
}
interface Meal {
    id: string;
    date: string;
    portions: number;
    recipe: {
        title: string;
    };
}

export function CustomCalendar(): JSX.Element {
    const { status } = useSession(); // Get the session status
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
    const monthPickerRef = useRef<HTMLDivElement>(null);
    const yearPickerRef = useRef<HTMLDivElement>(null);
    const [selectedMeal, setSelectedMeal] = useState<CalendarEvent | null>(null);

    const [isMonthlyView, setIsMonthlyView] = useState(true);
    const toggleView = () => setIsMonthlyView(!isMonthlyView);

    useEffect(() => {
        if (status === "authenticated") { // Only fetch meals if the user is authenticated
            async function fetchMeals() {
                try {
                    const response = await fetch('/api/meals')
                    if (!response.ok) {
                        throw new Error('Failed to fetch meals')
                    }
                    const data = await response.json()
                    const calendarEvents = data.map((meal: Meal) => ({
                        id: meal.id,
                        date: new Date(meal.date),
                        title: meal.recipe.title,
                        portionSize: meal.portions
                    }))
                    console.log(calendarEvents)
                    setEvents(calendarEvents)
                } catch (err) {
                    console.error(err)
                }
            }
            fetchMeals()
        }
    }, [status]) // Add status as a dependency

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

    const nextWeek = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() + 7));
    };

    const previousWeek = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() - 7));
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
        <div className="relative mx-auto p-4 w-full">
            <div className="flex justify-end mb-4">
                <span className="mr-2">Monthly View</span>
                <Switch checked={!isMonthlyView} onCheckedChange={toggleView} />
                <span className="ml-2">Weekly View</span>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        {isMonthlyView && (
                            <Button className='items-center' variant="ghost" onClick={previousMonth}>
                                <ChevronLeft className="h-4 w-4" />
                                Previous Month
                            </Button>
                        )}
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
                        {isMonthlyView && (
                            <Button className='items-center' variant="ghost" onClick={nextMonth}>
                                Next Month
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {isMonthlyView ? (
                        <MonthlyView
                            days={days}
                            weekDays={weekDays}
                            startingDay={startingDay}
                            handleDateSelect={handleDateSelect}
                            getEventForDate={getEventForDate}
                            currentMonth={currentMonth}
                        />
                    ) : (
                        <WeeklyView
                            currentMonth={currentMonth}
                            handleDateSelect={handleDateSelect}
                            getEventForDate={getEventForDate}
                            previousWeek={previousWeek}
                            nextWeek={nextWeek}
                        />
                    )}
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

