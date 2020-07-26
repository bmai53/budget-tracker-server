const express = require('express')
const passport = require('passport')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/getCategories', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('post jwt auth', req.user)
    next()
}, (req, res) => {
    categoryController.getCategories(req, res)
})

router.post('/addCategory', (req, res) => {
    categoryController.addCategory(req, res)
})

router.delete('/deleteCategory', (req, res) => {
    categoryController.deleteCategory(req, res)
})


module.exports = router;