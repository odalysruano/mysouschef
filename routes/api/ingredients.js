const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../../controllers/api/ingredients');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/ingredients/search
router.get('/search/:query', ensureLoggedIn, ingredientsCtrl.search);

module.exports = router;
