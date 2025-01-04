/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';;
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { MealAddModal } from "../components/MealAddModal";
import Markdown from "react-markdown";
import Image from "next/image";
import PortionSizeControl from "../components/PortionSizeControl";
import toast, { Toaster } from 'react-hot-toast';
import remarkGfm from 'remark-gfm';


interface RecipeDetailClientProps {
    recipe: {
        id: string; // Add id field
        title: string;
        description: string;
        ingredients: {
            ingredient: {
                name: string;
            };
            amount: number;
            unit: string;
        }[];
        creator: {
            name: string | null; // Allow null
        };
        createdAt: Date; // Use Date type
        updatedAt: Date; // Use Date type
        image?: string | null;
    };
}

export default function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [portionSize, setPortionSize] = useState<number>(1); // Add portion size state



    const handleAddToCalendar = () => {
        setIsModalOpen(true);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        // Further processing with the selected date
        console.log("Selected date:", date);
    };

    const handlePortionChange = (newSize: number) => { // Add handler for portion size change
        setPortionSize(newSize);
    };

    const addMeal = async (date: Date) => {
        try {
            const response = await fetch('/api/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: date.toISOString(), // Ensure date is in ISO format
                    recipeId: recipe.id,
                    portions: portionSize
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add meal');
            }

            const newMeal = await response.json();
            console.log('Meal added:', newMeal);
            toast.success('Meal added to calendar!');
            setIsModalOpen(false); // Close modal after successful addition
        } catch (error) {
            //console.error(error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Failed to add meal');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>

            <div className="grid md:grid-cols-2 gap-8 ">
                <div >
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {recipe.ingredients.map((recipeIngredient) => (
                            <li key={recipeIngredient.ingredient.name}>
                                {recipeIngredient.ingredient.name} - {recipeIngredient.amount * portionSize} {recipeIngredient.unit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Cooking Instructions</h2>
                    <Markdown className={'prose dark:prose-invert'} remarkPlugins={[remarkGfm]}>{recipe.description}</Markdown>
                </div>
            </div>

            <div className="my-8">
                <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                <p>Created by: {recipe.creator.name}</p>
                <p className="text-muted-foreground text-sm">Created at: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground text-sm">Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
            </div>

            {recipe.image && (
                <div className="mt-8">
                    <Image src={recipe.image} alt={recipe.title} className="rounded-lg max-w-full h-auto" />
                </div>
            )}

            <div className="container bg-background border-t p-4 flex flex-col sm:flex-row items-center justify-between w-full bottom-0">
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="text-lg font-semibold">Portion Size:</span>
                    <PortionSizeControl initialSize={portionSize} onChange={handlePortionChange} />
                </div>
                <Button
                    className="mt-4 sm:mt-0 text-primary-foreground bg-primary px-4 py-2 rounded hover:bg-primary/80 focus:outline-none focus:ring-2 focus:bg-primary/80 focus:ring-opacity-50"
                    onClick={handleAddToCalendar}>
                    Add to Calendar
                </Button>
            </div>

            <MealAddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDateSelect={handleDateSelect}
                onConfirm={addMeal} // Now addMeal doesn't need parameters
            />
            <Toaster />
        </div>
    );
}