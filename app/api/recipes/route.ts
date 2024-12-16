import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient();

interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}
const recipeSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    ingredients: z.array(
        z.object({
            name: z.string().min(1, 'Ingredient name is required'),
            amount: z.coerce.number().min(0.01, 'Amount must be a positive number'),
            unit: z.string().min(1, 'Unit is required'),
        })
    ).min(1, 'At least one ingredient is required'),
});

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log(body);
    const validation = recipeSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { title, description, ingredients } = body;
    const newRecipe = await prisma.recipe.create({
        data: {
            title,
            description,
            creatorId: session.user.id,
            ingredients: {
                create: ingredients.map((ingredient: Ingredient) => ({
                    ingredient: {
                        connectOrCreate: {
                            where: { name: ingredient.name },
                            create: { name: ingredient.name },
                        },
                    },
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                })),
            },
        },
    });

    return NextResponse.json(newRecipe, { status: 201 });
}
