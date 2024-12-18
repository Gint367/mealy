"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MonthPicker } from "@/components/MonthPicker";
import { YearPicker } from "@/components/YearPicker";
import { MealEditPopup } from './MealEditPopup';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth/react

interface CalendarEvent {
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
/**
 * Calendar component that displays a monthly calendar view with events.
 * 
 * This component fetches meal events for authenticated users and displays them on the calendar.
 * Users can navigate between months, select dates to view meal details, and update or delete meals.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered Calendar component.
 * 
 * @example
 * <Calendar />
 * 
 * @remarks
 * - The component uses the `useSession` hook to check the authentication status.
 * - The `useEffect` hook is used to fetch meals when the user is authenticated.
 * - The component includes month and year pickers for date navigation.
 * - Clicking outside the month or year picker closes them.
 * - The calendar highlights days with events and allows users to select a date to view meal details.
 * 
 * @function
 * @name Calendar
 * 
 * @typedef {Object} CalendarEvent
 * @property {Date} date - The date of the event.
 * @property {string} title - The title of the event.
 * 
 * @typedef {Object} Meal
 * @property {string} id - The unique identifier of the meal.
 * @property {Date} date - The date of the meal.
 * @property {Object} recipe - The recipe details of the meal.
 * @property {string} recipe.title - The title of the recipe.
 * 
 * @hook
 * @name useSession
 * @returns {Object} The session status.
 * 
 * @hook
 * @name useState
 * @param {any} initialState - The initial state value.
 * @returns {Array} The state and the state updater function.
 * 
 * @hook
 * @name useEffect
 * @param {Function} effect - The effect function to run.
 * @param {Array} dependencies - The list of dependencies for the effect.
 * 
 * @hook
 * @name useRef
 * @param {any} initialValue - The initial value for the ref.
 * @returns {Object} The ref object.
 * 
 * @function
 * @name handleDateSelect
 * @param {Date} date - The selected date.
 * 
 * @function
 * @name handleDateChange
 * @param {number | null} year - The selected year.
 * @param {number | null} month - The selected month.
 * 
 * @function
 * @name handleMonthSelect
 * @param {number} month - The selected month.
 * 
 * @function
 * @name handleYearSelect
 * @param {number} year - The selected year.
 * 
 * @function
 * @name getDaysInMonth
 * @param {Date} date - The date to get the days in the month for.
 * @returns {Object} An object containing the number of days in the month and the starting day of the week.
 * 
 * @function
 * @name getEventForDate
 * @param {Date} date - The date to get the event for.
 * @returns {CalendarEvent | undefined} The event for the specified date, or undefined if no event exists.
 * 
 * @function
 * @name handleUpdatePortionSize
 * @param {string} id - The ID of the meal to update.
 * @param {number} newSize - The new portion size.
 * 
 * @function
 * @name handleDeleteMeal
 * @param {string} id - The ID of the meal to delete.
 * 
 * @function
 * @name nextMonth
 * 
 * @function
 * @name previousMonth
 */
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
                                        "p-3 bg-card hover:bg-accent/5 transition-colors relative h-24 text-left",
                                        "focus:outline-none focus:ring-1 focus:ring-ring ",
                                        event && "bg-accent"
                                    )}
                                >
                                    <span className="text-xs text-muted-foreground">{day}</span>
                                    {event && (
                                        <div className="mt-1">
                                            <span className="text-sm text-primary">{event.title} x{event.portionSize}</span>
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

