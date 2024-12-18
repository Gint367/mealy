import { z } from 'zod';

export const patchMealSchema = z.object({
    recipeId: z.string().optional(),
    portions: z.number().int().optional(),
    date: z.preprocess((arg) => arg ? new Date(arg as string) : undefined, z.date().optional()),
});
