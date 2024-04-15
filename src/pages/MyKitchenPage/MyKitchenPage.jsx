import { useEffect, useState } from 'react';
import * as UserAPI from '../../utilities/users-api';
import MyPantry from '../../components/MyPantry/MyPantry';

export default function MyKitchenPage() {
    const [userPantry, setUserPantry] = useState([]);
    
    useEffect(function() {
        UserAPI.getPantry().then(pantry => setUserPantry(pantry));
    }, []);

    async function removeIngredient(ingredient) {
        await UserAPI.removeFromPantry(ingredient.name, ingredient.apiID);
        const pantry = await UserAPI.getPantry()
        setUserPantry(pantry)
    }

    return (
        <>
            <h1>My Kitchen Page</h1>
            <MyPantry userPantry={userPantry} removeIngredient={removeIngredient} />
        </>
    )
}
