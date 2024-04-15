const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/api/recipes');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/recipes/add
router.post('/add', ensureLoggedIn, recipesCtrl.addRecipe);

// GET /api/recipes/show
router.get('/show', ensureLoggedIn, recipesCtrl.showRecipes);

module.exports = router;
