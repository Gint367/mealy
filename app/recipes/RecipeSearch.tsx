'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody, TableCell, TableRow
} from "@/components/ui/table";
import { Recipe } from '@prisma/client';
import Link from 'next/link';

interface RecipeSearchProps {
    initialRecipes: Recipe[];
}

export default function RecipeSearch({ initialRecipes }: RecipeSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState(initialRecipes);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filteredRecipes = initialRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase())
        );
        setRecipes(filteredRecipes);
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 border border-primary/50 bg-primary-foreground"
            />
            {recipes.length > 0 ? (
                <Table>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow key={recipe.id} className="group">
                                <TableCell className="p-0">
                                    <Link
                                        href={`/recipes/${recipe.id}`}
                                        className="block p-4 my-1 transition-colors duration-200 ease-in-out bg-card hover:bg-primary/10 group-hover:text-primary border rounded-lg"
                                    >
                                        {recipe.title}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-center text-secondary-foreground">No recipes found matching your search.</p>
            )}
        </div>
    );
}