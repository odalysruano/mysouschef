import IngredientCard from '../IngredientCard/IngredientCard';

export default function MyPantry({userPantry, removeIngredient}) {
    
    return (
        <>
            <h1>My Pantry</h1>
            {userPantry.map((ingredient) => (
                <IngredientCard
                    currentIngredients={userPantry}
                    ingredient={ingredient}
                    key={ingredient.apiID}
                    removeIngredient={removeIngredient}
                    showButton={true}
                />
            ))}
        </>
    );
}
