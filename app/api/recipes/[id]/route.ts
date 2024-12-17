import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: String(id) },
            include: {
                creator: true,
                ingredients: {
                    include: { ingredient: true }
                }
            }
        });

        if (!recipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(recipe, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}