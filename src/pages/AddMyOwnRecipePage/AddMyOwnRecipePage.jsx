import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as RecipeAPI from '../../utilities/recipes-api';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function AddToAllRecipes() {
    const [searchResults, setSearchResults] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '',
        servings: '',
        instructions: '',
        ingredients: [],
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldRedirect) navigate("/");
    }, [shouldRedirect, navigate]);

    async function addRecipe() {
        await RecipeAPI.addRecipe(recipe);
        setShouldRedirect(true);
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
                    <Typography variant="h3">
                        Add a New Recipe
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container >
                        <Grid item xs={12} md={12}>
                            <TextField 
                                id="outlined-basic" 
                                label="Recipe Name" 
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                name="name"
                                value={recipe.name}
                                onChange={handleRecipeUpdate}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                id="outlined-basic"
                                label="# of Servings"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                name="servings"
                                value={recipe.servings}
                                onChange={handleRecipeUpdate}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField 
                                id="outlined-multiline-flexible"
                                label="Instructions"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                multiline
                                rows={10}
                                name="instructions"
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
                            <Button variant='contained' size='small' onClick={addRecipe}>
                                Save Recipe
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <IngredientsSearchBar setSearchResults={setSearchResults} />
                        </Grid>
                        {searchResults.map((ingredient) => (
                            <Grid item xs={12} md={6}>
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
            </Grid> 
        </Container>
    );
}
