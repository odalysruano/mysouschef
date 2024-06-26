import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import IngredientCard from '../IngredientCard/IngredientCard';

export default function MyPantry({userPantry, removeIngredient}) {
    
    return (
        <Card>
            <CardContent style={{ backgroundColor: '#dff9ba' }}>
                <h1>My Pantry</h1>
                <Button color="secondary" variant="contained" href="/addIngredient" component={Link}>Add Ingredients</Button>
                {userPantry.map((ingredient) => (
                    <IngredientCard
                        currentIngredients={userPantry}
                        ingredient={ingredient}
                        key={ingredient.apiID}
                        removeIngredient={removeIngredient}
                        showButton={true}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
