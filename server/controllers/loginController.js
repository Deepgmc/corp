const {connection, connect} = require('../mysql_connection.js')


const loginController = function (req, res, next) {
    console.log('LOGIN Controller starts')
    connect()
    //! AUTHENTICATE USER
    //res.send({ token: 'XXXXXXXXXXXXXXXXXXXXXXX' })
}

module.exports = loginController