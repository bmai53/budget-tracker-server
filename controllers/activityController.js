const passport = require('passport')
require('dotenv').config

const Activity = require('../models/activityModel')

exports.getActivities = async (req, res) => {
    if (req.user) {
        res.status(200).send('getActivities - not yet implemented')
    }
    else {
        res.sendStatus(400)
    }
}

exports.addCategory = async (req, res) => {
    res.send('addCategory - not yet implemented')
}

exports.deleteCategory = async (req, res) => {
    res.send('deleteCategory - not yet implemented')
}