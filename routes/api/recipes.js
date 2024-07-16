const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/api/recipes');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/recipes
router.post('/', ensureLoggedIn, recipesCtrl.addRecipe);

// PUT /api/recipes
router.put('/:id', ensureLoggedIn, recipesCtrl.editRecipe);

// GET /api/recipes
router.get('/', ensureLoggedIn, recipesCtrl.showRecipes);

// GET /api/recipes
router.get('/:id', ensureLoggedIn, recipesCtrl.getRecipe);

// DELETE /api/recipes
router.delete('/:id', ensureLoggedIn, recipesCtrl.removeRecipe);

module.exports = router;
