const express = require('express')
const passport = require('passport')
const router = express.Router()
const activityController = require('../controllers/activityController')

router.get('/getActivities', passport.authenticate('jwt', { session: false }), (req, res) => {
    activityController.getActivities(req, res)
})

router.post('/addActivity', passport.authenticate('jwt', { session: false }), (req, res) => {
    activityController.addActivity(req, res)
})

router.put('/updateActivity', passport.authenticate('jwt', { session: false }), (req, res) => {
    activityController.updateActivity(req, res)
})

router.delete('/deleteActivity', passport.authenticate('jwt', { session: false }), (req, res) => {
    activityController.deleteActivity(req, res)
})

router.post('/uploadCSV', passport.authenticate('jwt', { session: false }), (req, res) => {
    activityController.uploadCSV(req, res)
})

module.exports = router;