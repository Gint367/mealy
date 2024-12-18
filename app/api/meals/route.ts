/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions"; // Adjust the import path based on your setup

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const meals = await prisma.meal.findMany({
            where: {
                userId: session.user.id
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
        return NextResponse.json(meals)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { date, recipeId, portions } = await req.json()

        if (!date || !recipeId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Normalize the date to the start of the day
        const normalizedDate = new Date(date)
        normalizedDate.setHours(0, 0, 0, 0)

        // Check if a meal already exists for the user on the specified date
        const existingMeal = await prisma.meal.findFirst({
            where: {
                userId: session.user.id,
                date: normalizedDate,
                recipeId: recipeId
            }
        })

        if (existingMeal) {
            return NextResponse.json({ error: 'Meal already exists for this date' }, { status: 400 })
        }

        const newMeal = await prisma.meal.create({
            data: {
                date: normalizedDate,
                recipeId: recipeId,
                userId: session.user.id, // Ensure userId is set from session
                portions: portions || 1
            }
        })

        return NextResponse.json(newMeal, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add meal' }, { status: 500 })
    }
}
