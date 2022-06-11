const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

// const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

const app = express()

//app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')))
//app.use('/', indexRouter)
app.use('/api', apiRouter)




// app.get('/api', function (req, res) {
//     res.send({text: 'Api response'});
// });





app.use(function (req, res, next) {
    next(createError(404))
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    console.log('Before error');
    res.status(err.status || 500)
    //res.render('error')
});

module.exports = app
//sudo npm install vue
//sudo npm install -d webpack webpack-cli webpack-dev-server @babel/core @babel/preset-env babel-loader style-loader css-loader vue-loader vue-template-compiler clean-webpack-plugin html-webpack-plugin prettier