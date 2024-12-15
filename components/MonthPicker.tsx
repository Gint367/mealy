import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MonthPickerProps {
    currentDate: Date
    onSelect: (month: number) => void
}

export function MonthPicker({ currentDate, onSelect }: MonthPickerProps) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    return (
        <div className="grid grid-cols-3 gap-2" role="listbox" aria-label="Select a month">
            {months.map((month, index) => (
                <Button
                    key={month}
                    variant="ghost"
                    className={cn(
                        "text-sm",
                        index === currentDate.getMonth() && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => onSelect(index)}
                    role="option"
                    aria-selected={index === currentDate.getMonth()}
                >
                    {month.slice(0, 3)}
                </Button>
            ))}
        </div>
    )
}

