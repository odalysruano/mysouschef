import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function AllRecipes({allRecipes}) {
    return (
        <Card>
            <CardContent style={{ backgroundColor: '#dff9ba' }}>
                <h1>All Recipes</h1>
                <Button color="secondary" variant="contained" href="/addRecipe" component={Link}>Add Recipe</Button>
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
