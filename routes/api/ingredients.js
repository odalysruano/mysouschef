const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../../controllers/api/ingredients');


// GET /api/ingredients/search
router.get('/search/:query', ingredientsCtrl.search);

module.exports = router;
