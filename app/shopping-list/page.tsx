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
import { cn } from '@/lib/utils'
import ShoppinglistSkeleton from './loading'

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
    portions: number; // Added portions field
}

export default function ShoppingListPage() {
    const [weekOffset, setWeekOffset] = useState(0)
    const weekDates = getWeekDates(weekOffset)
    const startDate = formatDate(weekDates[0])
    const endDate = formatDate(weekDates[6])
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [openCollapsible, setOpenCollapsible] = useState<string | null>(null)

    useEffect(() => {
        async function fetchMeals() {
            setLoading(true) // Reset loading state on week change
            try {
                const response = await fetch(`/api/meals/date-range?startDate=${startDate}&endDate=${endDate}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch meals')
                }
                const data: Meal[] = await response.json()
                //await delay(2000)
                setMeals(data)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false)
            }
        }
        fetchMeals()
    }, [weekOffset, startDate, endDate])

    if (loading) return <ShoppinglistSkeleton />
    if (error) return <div>Error: {error}</div>

    // Aggregate ingredients directly from fetched meals, considering portions
    const weeklyIngredients = meals.reduce((acc, meal) => {
        meal.recipe.ingredients.forEach((ri) => {
            const key = ri.ingredient.name
            if (!acc[key]) {
                acc[key] = { amount: 0, unit: ri.unit }
            }
            acc[key].amount += ri.amount * meal.portions // Multiply by portions
        })
        return acc
    }, {} as Record<string, { amount: number; unit: string }>)

    // Group meals by date
    const mealsByDate = meals.reduce((acc: Record<string, Meal[]>, meal: Meal) => {
        const date = formatDate(new Date(meal.date))
        if (!acc[date]) acc[date] = []
        acc[date].push(meal)
        return acc
    }, {})

    const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

    return (
        <div className="container mx-auto max-w-3xl">
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
                                    className={cn(
                                        "w-full min-h-[60px] flex flex-col gap-1",
                                        dayMeals.length > 0 ? "bg-primary hover:bg-primary/80" : ""
                                    )}
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
                                                        <h4 className="font-medium">{meal.recipe.title} x{meal.portions}</h4> {/* Display portions */}
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
                    {Object.keys(weeklyIngredients).length > 0 ? (
                        <ul className="space-y-2">
                            {Object.entries(weeklyIngredients).map(([name, { amount, unit }]) => (
                                <li key={name} className="flex items-center gap-2">
                                    <span>•</span>
                                    <span className='text-wrap truncate'>{name.length > 20 ? `${name.substring(0, 30)}...` : name}</span>
                                    <span className="text-muted-foreground">
                                        [{amount} {unit}]
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No meals planned for this week</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

