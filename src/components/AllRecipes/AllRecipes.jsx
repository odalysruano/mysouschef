import RecipeCard from '../RecipeCard/RecipeCard';

export default function AllRecipes({allRecipes, removeRecipe}) {
    return (
        <>
            <h1>All Recipes</h1>
            {allRecipes.map((recipe) => (
                <RecipeCard
                    recipe={recipe}
                    key={recipe._id}
                />
            ))}
        </>
    );
}
