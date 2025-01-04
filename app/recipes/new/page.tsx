'use client';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import toast, { Toaster } from 'react-hot-toast';
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const UNIT_OPTIONS = [
    { label: 'Milligrams', value: 'milligrams' },
    { label: 'Grams', value: 'grams' },
    { label: 'Kilograms', value: 'kilograms' },
    { label: 'Milliliters', value: 'milliliters' },
    { label: 'Liters', value: 'liters' },
    { label: 'Cups', value: 'cups' },
    { label: 'Teaspoons', value: 'teaspoons' },
    { label: 'Tablespoons', value: 'tablespoons' },
    { label: 'Pieces', value: 'pieces' },
    { label: 'Slices', value: 'slices' },
    { label: 'Cloves', value: 'cloves' },
    { label: 'Packages', value: 'packages' },
    { label: 'Cans', value: 'cans' },
    { label: 'Bottles', value: 'bottles' },
    { label: 'Pinches', value: 'pinches' },
];


const recipeSchema = z.object({
    title: z.string()
        .trim()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters'),

    description: z.string()
        .trim()
        .min(1, 'Description is required'),
    // .max(1000, 'Description must be less than 1000 characters'),

    ingredients: z.array(
        z.object({
            name: z.string()
                .trim()
                .min(1, 'Ingredient name is required'),

            amount: z.preprocess((val) => Number(val), z.number()
                .min(0.01, 'Amount must be a positive number')
                .refine((val) => Number.isFinite(val), { message: 'Amount must be a valid number' })),

            unit: z.enum(
                UNIT_OPTIONS.map(option => option.value) as [string, ...string[]],
                {
                    errorMap: () => ({ message: 'Select a valid unit from the list' }),
                }
            ),
        })
    )
        .min(1, 'At least one ingredient is required')
        .refine((ingredients) => {
            const names = ingredients.map(ing => ing.name.toLowerCase());
            if (names.length !== new Set(names).size) {
                toast.error("Duplicate ingredients detected!");
                //console.log("Duplicate ingredients detected!");
                return false;
            }
            return true;
        }, { message: 'Ingredient names must be unique' }),
});
type RecipeFormValues = z.infer<typeof recipeSchema>


const NewRecipe = () => {

    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: [{ name: '', amount: 1, unit: 'grams' }],
        },
    })


    /* const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        } as SimpleMDEReactProps;
    }, []); */

    const onSubmit = async (data: RecipeFormValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            router.push('/recipes');
        } catch (err) {
            setError((err as Error).message);
            toast.error(`An error occurred while creating the recipe: ${(err as Error).message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onDeleteIngredient = (index: number) => {
        form.setValue('ingredients', form.watch('ingredients').filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Create New Recipe</h1>
            <div className='max-w-xl space-y-3'>
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input className='' placeholder="Recipe title" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm text-muted-foreground" />
                                </FormItem>
                            )}
                        />

                        <FormItem className='flex flex-col'>
                            <FormLabel>Cooking Instruction</FormLabel>
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field }) => <SimpleMdeReact placeholder="To cook this I need to..." {...field} />}
                            />
                            <FormMessage className="text-sm text-muted-foreground" />
                        </FormItem>

                        {form.watch('ingredients').map((_, index) => (
                            <div key={index} className="flex space-x-4 items-start">
                                <FormField
                                    control={form.control}
                                    name={`ingredients.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1 w-full min-w-32">
                                            <FormLabel className='truncate'>Ingredient {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input className='' placeholder="Ingredient name" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-muted-foreground" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`ingredients.${index}.amount`}
                                    render={({ field }) => (
                                        <FormItem className="w-24">
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.5" className='' placeholder="Quantity" {...field} inputMode='decimal' />
                                            </FormControl>
                                            <FormMessage className="text-sm text-muted-foreground" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`ingredients.${index}.unit`}
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>Unit</FormLabel>
                                                <FormControl>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="flex text-left px-4 py-2 md:w-full border rounded">
                                                            {field.value
                                                                ? UNIT_OPTIONS.find((unit) => unit.value === field.value)?.label
                                                                : 'Select unit'}
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>Select a Unit</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            {UNIT_OPTIONS.map((unit) => (
                                                                <DropdownMenuItem
                                                                    key={unit.value}
                                                                    onSelect={() => field.onChange(unit.value)}
                                                                >
                                                                    {unit.label}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </FormControl>
                                                <FormMessage className="text-sm text-muted-foreground" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="self-end mb-1"
                                        onClick={() => onDeleteIngredient(index)}
                                    >
                                        Delete
                                    </Button>
                                </div>

                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                form.setValue('ingredients', [...form.watch('ingredients'), { name: '', amount: 1, unit: 'grams' }]);
                                setTimeout(() => {
                                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                }, 0);
                            }}
                        >
                            Add Ingredient
                        </Button>

                        <Button type="submit" className="flex items-center">
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create Recipe'}

                        </Button>
                    </form>
                </Form>
            </div>
        </div >
    );
};

export default NewRecipe;