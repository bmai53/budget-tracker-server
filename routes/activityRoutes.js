const express = require('express')
const passport = require('passport')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.get('/getActivities', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('post jwt auth', req.user)
    next()
}, (req, res) => {
    activityController.getActivities(req, res)
})

router.post('/addActivities', (req, res) => {
    activityController.addActivities(req, res)
})

router.delete('/deleteActivities', (req, res) => {
    activityController.deleteActivities(req, res)
})


module.exports = router;