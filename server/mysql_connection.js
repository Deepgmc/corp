

/*
mysql pass - 1-8qwe
systemctl status mysql.service
sudo systemctl start mysql
25:00 валидация https://www.youtube.com/watch?v=jkQdEvPf-uI&list=PLNOjHC_BXrfCNWe0ghCxEmNVeHN_J5K3k&index=2
*/


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

module.exports = {connection, connect}