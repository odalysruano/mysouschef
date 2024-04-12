const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    apiID: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    quantity: {
        type: String, 
        required: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
