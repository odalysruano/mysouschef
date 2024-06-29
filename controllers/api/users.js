const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Ingredient = require('../../models/ingredient');
const bcrypt = require('bcrypt');


module.exports = {
    create,
    login,
    checkToken,
    getPantry,
    addToPantry,
    removeFromPantry,
};

async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
    }   catch (err) {
        console.log(err);
        // Client will check for non-200 status code
        // 400 = Bad Request
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json( createJWT(user) );
    }   catch {
        res.status(400).json('Bad Credentials');
    }
}

function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}

async function getPantry(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.json(user.pantry);
    }   catch (err) {
        console.log(err);
        res.status(500).json('Internal Service Error');
    }
}

async function addToPantry(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email });
        const newIngredient = new Ingredient({
            name: req.body.name,
            apiID: req.body.id,
        });
        const existsInPantry = user.pantry.filter(ingredient => {
            if (newIngredient.name === ingredient.name && newIngredient.apiID === ingredient.apiID) {
                return true
            } 
            return false
        }).length > 0;
        if (existsInPantry) {
            res.status(409).json('Ingredient is Already in Pantry');
        } else {
            user.pantry.push(newIngredient);
            await user.save();
            res.status(200).json("OK");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Service Error');
    }
}

async function removeFromPantry(req, res) {
    try {
        const user = await User.findOne({ email: req.user.email });
        const index = user.pantry.indexOf(req.body.ingredient);
        user.pantry.splice(index, 1);
        await user.save();
        res.status(200).json("OK");
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Service Error');
    }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
