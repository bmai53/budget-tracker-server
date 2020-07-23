const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const { body, validationResult } = require('express-validator')

const passport = require('passport')

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

router.get('/findUser', (req, res, next) => {
    authController.findUser(req, res, next)
})


// only add to test adding new users
if (process.env.NODE_ENV === 'development') {

    // router.get('/getCategories', (req, res, next) => {
    //     authController.getCategories(req, res, next)
    // })

    router.get('/getCategories', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        console.log('post jwt auth', req.user)
        next()
    }, (req, res) => {
        authController.getCategories(req, res)
    })


    router.delete('/delete', (req, res) => {
        authController.delete(req, res)
    })
}

module.exports = router;