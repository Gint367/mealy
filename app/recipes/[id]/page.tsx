import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Markdown from 'react-markdown';
import { cache } from 'react';
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

    return (
        <div className="container mx-auto p-4 pb-24 min-h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>

            <div className="grid md:grid-cols-2 gap-8 flex-grow">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {recipe.ingredients.map((recipeIngredient) => (
                            <li key={recipeIngredient.ingredient.name}>
                                {recipeIngredient.ingredient.name} - {recipeIngredient.amount} {recipeIngredient.unit}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Cooking Instructions</h2>

                    <Markdown >{recipe.description}</Markdown>

                </div>
            </div>

            <div className="my-8">
                <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                <p>Created by: {recipe.creator.name}</p>
                <p className="text-muted-foreground text-sm">Created at: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground text-sm">Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
            </div>

            {recipe.image && (
                <div className="mt-8">
                    <Image src={recipe.image} alt={recipe.title} className="rounded-lg max-w-full h-auto" />
                </div>
            )}

            <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">Portion Size:</span>
                    {/* <PortionSizeControl initialSize={1} onChange={(newSize) => console.log(newSize)} /> */}
                </div>
                <Button className="ml-4">
                    Add to Calendar
                </Button>
            </div>
        </div>
    );
}