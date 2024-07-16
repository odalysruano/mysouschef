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
        authorUsername:'',
        name: '',
        servings: '',
        instructions: '',
        ingredients: [],
        ownedByUser: false,
        createdAt: '',
        updatedAt: '',
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

    async function redirectEditRecipe() {
        navigate(`/editRecipe/${params.id}`);
    }

    async function removeRecipe() {
        await RecipeAPI.removeRecipe(params.id);
        setShouldRedirect(true);
    }

    // Function to format ISO date to locale date string
    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('en-US');
    }

    const formatLastUpdated = (isoDate) => {
        const currentDate = new Date();
        const isoAsDate = new Date(isoDate);
        const diff = currentDate - isoAsDate;
        if (diff > (1000 * 60 * 60 * 24 * 365)) {
            return 'over a year ago';
        } else if (diff > (1000 * 60 * 60 * 24 * 60)) {
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            return `${months} months ago`;
        } else if (diff > (1000 * 60 * 60 * 24 * 30)) {
            return 'a month ago';
        } else if (diff > (1000 * 60 * 60 * 24 * 2)) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            return `${days} days ago`;
        } else if (diff > (1000 * 60 * 60 * 24)) {
            return 'a day ago';
        } else if (diff > (1000 * 60 * 60 * 2)) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            return `${hours} hours ago`;
        } else if (diff > (1000 * 60 * 60)) {
            return 'an hour ago';
        } else if (diff > (1000 * 60 * 2)) {
            const minutes = Math.floor(diff / (1000 * 60));
            return `${minutes} minutes ago`;
        } else if (diff > (1000 * 60)) {
            return 'a minute ago';
        } else if (diff > (1000 * 2)) {
            const seconds = Math.floor(diff / 1000);
            return `${seconds} seconds ago`;
        } else {
            return 'just now';
        }
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
                <h3>Created by: {recipe.authorUsername}</h3>
                <h4>Created on: {formatDate(recipe.createdAt)}</h4>
                <h4>Last updated: {formatLastUpdated(recipe.updatedAt)}</h4>
                {recipe.ownedByUser &&
                <>
                    <div>
                        <Button variant='contained' size='small' onClick={redirectEditRecipe}>Edit Recipe</Button>
                    </div>
                    <br></br>
                    <div>
                        <Button variant='contained' size='small' onClick={removeRecipe}>Delete Recipe</Button>
                    </div>
                </>}
            </CardContent>
        </Card>
    )
}
