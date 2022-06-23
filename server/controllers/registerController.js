const {connection, connect} = require('../mysql_connection.js')


const registerController = function (req, res, next) {
    console.log('REGISTER Controller starts')
    connect()
    //! CREATE NEW USER
}

module.exports = registerController