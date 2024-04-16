import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function IngredientCard(props) {
    // props should include:
    //      ingredient - an object with keys' ID and name
    //      showButton - a boolean
    //      currentIngredients - an array of ingredient objects
    //      addIngredient - a function that will handle adding the ingredient to a list (recipe or pantry)
    //      removeIngredient - a function that will handle removing the ingredient to a list (recipe or pantry)
    const isInIngredientList = props.currentIngredients.filter(currentIngredient => {
        if (props.ingredient.name === currentIngredient.name) {
            return true
        } 
        return false
    }).length > 0;

    const handleClick = (evt) => {
        if (isInIngredientList) {
            props.removeIngredient(props.ingredient);
        } else {
            props.addIngredient(props.ingredient);
        }
    };

    return (
        <div style={{ padding:10 }}>
            <Card>  
                <CardContent>
                    <h2>{props.ingredient.name}</h2>
                    {props.showButton ?
                        <Button variant='contained' size='small' onClick={handleClick}>
                            {isInIngredientList ? 'Remove' : 'Add'}
                        </Button>
                        : 
                        <></>
                    }
                </CardContent>
            </Card>
        </div>
    );
}
