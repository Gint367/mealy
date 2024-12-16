'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate, getWeekDates } from '../utils/date'

export default function ShoppingListPage() {
    const [weekOffset, setWeekOffset] = useState(0)
    const weekDates = getWeekDates(weekOffset)
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [openCollapsible, setOpenCollapsible] = useState<string | null>(null)

    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch('/api/shopping-list')
                if (!response.ok) {
                    throw new Error('Failed to fetch meals')
                }
                const data: Meal[] = await response.json()
                setMeals(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMeals()
    }, [weekOffset])

    if (loading) return <Loader2 className="animate-spin" />
    if (error) return <div>Error: {error}</div>


    // Group meals by date
    interface Ingredient {
        id: string;
        name: string;
    }

    interface RecipeIngredient {
        ingredient: Ingredient;
        amount: number;
        unit: string;
    }

    interface Recipe {
        id: string;
        title: string;
        ingredients: RecipeIngredient[];
    }

    interface Meal {
        id: string;
        date: Date;
        recipe: Recipe;
    }


    // Group meals by date
    const mealsByDate = meals.reduce((acc: Record<string, Meal[]>, meal: Meal) => {
        const date = formatDate(new Date(meal.date))
        if (!acc[date]) acc[date] = []
        acc[date].push(meal)
        return acc
    }, {})

    // Aggregate all ingredients for the week
    const weeklyIngredients = meals.reduce((acc, meal) => {
        meal.recipe.ingredients.forEach((ri) => {
            const key = ri.ingredient.name
            if (!acc[key]) {
                acc[key] = { amount: 0, unit: ri.unit }
            }
            acc[key].amount += ri.amount
        })
        return acc
    }, {} as Record<string, { amount: number; unit: string }>)

    const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setWeekOffset(weekOffset - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                    {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                </h2>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setWeekOffset(weekOffset + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-8">
                {dayNames.map((day, index) => {
                    const date = weekDates[index]
                    const dateStr = formatDate(date)
                    const dayMeals = mealsByDate[dateStr] || []

                    return (
                        <Collapsible key={dateStr} open={openCollapsible === dateStr} onOpenChange={() => setOpenCollapsible(openCollapsible === dateStr ? null : dateStr)}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full min-h-[60px] flex flex-col gap-1"
                                >
                                    <span>{day}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {date.getDate()}
                                    </span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="CollapsibleContent mt-2 w-full">
                                <Card>
                                    <CardContent className="p-3 w-full">
                                        {dayMeals.length > 0 ? (
                                            <ul className="space-y-2">
                                                {dayMeals.map((meal) => (
                                                    <li key={meal.id}>
                                                        <h4 className="font-medium">{meal.recipe.title}</h4>
                                                        <ul className="font-small text-muted-foreground">
                                                            {meal.recipe.ingredients.map((ri) => (
                                                                <li key={ri.ingredient.id}>
                                                                    {ri.ingredient.name} - {ri.amount} {ri.unit}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No meals planned</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </CollapsibleContent>
                        </Collapsible>
                    )
                })}
            </div>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Total shopping list (week):</h3>
                    <ul className="space-y-2">
                        {Object.entries(weeklyIngredients).map(([name, { amount, unit }]) => (
                            <li key={name} className="flex items-center gap-2">
                                <span>•</span>
                                <span>{name}</span>
                                <span className="text-muted-foreground">
                                    [{amount} {unit}]
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

