const passport = require('passport')
require('dotenv').config

const Category = require('../models/categoryModel')

exports.getCategories = async (req, res) => {
    if (req.user) {
        const joinTest = await Category.query().where('user_id', req.user.user_id).withGraphFetched('user')
        console.log(joinTest)
        res.status(200).send(joinTest)
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