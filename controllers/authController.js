const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config

const BCRYPT_SALT_ROUNDS = 10

const User = require('../models/userModel')

exports.login = (req, res) => {
    try {
        passport.authenticate('local', (error, user, info) => {
            console.log(error, user, info);
            console.log(req.body)
            if (error) {
                console.log(error)
            }
            if (info) {
                console.log(info.message)
                res.status(401)
                res.send(info.message)
            }
            if (user) {
                req.logIn(user, (error) => {
                    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET)
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: 'User found and logged in'
                    })
                })
            } else {
                res.status(401).send({
                    auth: false,
                    message: 'Email or password is incorrect'
                })
            }
        })(req, res)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const checkEmail = await User.query().where('email', req.body.email)
        if (checkEmail.length === 0) {
            const hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
            const newUser = req.body
            newUser.password = hashedPassword

            const newUserAdded = await User.query().insert(newUser)
            delete newUserAdded.password
            // 201 created
            res.status(201).send({
                userCreated: true,
                user: newUserAdded,
                message: "Success!"
            })
        }
        else {
            console.log("Email already registered")
            res.status(409).send({
                userCreated: false,
                message: "Email already registered"
            })
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }

}
exports.findUser = (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, (error, user, info) => {
            if (error) {
                console.log(error)
            }
            if (info) {
                console.log(info.message)
                res.status(401);
                res.send(info.message)
            }
            else {
                // Found user, set values to return from db
                user.auth = true
                delete user.password
                res.status(200).send(user)
            }
        })(req, res, next)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}


exports.delete = async (req, res) => {
    const result = await User.query().delete().where('email', 'like', req.body.email)
    res.status(200).send({ delete: true, recordsDeleted: result })
}