import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function AllRecipes({allRecipes, removeRecipe}) {
    return (
        <Card>
            <CardContent style={{ backgroundColor: '#dff9ba' }}>
                <h1>All Recipes</h1>
                {allRecipes.map((recipe) => (
                    <RecipeCard
                        recipe={recipe}
                        key={recipe._id}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
