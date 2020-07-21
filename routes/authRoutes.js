const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const {body, validationResult} = require('express-validator')

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
    controller.login
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
    controller.register
});

router.get('/findUser', (req, res) => {
    controller.findUser
})

module.exports = router;