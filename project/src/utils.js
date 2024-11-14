function getHash(str) { // Возвращает уникальную строку (используется для хранения паролей) для набора данных (пароль)
    // Некий массив, в котором каждому ключу сопоставлено некое значение
    let hash = 0; 
    let char; 
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; ++i){
        char = str.charCodeAt(i); // str.charCodeAt(i) - возвращает код симола i строки str
        hash = ((hash << 5) - hash) + char; // Шифруем hash
        hash |= 0; // Превращаем hash в 32-битное число
    }
    return hash;
}

// console.log(getHash('fdsahfdas')); // Проверка ф.getHash()