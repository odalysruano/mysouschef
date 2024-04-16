import { useEffect, useState } from 'react';
import * as UserAPI from '../../utilities/users-api';
import * as RecipeAPI from '../../utilities/recipes-api';
import MyPantry from '../../components/MyPantry/MyPantry';
import AllRecipes from '../../components/AllRecipes/AllRecipes';
import RecipeIngredientMatching from '../../components/RecipeIngredientMatching/RecipeIngredientMatching';

export default function MyKitchenPage() {
    const [userPantry, setUserPantry] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    
    useEffect(function() {
        UserAPI.getPantry().then(pantry => setUserPantry(pantry));
        RecipeAPI.showRecipes().then(recipes => setAllRecipes(recipes));
    }, []);

    async function removeIngredient(ingredient) {
        await UserAPI.removeFromPantry(ingredient.name, ingredient.apiID);
        const pantry = await UserAPI.getPantry()
        setUserPantry(pantry)
    }

    async function removeRecipe(recipeID) {
        await RecipeAPI.removeRecipe(recipeID);
        const recipe = await RecipeAPI.showRecipes();
        setAllRecipes(recipe);
    }

    return (
        <>
            <h1>My Kitchen Page</h1>
            <AllRecipes allRecipes={allRecipes} removeRecipe={removeRecipe} />
            <MyPantry userPantry={userPantry} removeIngredient={removeIngredient} />
            <RecipeIngredientMatching allRecipes={allRecipes} userPantry={userPantry} />
        </>
    )
}
