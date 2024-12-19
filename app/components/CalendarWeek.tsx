import React from 'react';
import { CalendarEvent } from './Calendar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface WeeklyViewProps {
    currentMonth: Date;
    handleDateSelect: (date: Date) => void;
    getEventForDate: (date: Date) => CalendarEvent | undefined;
    previousWeek: () => void;
    nextWeek: () => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ currentMonth, handleDateSelect, getEventForDate, previousWeek, nextWeek }) => {
    const startOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    };

    const getWeekDays = (startDate: Date) => {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            week.push(date);
        }
        return week;
    };

    const startDate = startOfWeek(new Date(currentMonth));
    const weekDays = getWeekDays(startDate);

    return (
        <div>
            <div className="flex justify-center items-center gap-2 mb-4">
                <Button onClick={previousWeek} variant={'ghost'} className="btn items-center">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Week
                </Button>
                <span className="text-lg font-semibold">
                    {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}
                </span>
                <Button onClick={nextWeek} variant={'ghost'} className="btn items-center">
                    Next Week
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid lg:grid-cols-7 gap-px bg-muted sm:grid-cols-1 ">
                {weekDays.map((date, index) => {
                    const event = getEventForDate(date);
                    return (
                        <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={cn(
                                "p-3 bg-card hover:bg-accent/5 transition-colors relative h-24 text-left",
                                "focus:outline-none focus:ring-1 focus:ring-ring ",
                                event && "bg-accent"
                            )}
                        >
                            <span className="absolute top-2 left-2 text-xs text-muted-foreground">{date.toLocaleDateString('default', { weekday: 'short', day: 'numeric' })}</span>
                            {event && (
                                <div className="mt-1">
                                    <span className="text-sm text-primary">{event.title} x{event.portionSize}</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyView;