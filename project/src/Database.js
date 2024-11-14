const mysql = require('mysql'); // Подключаем БД

class Database {
    constructor() {
        this.config = require('./config.js');
    }
    connect(){
        this.connection = mysql.createConnection({
            host: this.config.db_host,
            port: this.config.db_port,
            database: this.config.db_name,
            user: this.config.db_user,
            password: this.config.db_pass
        });
        this.connection.connect(); // Выполняем соединение с БД
    }
    closeConnection(){
        this.connection.end();
        this.connection = null;
    }
}

module.exports = Database;