import { useState } from 'react';
import * as ingredientsAPI from '../../utilities/ingredients-api';

export default function IngredientsSearchBar({setSearchResults}) {
    const [searchQuery, setSearchQuery] = useState('');
    async function handleClick(evt) {
        console.log(searchQuery);
        const results = await ingredientsAPI.search(searchQuery);
        console.log(results);
        console.log(typeof results);

        setSearchResults(results);
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
