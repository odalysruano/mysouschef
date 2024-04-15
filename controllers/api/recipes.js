const User = require('../../models/user');
const Recipe = require('../../models/recipe');

module.exports = {
    addRecipe,
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
