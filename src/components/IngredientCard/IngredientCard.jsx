export default function IngredientCard(props) {
    // props should include:
    //      ingredient - an object with keys' ID and name
    //      showButton - a boolean
    //      currentIngredients - an array of ingredient objects
    //      addIngredient - a function that will handle adding the ingredient to a list (recipe or pantry)
    //      removeIngredient - a function that will handle removing the ingredient to a list (recipe or pantry)
    const isInIngredientList = props.currentIngredients.includes(props.ingredient);

    const handleClick = (evt) => {
        if (isInIngredientList) {
            props.removeIngredient(props.ingredient);
        } else {
            props.addIngredient(props.ingredient);
        }
    };

    return (
        <>  
            <h1>Ingredient Card</h1>
            <h2>{props.ingredient.name}</h2>
            {props.showButton ?
                <button onClick={handleClick}>
                    {isInIngredientList ? 'Remove' : 'Add'}
                </button>
                : 
                <></>
            }
        </>
    );
}