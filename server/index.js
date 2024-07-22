const createError  = require('http-errors')
const express      = require('express')
const app          = express()
const path         = require('path')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')


app.use('/auth', authRouter)
app.use('/api', apiRouter)

console.log('process.version:', process.version);

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
