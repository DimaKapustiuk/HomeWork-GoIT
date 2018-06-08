
/*
  Время состоит из:
    часов(hours)
    минут (minutes)
    секунд(seconds).

  Время должно всегда выводиться в формате xx/xx/xx.
  Например: 01:12:04 или 14:03:45

  Составляющие времени не гарантированно состоят из 2-х цифр!

  Напишите скрипт который проверяет каждую составляющую
  и добавлят 0 если необходимо.
*/

let hours = 7;
let minutes = 3;
let seconds = 12;

if (String(hours).length < 2) {
  hours = '0' + hours;
}
if (String(minutes).length < 2) {
  minutes = '0' + minutes;
}
if (String(seconds).length < 2) {
  seconds = '0' + seconds;
}


let time = `${hours}:${minutes}:${seconds}`;


console.log('Time is: ', time);


