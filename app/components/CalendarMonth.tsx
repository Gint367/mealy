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
        <div className="grid grid-cols-7 gap-px bg-muted">
            {weekDays.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium bg-background">
                    {day}
                </div>
            ))}
            {Array.from({ length: startingDay }).map((_, index) => (
                <div key={`empty-${index}`} className="p-3 bg-muted/50" />
            ))}
            {days.map((day) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const event = getEventForDate(date);
                return (
                    <button
                        key={day}
                        onClick={() => handleDateSelect(date)}
                        className={cn(
                            "p-3 bg-card transition-colors relative h-24 text-left",

                            event && "bg-primary hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-ring"
                        )}
                    >
                        <span className="text-xs text-muted-foreground">{day}</span>
                        {event && (
                            <div className="mt-1">
                                <span className="text-sm truncate">{event.title} x{event.portionSize}</span>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default MonthlyView;