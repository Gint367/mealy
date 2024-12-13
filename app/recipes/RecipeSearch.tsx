'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Recipe } from '@prisma/client'
import Link from 'next/link'


interface RecipeSearchProps {
    initialRecipes: Recipe[]
}

export default function RecipeSearch({ initialRecipes }: RecipeSearchProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [recipes, setRecipes] = useState(initialRecipes)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value
        setSearchTerm(term)

        const filteredRecipes = initialRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase())
            // || recipe.ingredients.toLowerCase().includes(term.toLowerCase())
        )
        setRecipes(filteredRecipes)
    }

    return (
        <div >
            <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 border border-primary/50"
            />
            {recipes.length > 0 ? (
                <Table>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow key={recipe.id} className="group">
                                <TableCell className="p-0">
                                    <Link
                                        href={`/recipes/${recipe.id}`}
                                        className="block p-4 transition-colors duration-200 ease-in-out hover:bg-primary/10 group-hover:text-primary"
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
    )
}

