const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);

// POST /api/users/login
router.post('/login', usersCtrl.login);

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// GET /api/users/pantry
router.get('/pantry', usersCtrl.getPantry);

// POST /api/users/pantry
router.post('/pantry', usersCtrl.addToPantry);

// DELETE /api/users/pantry
router.delete('/pantry', usersCtrl.removeFromPantry);

module.exports = router;
