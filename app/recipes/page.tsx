import RecipeSearch from "./RecipeSearch";
import RecipeActions from "./RecipeActions";
import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";


export default async function RecipesPage() {
    const recipes = await prisma.recipe.findMany({
        orderBy: {
            title: 'asc'
        }
    });
    //console.log(recipes)
    return (
        <Flex className="container mx-auto p-4" direction={"column"} gap={"4"} justify={'between'}>
            <h1 className="text-2xl font-bold mb-4">Recipe Management Page</h1>
            <RecipeActions />
            <RecipeSearch recipes={recipes} />
        </Flex>

    );
}
export const dynamic = 'force-dynamic'
