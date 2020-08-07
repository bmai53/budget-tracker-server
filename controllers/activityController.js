const passport = require('passport')
require('dotenv').config

const Activity = require('../models/activityModel')
const Category = require('../models/categoryModel')

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
    console.log('update row', updateRow)
    if (req.user) {
        const result = await Activity.query().where({ id: req.body.id, user_id: req.user.id }).update(updateRow)
        res.status(200).send({ rowsUpdated: result })
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

exports.uploadCSV = async (req, res) => {
    try {
        const curCategories = await Category.query().where('user_id', req.user.id)
        const { data, map } = req.body
        const { date: dateIndex, name: nameIndex, categoryName: categoryIndex, amount: amountIndex, type: typeIndex } = map

        // check categories
        for (let i = 1; i < data.length; i++) {
            const rowCategoryName = data[i][categoryIndex]
            const found = curCategories.filter(c => c.name === rowCategoryName)
            let rowCategoryID = found[0] ? found[0].id : null

            // if rowCategoryID is null then category does not currently exist
            // add new category
            if (!rowCategoryID) {
                const insertRow = {
                    user_id: req.user.id,
                    name: rowCategoryName
                }
                const newCategory = await Category.query().insert(insertRow)
                rowCategoryID = newCategory.id

                // update curCategories
                curCategories.push(newCategory)
            }

            // replace category name with category id
            data[i][categoryIndex] = rowCategoryID
        }

        // add to activities table
        // add activity req:  name, amount, category_id, date, type['income', 'expense']
        for (let i = 1; i < data.length; i++) {
            const insertRow = {
                user_id: req.user.id,
                name: data[i][nameIndex],
                amount: parseFloat(data[i][amountIndex]),
                category_id: data[i][categoryIndex],
                date: data[i][dateIndex],
                type: data[i][typeIndex].toLowerCase()
            }

            await Activity.query().insert(insertRow)
        }

        res.status(200).send({ message: 'Successful upload' })

    }
    catch (error) {
        console.log(error)
    }
}
