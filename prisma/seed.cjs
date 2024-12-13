"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var recipes = [
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, recipes_1, recipe, createdRecipe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, recipes_1 = recipes;
                    _a.label = 1;
                case 1:
                    if (!(_i < recipes_1.length)) return [3 /*break*/, 4];
                    recipe = recipes_1[_i];
                    return [4 /*yield*/, prisma.recipe.create({
                            data: {
                                title: recipe.title,
                                description: recipe.description,
                                creatorId: recipe.creatorId,
                                ingredients: {
                                    create: recipe.ingredients.map(function (ingredient) { return ({
                                        ingredient: {
                                            connectOrCreate: {
                                                where: { name: ingredient.name },
                                                create: { name: ingredient.name },
                                            },
                                        },
                                        amount: ingredient.amount,
                                        unit: ingredient.unit,
                                    }); }),
                                },
                            },
                        })];
                case 2:
                    createdRecipe = _a.sent();
                    console.log("Created recipe: ".concat(createdRecipe.title));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
