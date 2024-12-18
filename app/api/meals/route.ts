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

        const newMeal = await prisma.meal.create({
            data: {
                date: new Date(date),
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