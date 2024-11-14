const express = require('express');
const router = express.Router(); // Объект,в который записываются маршруты (роуты)
const User = require('./User'); // Подключили экспортированный класс User
// перечень маршрутов: 
router.post('/auth', (req, res) => {
    const user = User.loadByEmail(req.body.email, req.body.password);
    if (!user){
        res.sendStatus(401); // 401 - статус неавторизованного пользователя
        return;
    }
    return res.send(JSON.stringify(user.getToken())); // возврат статуса 202
}); // /auth - для авторизации пользователя, post - отправка данных
router.post('/refresh', (req, res) => {
    const user = User.loadByToken(req.body.token);
    if (!user) {
        res.sendStatus(401); // 401 - статус неавторизованного пользователя
        return;
    }
    return res.send(JSON.stringify(user.getToken()));
}); // Обновление токена авторизации
router.get('/authorize', (req, res) => {
    const user = User.loadByToken(req.body.token);
    if (!user) {
        res.sendStatus(401); // 401 - статус неавторизованного пользователя
        return;
    }
    return res.send(JSON.stringify(user.getData()));
}); // /authorize - получение информации о пользователе
router.put('/me', () => {}); // обновить инф-ю о себе (сменить пароль)
router.post('/user', () => {}); // добавление нового пользователя (регистрация)
router.get('/user', () => {}); // Получение списка пользователей
router.get('/user/:id', () => {}); // Получение конкретного пользователя
router.put('/user:id', () => {}); // Обновление (изменение инф-ии) конкретного пользователя
router.delete('/user:id', () => {}); // Удалить конкретного пользователя
