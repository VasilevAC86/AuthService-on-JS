const express = require('express');
const app = express(); // express() вместо коснтруктора создаёт некий объект, который занимается получением запросов
app.get('/', (request, response) => {
    response.send('Hello'); // Передаём сообщение 'Hello'
}) 
// Запускаем сервер
app.listen(4000, () => console.log('server start on port 4000'));
// если в брайзере написать http://localhost:4000 то брайзер выведет 'Hello'
