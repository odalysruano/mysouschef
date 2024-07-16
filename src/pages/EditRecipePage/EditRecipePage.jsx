import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as RecipeAPI from '../../utilities/recipes-api';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function EditRecipe() {
    const [searchResults, setSearchResults] = useState([]);
    const [recipe, setRecipe] = useState({
        name: '',
        servings: '',
        instructions: '',
        ingredients: [],
        _id: '',
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const recipeID = params.id;
        RecipeAPI.getRecipe(recipeID).then(recipe => {
            setRecipe(recipe);
        });
    }, [params.id]);

    useEffect(() => {
        if (shouldRedirect) navigate(`/recipe/${recipe._id}`);
    }, [shouldRedirect, navigate, recipe]);

    async function editRecipe() {
        await RecipeAPI.editRecipe(recipe);
        setShouldRedirect(true);
    }

    function addIngredient(ingredient) {
        var ingredients = recipe.ingredients;
        ingredients.push({
            name: ingredient.name,
            apiID: ingredient.id,
        });
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
                        Edit Recipe
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
                            <Button variant='contained' size='small' onClick={editRecipe}>
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
