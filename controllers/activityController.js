const passport = require('passport')
require('dotenv').config

const Activity = require('../models/activityModel')

exports.getActivities = async (req, res) => {
    if (req.user) {
        const data = await Activity.query()
            .join('categories as c', 'category_id', '=', 'categories.id')
            .select('activities.*', 'c.name')
        console.log('getActivities', data)
        res.status(200).send(data)
    }
    else {
        res.sendStatus(403)
    }
}

// add activity req:  name, amount, category_id
exports.addActivity = async (req, res) => {
    if (req.user) {
        const insertRow = {
            user_id: req.user.id,
            ...req.body
        }
        const newActivity = await Activity.query().insert(insertRow)
        res.status(200).send(newActivity)
    }
    else {
        res.sendStatus(403)
    }
}

// delete activity req: id
exports.deleteActivity = async (req, res) => {
    if (req.user) {
        const result = await Activity.query().deleteById(req.body.id)
        res.status(200).send({ delete: true, recordsDeleted: result })
    }
    else {
        res.sendStatus(403)
    }
}
