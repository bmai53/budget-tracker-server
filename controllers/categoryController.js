const passport = require('passport')
require('dotenv').config

const Category = require('../models/categoryModel')

exports.getCategories = async (req, res) => {
    if (req.user) {
        const data = await Category.query().where('user_id', req.user.id).withGraphFetched('user')
        console.log(data)
        res.status(200).send(data)
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