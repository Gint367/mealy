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