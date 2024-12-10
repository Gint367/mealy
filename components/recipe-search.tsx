'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


interface Recipe {
  id: string
  name: string
}

export default function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes] = useState<Recipe[]>([
    { id: '1', name: 'Spaghetti Bolognese' },
    { id: '2', name: 'Chicken Curry' },
    { id: '3', name: 'Beef Stroganoff' },
    { id: '4', name: 'Vegetable Stir Fry' },
    { id: '5', name: 'Fish Tacos' }
  ])

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <div>

      <main className="max-w-md mx-auto p-6 space-y-4">
        <div className="space-y-2">
          <Input
            type="search"
            placeholder="Search recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Link href="/recipes/new">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create new Recipe
            </Button>
          </Link>
        </div>

        <div className="space-y-2">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              {recipe.name}
            </Link>
          ))}
          {recipes.length === 0 && (
            <p className="text-muted-foreground text-center p-3">
              No recipes available. Try adding some!
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

