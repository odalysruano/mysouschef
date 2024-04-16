import { useState } from 'react';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as RecipeAPI from '../../utilities/recipes-api';

export default function AddToAllRecipes() {
    const [searchResults, setSearchResults] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '',
        servings: '',
        instructions: '',
        ingredients: [],
    });

    async function addRecipe() {
        await RecipeAPI.addRecipe(recipe);
    }

    function addIngredient(ingredient) {
        var ingredients = recipe.ingredients;
        ingredients.push(ingredient);
        setRecipe({...recipe, ingredients});
    }

    function removeIngredient(ingredient) {
        var ingredients = recipe.ingredients;
        const filtered = ingredients.filter(currentIngredient => ingredient !== currentIngredient);
        setRecipe({...recipe, ingredients: filtered});
    }

    function handleRecipeUpdate(evt) {
        setRecipe({ ...recipe, [evt.target.name]: evt.target.value });
    }

    return (
        <>
            <h1>Add a New Recipe</h1>
            <input 
                type="text"
                name="name"
                placeholder="Recipe Name" 
                value={recipe.name}
                onChange={handleRecipeUpdate}
            />
            <input 
                type="text"
                name="servings"
                placeholder="# of Servings" 
                value={recipe.servings}
                onChange={handleRecipeUpdate}
            />
            <input 
                type="text"
                name="instructions"
                placeholder="Instructions" 
                value={recipe.instructions}
                onChange={handleRecipeUpdate}
            />
            <button onClick={addRecipe}>Save Recipe</button>
            {recipe.ingredients.map((ingredient) => (
                <IngredientCard
                    addIngredient={addIngredient}
                    currentIngredients={recipe.ingredients}
                    ingredient={ingredient}
                    key={ingredient.id}
                    removeIngredient={removeIngredient}
                    showButton={true}
                />
            ))}
            <br></br>
            <IngredientsSearchBar setSearchResults={setSearchResults} />
            {searchResults.map((ingredient) => (
                <IngredientCard
                    addIngredient={addIngredient}
                    currentIngredients={recipe.ingredients}
                    ingredient={ingredient}
                    key={ingredient.id}
                    removeIngredient={removeIngredient}
                    showButton={true}
                />
            ))}
        </>
    );
}
