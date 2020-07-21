const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const { body, validationResult } = require('express-validator')

router.post("/login", [
    body('email').trim().isAscii(),
    body('password').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Login form validation failed");
        return res.status(422).json({ errors: errors.array() });
    }
    authController.login(req, res)
});

router.post('/register', [
    body('email').trim().isAscii(),
    body('password').trim().isAscii(),
    body('*').escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({ errors: errors.array() });
    }
    authController.register(req, res)
});

router.get('/findUser', (req, res) => {
    authController.findUser(req, res)
})

module.exports = router;