import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as RecipeAPI from '../../utilities/recipes-api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IngredientCard from '../../components/IngredientCard/IngredientCard';

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState({
        _id: '',
        name: '',
        servings: '',
        instructions: '',
        ingredients: [],
        ownedByUser: false,
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    let params = useParams();
    useEffect(() => {
        const recipeID = params.id;
        RecipeAPI.getRecipe(recipeID).then(recipe => setRecipe(recipe))
    }, [params.id]);

    useEffect(() => {
        if (shouldRedirect) navigate("/");
    }, [shouldRedirect, navigate]);

    async function removeRecipe() {
        await RecipeAPI.removeRecipe(params.id);
        setShouldRedirect(true);
    }

    return (
        <Card>
            <CardContent style={{ backgroundColor: '#dff9ba', textAlign: 'left' }}>
                <h1>{recipe.name}</h1>
                <h2>Servings: {recipe.servings}</h2>
                <h2>Instructions: {recipe.instructions}</h2>
                <h2>
                    Ingredients:
                    {recipe.ingredients.map((ingredient) => (
                            <IngredientCard
                                ingredient={ingredient}
                                key={ingredient.id}
                                showButton={false}
                            />
                        ))}
                </h2>
                {recipe.ownedByUser ?
                    <Button variant='contained' size='small' onClick={removeRecipe}>Delete Recipe</Button>
                    :
                    <></>
                }
            </CardContent>
        </Card>
    )
}
