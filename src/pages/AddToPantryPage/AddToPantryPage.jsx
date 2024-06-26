import { useEffect, useState } from 'react';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as UserAPI from '../../utilities/users-api';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ingredientImg from '../../static/MySousChef.png';

export default function AddToPantry() {
    const [searchResults, setSearchResults] = useState([]);
    const [userPantry, setUserPantry] = useState([]);

    useEffect(function() {
        UserAPI.getPantry().then(pantry => setUserPantry(pantry));
    }, []);

    async function addIngredient(ingredient) {
        await UserAPI.addToPantry(ingredient.name, ingredient.id.toString())
        const pantry = await UserAPI.getPantry()
        setUserPantry(pantry)
    }

    async function removeIngredient(ingredient) {
        await UserAPI.removeFromPantry(ingredient.name, ingredient.id.toString())
        const pantry = await UserAPI.getPantry()
        setUserPantry(pantry)
    }

    return(
        <Container>
            <Grid container rowSpacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3">Add Ingredients to My Pantry</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <img style={{width: 300, borderRadius: '20%'}} src={ingredientImg} alt="Chef Juggling Ingredients" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <IngredientsSearchBar setSearchResults={setSearchResults} />
                </Grid>
                {searchResults.map((ingredient) => (
                    <Grid item xs={12} md={3}>
                        <IngredientCard
                            addIngredient={addIngredient}
                            currentIngredients={userPantry}
                            ingredient={ingredient}
                            key={ingredient.id}
                            removeIngredient={removeIngredient}
                            showButton={true}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
