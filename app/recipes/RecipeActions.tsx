import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

function RecipeActions() {
    return (
        <Flex className="mb-2" justify={"between"}>
            <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                <Link href={'/recipes/new'}>
                    Create new Recipe
                </Link>
            </Button>
        </Flex>
    )
}

export default RecipeActions