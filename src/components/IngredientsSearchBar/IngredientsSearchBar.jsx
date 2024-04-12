import { useState } from 'react';
import * as ingredientsAPI from '../../utilities/ingredients-api';

export default function IngredientsSearchBar({setSearchResults}) {
    const [searchQuery, setSearchQuery] = useState('');

    async function handleClick(evt) {
        const results = await ingredientsAPI.search(searchQuery);
        setSearchResults(results);
        setSearchQuery('');
    };

    return (
        <>
            <input 
                type="text"
                placeholder="Search For Ingredient" 
                value={searchQuery}
                onChange={(evt) => {setSearchQuery(evt.target.value)}}
            />
            <button type="submit" onClick={handleClick}>Search</button>
        </>
    );
}
