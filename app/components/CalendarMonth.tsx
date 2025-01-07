import React from 'react';
import { CalendarEvent } from './Calendar';
import { cn } from '@/lib/utils';

interface MonthlyViewProps {
    days: number[];
    weekDays: string[];
    startingDay: number;
    handleDateSelect: (date: Date) => void;
    getEventForDate: (date: Date) => CalendarEvent | undefined;
    currentMonth: Date;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ days, weekDays, startingDay, handleDateSelect, getEventForDate, currentMonth }) => {
    return (
        <div className="grid grid-cols-7 gap-0.5 sm:gap-0 bg-muted/50">
            {weekDays.map((day) => (
                <div key={day} className="p-3 items-center text-center text-sm font-medium bg-background">
                    {day}
                </div>
            ))}
            {Array.from({ length: startingDay }).map((_, index) => (
                <div key={`empty-${index}`} className="" />
            ))}
            {days.map((day) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const event = getEventForDate(date);
                return (
                    <div
                        key={day}
                        onClick={() => handleDateSelect(date)}
                        className={cn(
                            "p-1 sm:p-3 bg-card transition-colors relative h-20 sm:h-24 text-left",

                            event && "bg-primary hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-ring"
                        )}
                    >
                        <span className="text-xs sm:text-sm text-muted-foreground">{day}</span>
                        {event && (
                            <div className="mt-1">
                                <span className="text-xs sm:text-sm truncate hidden sm:block font-semibold">{event.portionSize}x {event.title}</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MonthlyView;