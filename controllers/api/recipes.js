const User = require('../../models/user');
const Recipe = require('../../models/recipe');

module.exports = {
    addRecipe,
    showRecipes,
    removeRecipe,
}

async function addRecipe(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email });
        const newRecipe = new Recipe({
            name: req.body.name,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
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
        res.json(recipes);
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
