import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeIngredientMatching({allRecipes, userPantry}) {
    const userPantryIngNames = new Set(userPantry.map(ingredient => ingredient.name));
    const filteredRecipes = allRecipes.filter(recipe => {
        const recipeIngredientNames = new Set(recipe.ingredients.map(ingredient => ingredient.name));
        const intersection = recipeIngredientNames.intersection(userPantryIngNames);
        return intersection.size === recipeIngredientNames.size;    
    });

    return (
        <Card>
            <CardContent style={{ backgroundColor: '#dff9ba' }}>
                <h1>Ready to Cook!</h1>
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        recipe={recipe}
                        key={recipe._id}
                    />
                ))}
            </CardContent>
        </Card>
    )
}
