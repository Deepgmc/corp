const {connection, connect} = require('../mysql_connection.js')


const loginController = function (req, res, next) {
    console.log('LOGIN Controller starts')
    //console.log(req.body.userLogin)
    //console.log(req.body.password)
    connect()
    //! AUTHENTICATE USER
    res.send({ token: 'XXXXXXXXXXXXXXXXXXXXXXX' })
}

module.exports = loginController