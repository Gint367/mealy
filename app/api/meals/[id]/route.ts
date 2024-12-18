import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from "@/app/auth/authOptions"; // Adjust the import path based on your setup
import { patchMealSchema } from '@/lib/validationSchema';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await req.json()
        const validation = patchMealSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 })
        }

        const updatedMeal = await prisma.meal.update({
            where: { id: params.id },
            data: {
                portions: validation.data.portions,
            }
        })

        return NextResponse.json(updatedMeal)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update meal' }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await prisma.meal.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Meal deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 })
    }
}
