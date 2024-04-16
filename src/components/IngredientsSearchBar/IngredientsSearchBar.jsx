import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import * as ingredientsAPI from '../../utilities/ingredients-api';

export default function IngredientsSearchBar({setSearchResults}) {
    const [searchQuery, setSearchQuery] = useState('');

    async function handleClick(evt) {
        const results = await ingredientsAPI.search(searchQuery);
        setSearchResults(results);
        setSearchQuery('');
    };

    return (
        <Container>
            <Grid container>
                <TextField
                    id="outlined-basic"
                    label="Search For Ingredient"
                    variant="outlined"
                    fullWidth
                    margin='normal'
                    value={searchQuery}
                    onChange={(evt) => {setSearchQuery(evt.target.value)}}
                />
                <Button variant='contained' size='small' onClick={handleClick}>Search</Button>
            </Grid>
        </Container>
    );
}
