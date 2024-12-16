'use server'

import prisma from '@/prisma/client'

export async function getMealsForWeek(startDate: Date, endDate: Date) {
    const meals = await prisma.meal.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate
            }
        },
        include: {
            recipe: {
                include: {
                    ingredients: {
                        include: {
                            ingredient: true
                        }
                    }
                }
            }
        }
    })

    return meals
}

// Mock data for development
const mockMeals = [
    {
        id: '1',
        date: new Date('2024-12-16'),
        recipe: {
            id: '1',
            title: 'Spaghetti Carbonara',
            ingredients: [
                {
                    amount: 500,
                    unit: 'g',
                    ingredient: { id: '1', name: 'Spaghetti' }
                },
                {
                    amount: 200,
                    unit: 'g',
                    ingredient: { id: '2', name: 'Pancetta' }
                }
            ]
        }
    },
    {
        id: '2',
        date: new Date('2024-12-17'),
        recipe: {
            id: '2',
            title: 'Caesar Salad',
            ingredients: [
                {
                    amount: 1,
                    unit: 'head',
                    ingredient: { id: '3', name: 'Romaine Lettuce' }
                },
                {
                    amount: 100,
                    unit: 'g',
                    ingredient: { id: '4', name: 'Parmesan' }
                }
            ]
        }
    }
]

export async function getMockMealsForWeek() {
    return mockMeals
}

