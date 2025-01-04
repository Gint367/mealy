'use client';;
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import PortionSizeControl from "./PortionSizeControl";
import toast, { Toaster } from 'react-hot-toast';


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
    if (meal.portionSize === undefined) {
        meal.portionSize = 1;
    }
    const [newPortionSize, setNewPortionSize] = useState<number>(meal.portionSize);
    //console.log("portion size", meal.portionSize);

    const handleApplyChanges = async () => {
        if (!meal.id) {
            toast.error('Meal ID is undefined');
            return;
        }
        try {
            const response = await fetch(`/api/meals/${meal.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ portions: newPortionSize }), // Update field name to 'portions'
            });
            if (response.ok) {
                onUpdatePortionSize(meal.id, newPortionSize);
                toast.success('Meal updated successfully');
                onClose();
            } else {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    console.log(errorData);
                    toast.error(`Update failed`);
                } catch {
                    console.log(errorText);
                    toast.error(`Update failed`);
                }
            }
        } catch (error) {

            toast.error(`Failed to update meal portion size: ${error}`);
        }
    };

    const handleDelete = async () => {
        if (!meal.id) {
            toast.error('Meal ID is undefined');
            return;
        }
        try {
            const response = await fetch(`/api/meals/${meal.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onDelete(meal.id);
                toast.success('Meal deleted successfully');
                onClose();
            } else {
                const errorData = await response.json();
                toast.error(`Delete failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Failed to delete meal', error);
            toast.error('Failed to delete meal');
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                        <DialogTitle>Edit Meal: {meal.title}</DialogTitle>
                        <DialogDescription id="meal-edit-description">
                            Adjust the portion size or remove this meal.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <h4 className="mb-2 text-sm font-medium">Portion Size:</h4>
                        <PortionSizeControl
                            initialSize={meal.portionSize}
                            onChange={setNewPortionSize}
                        />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
                        <Button variant="destructive" onClick={handleDelete} className="mb-2 sm:mb-0">
                            Delete Meal
                        </Button>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <Button variant="outline" onClick={onClose} className="mb-2 sm:mb-0 sm:mr-2">
                                Cancel
                            </Button>
                            <Button onClick={handleApplyChanges}>
                                Apply Changes
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Toaster />
        </>
    )
}

