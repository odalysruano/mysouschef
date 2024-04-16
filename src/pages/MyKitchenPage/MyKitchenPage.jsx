import { useEffect, useState } from 'react';
import * as UserAPI from '../../utilities/users-api';
import * as RecipeAPI from '../../utilities/recipes-api';
import MyPantry from '../../components/MyPantry/MyPantry';
import AllRecipes from '../../components/AllRecipes/AllRecipes';
import RecipeIngredientMatching from '../../components/RecipeIngredientMatching/RecipeIngredientMatching';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
        <Container>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3">My Kitchen</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AllRecipes allRecipes={allRecipes} removeRecipe={removeRecipe} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MyPantry userPantry={userPantry} removeIngredient={removeIngredient} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RecipeIngredientMatching allRecipes={allRecipes} userPantry={userPantry} />
                </Grid>
            </Grid>
        </Container>
    )
}
