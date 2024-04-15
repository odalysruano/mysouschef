import { useEffect, useState } from 'react';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import IngredientsSearchBar from '../../components/IngredientsSearchBar/IngredientsSearchBar';
import * as UserAPI from '../../utilities/users-api';

export default function AddToPantry() {
    const [searchResults, setSearchResults] = useState([]);
    const [userPantry, setUserPantry] = useState([]);

    useEffect(function() {
        UserAPI.getPantry().then(pantry => setUserPantry(pantry));
    }, []);

    async function addIngredient(ingredient) {
        await UserAPI.addToPantry(ingredient.name, ingredient.id.toString())
        const pantry = await UserAPI.getPantry()
        setUserPantry(pantry)
    }

    return(
        <>
            <h1>Here is an ingredient</h1>
            <IngredientsSearchBar setSearchResults={setSearchResults} />
            {searchResults.map((ingredient) => (
                <IngredientCard
                    addIngredient={addIngredient}
                    currentIngredients={userPantry}
                    ingredient={ingredient}
                    key={ingredient.id}
                    showButton={true}
                />
            ))}
        </>
    );
}
