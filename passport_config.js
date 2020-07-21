const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
require('dotenv').config

const User = require('./models/userModel')

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        // login callback
        async (email, password, done) => {
            const result = await User.query().where('email', email)
            if (result.length === 0) {
                return done(null, false)
            }
            try {
                const user = result[0]
                if (await bcrypt.compare(password, user.password)) {
                    console.log("logged in!")
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Password incorrect' }) //flash message
                }
            } catch (error) {
                return done(error)
            }
        }
    )
)

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(
    'jwt',
    new JWTStrategy(
        options,
        // jwt callback
        async (jwt_payload, done) => {
            try {
                const result = await User.query().where('email', jwt_payload.id) //email is id in this case
                if (result.rowCount === 0) {
                    console.log('user not found')
                    return done(null, false)
                }
                else {
                    const user = result[0]
                    return done(null, user)
                }
            } catch (error) {
                done(error)
            }
        }
    )
)
