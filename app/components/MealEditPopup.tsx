'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import PortionSizeControl from "./PortionSizeControl"

interface MealEditPopupProps {
    isOpen: boolean
    onClose: () => void
    meal: {
        id: string
        title: string
        portionSize: number
    }
    onDelete: (id: string) => void
    onUpdatePortionSize: (id: string, newSize: number) => void
}

export function MealEditPopup({ isOpen, onClose, meal, onDelete, onUpdatePortionSize }: MealEditPopupProps) {
    const [newPortionSize, setNewPortionSize] = useState(meal.portionSize)

    const handleApplyChanges = async () => {
        try {
            await fetch(`/api/meals/${meal.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ portionSize: newPortionSize }),
            });
            onUpdatePortionSize(meal.id, newPortionSize);
            onClose();
        } catch (error) {
            console.error('Failed to update meal portion size', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`/api/meals/${meal.id}`, {
                method: 'DELETE',
            });
            onDelete(meal.id);
            onClose();
        } catch (error) {
            console.error('Failed to delete meal', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Meal: {meal.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <h4 className="mb-2 text-sm font-medium">Portion Size:</h4>
                    <PortionSizeControl
                        initialSize={meal.portionSize}
                        onChange={setNewPortionSize}
                    />
                </div>
                <DialogFooter className="sm:justify-between">
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete Meal
                    </Button>
                    <div>
                        <Button variant="outline" onClick={onClose} className="mr-2">
                            Cancel
                        </Button>
                        <Button onClick={handleApplyChanges}>
                            Apply Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

