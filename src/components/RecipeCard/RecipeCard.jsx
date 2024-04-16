import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function RecipeCard(props) {
    // props should include:
    //      recipe - an object with keys' ID and name
    //      showButton - a boolean
    //      addRecipe - a function that will handle adding the recipe to a list (all recipes)
    //      removeRecipe - a function that will handle removing the recipe from a list (all recipes)

    const handleClick = (evt) => {
        props.addRecipe(props.recipe);
    };

    return (
        <div style={{ padding:10 }}>
            <Card>
                <CardContent style={{ color: 'white' }} >
                    <h2>{props.recipe.name}</h2>
                    <Button variant='contained' size='small' onClick={handleClick}>{'See Details'}</Button>
                </CardContent>
            </Card>
        </div>
    );
}
