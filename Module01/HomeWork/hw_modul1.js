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
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';*/

/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/
"use strict";

let login = prompt("Введите логин!");
const CANCEL = "Отменено пользователем";
const ACCESS_OUT = "Доступ запрещен!";
const ACCESS_IN = "Добро пожаловать!";
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "m4ngo1zh4ackz0r";

if (login === null) {
  alert(CANCEL);
} else if (login === ADMIN_LOGIN) {
  let passwd = prompt("Введите пароль");
  if (passwd === null) {
    alert(CANCEL);
  } else if (passwd === ADMIN_PASSWORD) {
    alert(ACCESS_IN);
    changeTour();
  } else {
    alert(ACCESS_OUT);
  }
} else {
  alert(ACCESS_OUT);
}

function changeTour() {
  let userData = prompt("Введите целое число необходимых мест для Вашей групы!");
  console.log(userData);
  let userGroup = Number(userData);
  console.log(userGroup);
  const SHARM = 15;
  const HURGADA = 25;
  const TABA = 6;
  const SHARM_GROUP = "Sharm!";
  const HURGADA_GROUP = "Hurgada!";
  const TABA_GROUP = "Taba!";
 
  if (userGroup % 1 === 0 && userGroup != 0) {
    alert("Да верно, проверяем к-во в групах");
    if (userGroup <= TABA) {
      const CHOISE_SHARM = confirm(`Есть свободное место в групе ${TABA_GROUP}, вас устроит?`);
      if (CHOISE_SHARM === true) {
        alert(`Приятного путешествия в группе ${TABA_GROUP}`);
      } else {
        alert("Нам очень жаль приходите еще!")
      }
    } else if (userGroup > TABA && userGroup <= SHARM) {
      const CHOISE_SHARM = confirm(`Есть свободное место в групе ${SHARM_GROUP}, вас устроит?`);
      if (CHOISE_SHARM === true) {
        alert(`Приятного путешествия в группе ${SHARM_GROUP}`);
      } else {
        alert("Нам очень жаль приходите еще!")
      }
    } else if (userGroup > SHARM && userGroup <= HURGADA) {
      const CHOISE_SHARM = confirm(`Есть свободное место в групе ${HURGADA_GROUP}, вас устроит?`);
      if (CHOISE_SHARM === true) {
        alert(`Приятного путешествия в группе ${HURGADA_GROUP}`);
      } else {
        alert("Нам очень жаль приходите еще!")
      }
    } else if (userGroup > HURGADA) {
      alert("Извените мест больше нет!");
    }
  } else {
    alert("Ошибка ввода!");
  }
}
