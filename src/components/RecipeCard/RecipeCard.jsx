import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {
    // props should include:
    //      recipe - an object with keys' ID and name

    return (
        <div style={{ padding:10 }}>
            <Grow in={true}>
                <Card>
                    <CardContent style={{ color: 'white' }} >
                        <h2>{props.recipe.name}</h2>
                        <Button variant='contained' size='small' component={Link} to={`/recipe/${props.recipe._id}`}>{'See Details'}</Button>
                    </CardContent>
                </Card>
            </Grow>
        </div>
    );
}
