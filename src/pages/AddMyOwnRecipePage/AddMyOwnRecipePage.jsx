import { useState } from 'react';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as RecipeAPI from '../../utilities/recipes-api';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

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
        <Container>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <h1>Add a New Recipe</h1>
                </Grid>
                <Grid container xs={12} md={6}>
                    <Grid item xs={12} md={12}>
                        <input 
                            type="text"
                            name="name"
                            placeholder="Recipe Name" 
                            value={recipe.name}
                            onChange={handleRecipeUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <input 
                            type="text"
                            name="servings"
                            placeholder="# of Servings" 
                            value={recipe.servings}
                            onChange={handleRecipeUpdate}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <input 
                            type="text"
                            name="instructions"
                            placeholder="Instructions" 
                            value={recipe.instructions}
                            onChange={handleRecipeUpdate}
                        />
                    </Grid>
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
                    <Grid item xs={12} md={12}>
                        <button onClick={addRecipe}>Save Recipe</button>
                    </Grid>
                </Grid>
                <Grid container xs={12} md={6}>
                    <Grid item xs={12} md={12}>
                        <IngredientsSearchBar setSearchResults={setSearchResults} />
                    </Grid>
                    {searchResults.map((ingredient) => (
                        <Grid item xs={12} md={12}>
                            <IngredientCard
                                addIngredient={addIngredient}
                                currentIngredients={recipe.ingredients}
                                ingredient={ingredient}
                                key={ingredient.id}
                                removeIngredient={removeIngredient}
                                showButton={true}
                            />
                        </Grid>
                    ))}
                </Grid> 
            </Grid> 
        </Container>
    );
}
