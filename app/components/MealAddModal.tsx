'use client';;
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface MealAddModalProps {
    isOpen: boolean
    onClose: () => void
    onDateSelect: (date: Date) => void
    onConfirm: (date: Date) => void // New prop
}

export function MealAddModal({ isOpen, onClose, onDateSelect, onConfirm }: MealAddModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date)
    }

    const handleConfirm = () => {
        if (selectedDate) {
            onDateSelect(selectedDate)
            onConfirm(selectedDate) // Call the new prop function
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription>
                        Select a date for your meal plan.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateSelect}
                        inline

                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

