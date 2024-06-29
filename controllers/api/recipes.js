const Ingredient = require('../../models/ingredient');
const User = require('../../models/user');
const Recipe = require('../../models/recipe');

module.exports = {
    addRecipe,
    showRecipes,
    getRecipe,
    removeRecipe,
}

async function addRecipe(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email });
        const ingredients = req.body.ingredients.map(ingredient => {
            return new Ingredient({
                name: ingredient.name,
                apiID: ingredient.id,
            });
        });
        const newRecipe = new Recipe({
            name: req.body.name,
            servings: req.body.servings,
            ingredients: ingredients,
            instructions: req.body.instructions,
            author: user._id,
        });
        await newRecipe.save();
        res.status(200).json("OK");
    }   catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

async function showRecipes(req, res) {
    try {
        const recipes = await Recipe.find({});
        const updatedRecipes = await Promise.all(recipes.map(async recipe => {
            const author = await User.findById(recipe.author);
            return {
                ...recipe._doc,
                authorUsername: author.username ? author.username : author.name,
            }
        }));
        res.json(updatedRecipes);
    }   catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

async function getRecipe(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id).lean();
        const user = await User.findOne({ email: req.user.email });
        const author = await User.findById(recipe.author);
        res.json({
            ...recipe,
            authorUsername: author.username ? author.username : author.name,
            ownedByUser: user._id.toString() === recipe.author.toString(),
        });
    }   catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

async function removeRecipe(req, res) {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json("OK");
    }   catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}
