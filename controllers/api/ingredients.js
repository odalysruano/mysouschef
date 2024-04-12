const BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients";
const rapidAPIKey = process.env.RAPID_API_KEY;

async function search(req, res) {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': rapidAPIKey,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    const url = `${BASE_URL}/search?query=${req.params.query}`;
    try {
        const response = await fetch(url, fetchOptions);
        const result = await response.json();
        res.json(result.results);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = {
    search,
};
