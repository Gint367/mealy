import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function RecipeActions() {
    return (
        <Flex className="mb-2" justify={"between"}>
            <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create new Recipe
            </Button>
        </Flex>
    )
}

export default RecipeActions