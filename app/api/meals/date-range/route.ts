/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Validate presence of dates
    if (!startDate || !endDate) {
        return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 })
    }

    // Validate date formats
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    // Check date order
    if (start > end) {
        return NextResponse.json({ error: 'startDate must be before endDate' }, { status: 400 })
    }

    // Limit maximum date range (e.g., 1 year)
    const maxRange = 365 * 24 * 60 * 60 * 1000 // 1 year in milliseconds
    if ((end.getTime() - start.getTime()) > maxRange) {
        return NextResponse.json({ error: 'Date range exceeds the maximum allowed limit of 1 year' }, { status: 400 })
    }

    try {
        const meals = await prisma.meal.findMany({
            where: {
                userId: session.user.id,
                date: {
                    gte: start,
                    lte: end
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
        return NextResponse.json(meals)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 })
    }
}