const createError = require('http-errors')
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

// app.use(session({
//     secret           : 'abcdefghijklmnopqrstuvwxyz',
//     resave           : false,
//     saveUninitialized: true,
//     cookie           : { maxAge: 3600 * 24 }
// }))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)



//app.set('views', path.join(__dirname, 'views'))





//app.use('/', express.static(path.join(__dirname, 'public')))






app.use(function (req, res, next) {
    next(createError(404))
})

app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    console.log('Before error', err)
    res.status(err.status || 500)
    res.send('Error. No index page!')
})

module.exports = app
