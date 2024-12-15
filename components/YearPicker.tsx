import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YearPickerProps {
    currentDate: Date
    onSelect: (year: number) => void
}

export function YearPicker({ currentDate, onSelect }: YearPickerProps) {
    const [viewYear, setViewYear] = useState(currentDate.getFullYear())

    const years = Array.from({ length: 12 }, (_, i) => viewYear - 5 + i)

    return (
        <div role="listbox" aria-label="Select a year">
            <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={() => setViewYear(viewYear - 12)} aria-label="Previous years">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{years[0]} - {years[years.length - 1]}</span>
                <Button variant="ghost" size="icon" onClick={() => setViewYear(viewYear + 12)} aria-label="Next years">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {years.map((year) => (
                    <Button
                        key={year}
                        variant="ghost"
                        className={cn(
                            "text-sm",
                            year === currentDate.getFullYear() && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => onSelect(year)}
                        role="option"
                        aria-selected={year === currentDate.getFullYear()}
                    >
                        {year}
                    </Button>
                ))}
            </div>
        </div>
    )
}

