
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { cache } from 'react';
import RecipeDetailClient from '../RecipeDetailClient';
interface RecipeDetailProps {
    params: Promise<{ id: string }>;
}

const fetchRecipe = cache(async (id: string) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id },
        include: {
            creator: true,
            ingredients: {
                include: { ingredient: true }
            }
        }
    });

    return recipe;
});

export default async function RecipeDetailPage({ params }: RecipeDetailProps) {
    const { id } = await params;
    const recipe = await fetchRecipe(id);

    if (!recipe) {
        return notFound();
    }

    return <RecipeDetailClient recipe={recipe} />;
}
