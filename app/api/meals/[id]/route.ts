import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { patchMealSchema } from '@/lib/validationSchema';

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await the params as TypeScript expects them to be a Promise
    const { id } = await context.params;

    try {
        const body = await req.json();
        const validation = patchMealSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const updatedMeal = await prisma.meal.update({
            where: { id },
            data: {
                portions: validation.data.portions,
            },
        });

        return NextResponse.json(updatedMeal);
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json({ error: 'Failed to update meal' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Await the params as TypeScript expects them to be a Promise
    const { id } = await context.params;

    try {
        const meal = await prisma.meal.findUnique({
            where: { id },
        });

        if (!meal) {
            return NextResponse.json({ error: 'Meal not found' }, { status: 404 });
        }

        await prisma.meal.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete meal' }, { status: 500 });
    }
}