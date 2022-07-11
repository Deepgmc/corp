

const mysql = require('mysql2')
const db_data = require('./db_config.js')

const connection = mysql.createConnection({
    host    : db_data.DB_HOST,
    user    : db_data.DB_USERNAME,
    database: db_data.DB_NAME,
    password: db_data.DB_PASSWORD
})

const connect = () => {
    connection.connect(function (err) {
        if (err) {
            return console.error('Ошибка: ' + err.message)
        } else {
            console.log('Подключение к серверу MySQL успешно установлено');
        }
    })
}

connect()

module.exports = {connection}