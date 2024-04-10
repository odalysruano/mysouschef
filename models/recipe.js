const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredientSchema = require('./ingredient');

const recipeSchema = new Schema({
    name: {
        type: String, 
        required: true 
    },
    servings: {
        type: String, 
        required: true
    },
    ingredients: [ingredientSchema.schema],    
    instructions: {
        type: String, 
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);
