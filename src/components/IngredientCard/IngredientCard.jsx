export default function IngredientCard(props) {
    // props should include:
    //      ingredient - an object with keys' ID and name
    //      showButton - a boolean
    //      currentIngredients - an array of ingredient objects
    //      addIngredient - a function that will handle adding the ingredient to a list (recipe or pantry)
    //      removeIngredient - a function that will handle removing the ingredient to a list (recipe or pantry)
    const isInIngredientList = props.currentIngredients.filter(currentIngredient => {
        if (props.ingredient.name === currentIngredient.name && props.ingredient.id.toString() === currentIngredient.apiID) {
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
