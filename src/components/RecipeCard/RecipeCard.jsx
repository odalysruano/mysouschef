export default function RecipeCard(props) {
    // props should include:
    //      recipe - an object with keys' ID and name
    //      showButton - a boolean
    //      addRecipe - a function that will handle adding the recipe to a list (all recipes)
    //      removeRecipe - a function that will handle removing the recipe from a list (all recipes)

    const handleClick = (evt) => {
        props.addRecipe(props.recipe);
    };

    return (
        <>  
            <h1>Recipe Card</h1>
            <h2>{props.recipe.name}</h2>
            <button onClick={handleClick}>{'See Details'}</button>
        </>
    );
}
