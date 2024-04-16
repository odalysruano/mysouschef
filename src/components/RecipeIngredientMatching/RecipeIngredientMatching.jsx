import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeIngredientMatching({allRecipes, userPantry}) {
    const userPantryIngNames = new Set(userPantry.map(ingredient => ingredient.name));
    const filteredRecipes = allRecipes.filter(recipe => {
        const recipeIngredientNames = new Set(recipe.ingredients.map(ingredient => ingredient.name));
        const intersection = recipeIngredientNames.intersection(userPantryIngNames);
        return intersection.size === recipeIngredientNames.size;    
    });

    return (
        <>
            <h1>Recipes I Can Make Today</h1>
            {filteredRecipes.map((recipe) => (
                <RecipeCard
                    recipe={recipe}
                    key={recipe._id}
                />
            ))}
        </>
    )
}
