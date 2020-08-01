const passport = require('passport')
require('dotenv').config

const Activity = require('../models/activityModel')

exports.getActivities = async (req, res) => {
    if (req.user) {
        const data = await Activity.query()
            .join('categories', 'activities.category_id', '=', 'categories.id')
            .select('activities.*', 'categories.name AS category_name')
            .where('activities.user_id', req.user.id)
            .orderBy('activities.date', 'desc')
        console.log('getActivities', data)
        res.status(200).send(data)
    }
    else {
        res.sendStatus(403)
    }
}

// add activity req:  name, amount, category_id, date, type['income', 'expense']
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

// add activity req:  id, name, amount, category_id, date, type['income', 'expense']
// req.body format: 
// {
//     id: ACTIVITY_ID,
//     updateData: {
//         column: data
//     }
// }
exports.updateActivity = async (req, res) => {
    const updateRow = {
        user_id: req.user.id,
        ...req.body.updateData
    }
    if (req.user) {
        const updateActivity = await Activity.query().where('id', req.body.id).insert(updateRow)
        res.status(200).send(updateActivity)
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
