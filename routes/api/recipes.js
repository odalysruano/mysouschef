const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/api/recipes');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/recipes
router.post('/', ensureLoggedIn, recipesCtrl.addRecipe);

// GET /api/recipes
router.get('/', ensureLoggedIn, recipesCtrl.showRecipes);

// DELETE /api/recipes
router.delete('/:id', ensureLoggedIn, recipesCtrl.removeRecipe);

module.exports = router;
