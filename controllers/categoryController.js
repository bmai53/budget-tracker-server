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
        res.sendStatus(403)
    }
}

// add category req: name
exports.addCategory = async (req, res) => {
    if(req.user){
        const insertRow = {
            user_id: req.user.id,
            name: req.body.name
        }
        const newCategory = await Category.query().insert(insertRow)
        res.status(200).send(newCategory)
    }
    else {
        res.sendStatus(403)
    }
}

// delete category req: id
exports.deleteCategory = async (req, res) => {
    if (req.user) {
        const result = await Category.query().deleteById(req.body.id)
        res.status(200).send({ delete: true, recordsDeleted: result })
    }
    else {
        res.sendStatus(403)
    }
}