// Подключаем файлы (как библиотеки)
const Database = require('./Database.js');
const config = require('./config.js'); 
const utils = require('./utils.js');

class User extends Database {
    constructor(email, name, role, password, id=null, token=null, refresh_token=null, token_created_at=null, refresh_created_at=null) {
        super(); // Для вызова конструктора-родителя
        this.email = email;
        this.name = name;
        this.role = role;
        this.password = password;
        this.id = id;
        this.token = token;
        this.refresh_token = refresh_token;
        this.token_created_at = token_created_at;
        this.refresh_created_at = refresh_created_at;
    }

    static loadByEmail(email, password) { // Для загрузки пользователя из БД
        const database = new Database(); // Для подкл. к БД
        database.connect();
            const userData = database.connection.query("SELECT * FROM users WHERE email='" + email + "' ");            
        database.closeConnection();
        if (userData[0].password != password) {return null} // Если пользователь уже зарегистрирован
        // Создаём новый объект класса User через конструктор с параметрами
        const user = new this(userData[0].email, userData[0].name, userData[0].role, userData[0].password, userData[0].id, 
            userData[0].token, userData[0].refresh_token, userData[0].token_created_at, userData[0].refresh_created_at);
        return user; // Возвращаем нового пользователя
    }
    
    static loadByToken(token){ // Создаём экз.родительского класса для его использования (проверяем наличие пользователя по token)
        const database = new Database(); 
        database.connect();
            const userData = database.connection.query("SELECT * FROM users WHERE token='" + token + "' OR refresh_token='" + token + "' ");            
        database.closeConnection(); 
        const user = new this(userData[0].email, userData[0].name, userData[0].role, userData[0].password, userData[0].id, 
            userData[0].token, userData[0].refresh_token, userData[0].token_created_at, userData[0].refresh_created_at);
        return user; // Возвращаем нового пользователя      
    }

    getData() { // Возврат данных об объекте (пользователе)
        return{id:this.id, name:this.name, email:this.email, role:this.role}
    }

    getToken(){ // Ф. для возврата token
        const timeStamp = MAth.floor(Date.now() / 1000); // Кол-во сек, которые прошли с 01.01.1970. Переменная для формирования уникальной строчки
        const token = utils.getHash(config.hash_sault + timeStamp + this.password);
        const refresh_token = utils.getHash(config.hash_sault + token);
        this.connect(); // Подключ. к БД
        this.connection.query("UPDATE 'users' SET token='" + token + "', refresh_token='" + refresh_token 
            + "', token_cerated_at=CURRENT_TIMESTAMP(), refresh_created_at=CURRENT_TIMESTAMP WHERE id=" + this.id );
        this.closeConnection();
        return { token, refresh_token } // Возврат в виде объекта двух значений
    }



    save() { // Записывает изменение в БД пароля пользователя
        this.connect(); // Устанавливаем соединение
        if (this.id) { // Обновляем данные
            this.connection.query("UPDATE 'users' SET name='" + this.name + "', email='" + this.email + "', role='" + this.role + "' WHERE id =" + this.id);
        } else { // Создаём нового пользователя
            this.connection.query("INSERT INTO 'users' (name, email, role, password) VALUES ('" + this.name + "', '" + this.email + "', '" + this.role + "', '" + this.password + "')" );
        }
        //this.connection.query();
        this.closeConnection(); // Прерываем соединение
    }    
}

// Чтобы мы могли использовать класс в других файлах
module.exports = User;