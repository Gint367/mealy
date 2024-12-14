'use client';
import { useCallback, useMemo, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { SimpleMDEReactProps } from 'react-simplemde-editor';
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const recipeSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    ingredients: z.array(
        z.object({
            name: z.string().min(1, 'Ingredient name is required'),
            amount: z.string().min(1, 'Qt is required'),
            unit: z.string().min(1, 'Unit is required'),
        })
    ).min(1, 'At least one ingredient is required'),
})

type RecipeFormValues = z.infer<typeof recipeSchema>


const NewRecipe = () => {

    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            ingredients: [{ name: '', amount: '', unit: '' }],
        },
    })

    const onSubmit = async (data: RecipeFormValues) => {
        setIsSubmitting(true)
        setError(null)

        try {
            // Here you would typically send the data to your API
            console.log('Submitting recipe:', { ...data, description: form.getValues('description') })
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            // Reset form after successful submission
            form.reset()

        } catch (err) {
            setError('An error occurred while submitting the recipe. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const onDeleteIngredient = (index: number) => {
        const ingredients = form.watch('ingredients');
        form.setValue('ingredients', ingredients.filter((_, i) => i !== index));
    };

    const [value, setValue] = useState("Start writing your recipe...");

    const onChange = useCallback((value: string) => {
        setValue(value);
    }, []);

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        } as SimpleMDEReactProps;
    }, []);

    return (
        <div className="container mx-auto p-4">
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
                                        <Input className='bg-background' placeholder="Recipe title" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm text-muted-foreground" />
                                </FormItem>
                            )}
                        />

                        <FormItem className='flex flex-col'>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <SimpleMdeReact
                                    options={autofocusNoSpellcheckerOptions}
                                    value={value}
                                    onChange={onChange}
                                />
                            </FormControl>
                            <FormMessage className="text-sm text-muted-foreground" />
                        </FormItem>

                        {form.watch('ingredients').map((_, index) => (
                            <div key={index} className="flex space-x-4 items-start">
                                <FormField
                                    control={form.control}
                                    name={`ingredients.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Ingredient {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input className='bg-background' placeholder="Ingredient name" {...field} />
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
                                                <Input className='bg-background' placeholder="Quantity" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-muted-foreground truncate" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`ingredients.${index}.unit`}
                                    render={({ field }) => (
                                        <FormItem className="w-24">
                                            <FormLabel>Unit</FormLabel>
                                            <FormControl>
                                                <Input className='bg-background' placeholder="Unit" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-muted-foreground" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="self-center"
                                    onClick={() => onDeleteIngredient(index)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.setValue('ingredients', [...form.watch('ingredients'), { name: '', amount: '', unit: '' }])}
                        >
                            Add Ingredient
                        </Button>

                        <Button type="submit" disabled={isSubmitting} className="flex items-center">
                            Create Recipe
                            {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                        </Button>
                    </form>
                </Form>
            </div>
        </div >
    );
};

export default NewRecipe;