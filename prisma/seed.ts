import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const recipes = [
    // Paste the JSON data here (from your canvas content)

    {
        "title": "Spaghetti Bolognese",
        "description": "A classic Italian pasta dish with rich meat sauce.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Spaghetti", "amount": 200, "unit": "grams" },
            { "name": "Ground Beef", "amount": 300, "unit": "grams" },
            { "name": "Tomato Sauce", "amount": 400, "unit": "ml" },
            { "name": "Garlic", "amount": 2, "unit": "cloves" }
        ]
    },
    {
        "title": "Caesar Salad",
        "description": "Crisp lettuce with Caesar dressing, croutons, and Parmesan cheese.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Romaine Lettuce", "amount": 1, "unit": "head" },
            { "name": "Caesar Dressing", "amount": 100, "unit": "ml" },
            { "name": "Croutons", "amount": 50, "unit": "grams" },
            { "name": "Parmesan Cheese", "amount": 30, "unit": "grams" }
        ]
    },
    {
        "title": "Chicken Curry",
        "description": "A flavorful curry with tender chicken pieces.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Chicken Breast", "amount": 500, "unit": "grams" },
            { "name": "Curry Powder", "amount": 2, "unit": "tablespoons" },
            { "name": "Coconut Milk", "amount": 400, "unit": "ml" },
            { "name": "Onion", "amount": 1, "unit": "piece" }
        ]
    },
    {
        "title": "Pancakes",
        "description": "Fluffy pancakes perfect for breakfast.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Flour", "amount": 200, "unit": "grams" },
            { "name": "Milk", "amount": 300, "unit": "ml" },
            { "name": "Egg", "amount": 2, "unit": "pieces" },
            { "name": "Sugar", "amount": 2, "unit": "tablespoons" }
        ]
    },
    {
        "title": "Vegetable Stir Fry",
        "description": "A quick and healthy mix of fresh vegetables.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Broccoli", "amount": 150, "unit": "grams" },
            { "name": "Carrot", "amount": 100, "unit": "grams" },
            { "name": "Soy Sauce", "amount": 2, "unit": "tablespoons" },
            { "name": "Garlic", "amount": 1, "unit": "clove" }
        ]
    },
    {
        "title": "Beef Tacos",
        "description": "Mexican-style tacos with seasoned beef and toppings.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Taco Shells", "amount": 8, "unit": "pieces" },
            { "name": "Ground Beef", "amount": 300, "unit": "grams" },
            { "name": "Cheddar Cheese", "amount": 100, "unit": "grams" },
            { "name": "Salsa", "amount": 100, "unit": "ml" }
        ]
    },
    {
        "title": "Chocolate Chip Cookies",
        "description": "Delicious homemade cookies with chocolate chips.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Flour", "amount": 250, "unit": "grams" },
            { "name": "Butter", "amount": 125, "unit": "grams" },
            { "name": "Sugar", "amount": 100, "unit": "grams" },
            { "name": "Chocolate Chips", "amount": 150, "unit": "grams" }
        ]
    },
    {
        "title": "Tomato Soup",
        "description": "A creamy and comforting tomato soup.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Tomatoes", "amount": 500, "unit": "grams" },
            { "name": "Onion", "amount": 1, "unit": "piece" },
            { "name": "Garlic", "amount": 2, "unit": "cloves" },
            { "name": "Vegetable Stock", "amount": 500, "unit": "ml" }
        ]
    },
    {
        "title": "Margarita Pizza",
        "description": "A classic pizza with tomato sauce, mozzarella, and basil.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Pizza Dough", "amount": 1, "unit": "piece" },
            { "name": "Tomato Sauce", "amount": 100, "unit": "ml" },
            { "name": "Mozzarella Cheese", "amount": 150, "unit": "grams" },
            { "name": "Fresh Basil", "amount": 10, "unit": "leaves" }
        ]
    },
    {
        "title": "Omelette",
        "description": "A quick and versatile egg dish.",
        "creatorId": "cm4llue1m00005b9slzxiddpf",
        "ingredients": [
            { "name": "Egg", "amount": 3, "unit": "pieces" },
            { "name": "Milk", "amount": 50, "unit": "ml" },
            { "name": "Cheese", "amount": 50, "unit": "grams" },
            { "name": "Butter", "amount": 10, "unit": "grams" }
        ]
    }


];

async function main() {
    for (const recipe of recipes) {
        // Create the recipe
        const createdRecipe = await prisma.recipe.create({
            data: {
                title: recipe.title,
                description: recipe.description,
                creatorId: recipe.creatorId,
                ingredients: {
                    create: recipe.ingredients.map((ingredient) => ({
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
        console.log(`Created recipe: ${createdRecipe.title}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
