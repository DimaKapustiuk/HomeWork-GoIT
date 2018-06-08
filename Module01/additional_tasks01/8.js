/* 
  В переменную num записывается случайное число.
  
  Используя ветвления запишите в переменную type строку:  
    - "even" если num четное
    - "odd" если num не четное

  PS: попробуйте использовать тернарный оператор
*/

const num = Number.parseInt(Math.random() * 100);

let type;
if (num % 2 == 0) {
  type = "even";
} else {
  type = "odd";
}
console.log(`${num} is ${type}`);