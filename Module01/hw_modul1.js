/*
  Напишите скрипт, для авторизации администратора в панели управления.
  
  При загрузке страницы у посетителя запрашивается логин через prompt:
  
    - Если посетитель нажал Cancel — показыать alert с текстом 'Отменено пользователем!'
    - Если было введено что либо другое, что не совпадает со значением константы ADMIN_LOGIN, 
      показывать alert с текстом 'Доступ запрещен!'   
    - Если был введен логин совпадающий со значением константы ADMIN_LOGIN, спрашивать пароль через prompt.
    
  При вводе пароля:
  
      - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
      - Если введен пароль который не совпадает со значением константы ADMIN_PASSWORD,
        показывать alert с текстом 'Доступ запрещен!'        
      - Если введён пароль который совпадает со значением константы ADMIN_PASSWORD, 
        показывать alert с текстом 'Добро пожаловать!'
        
  PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/

let userLogin = prompt("Введите логин!");
const CANCEL = "Отменено пользователем";
const ACCESS_OUT = "Доступ запрещен!";
const ACCESS_IN = "Добро пожаловать!";
const LOGIN = "ADMIN_LOGIN";
const PASSWD = "ADMIN_PASSWORD";

if (userLogin === null) {
  alert(CANCEL);
} else if (userLogin === LOGIN) {
  let userPasswd = prompt("Введите пароль");
  if (userPasswd === null) {
    alert(CANCEL);
  } else if (userPasswd === PASSWD) {
    alert(ACCESS_IN)
  } else {
    alert(ACCESS_OUT);
  }
} else {
  alert(ACCESS_OUT);
}
