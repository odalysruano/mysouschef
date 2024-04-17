import sendRequest from './send-request';
const BASE_URL = '/api/recipes';

export function addRecipe(recipe) {
    return sendRequest(`${BASE_URL}`, 'POST', {
        name: recipe.name,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
    });
}

export function showRecipes() {
    return sendRequest(`${BASE_URL}`, 'GET');
}

export function removeRecipe(recipeID) {
    return sendRequest(`${BASE_URL}/${recipeID}`, 'DELETE');
}

export function getRecipe(recipeID) {
    return sendRequest(`${BASE_URL}/${recipeID}`, 'GET');
}
