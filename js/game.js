let usersLog = [];
let gameLog = [];

console.log('game - work');


const start = document.querySelector('.start');
const statistics = document.querySelector('.statistics');

start.onclick = () => {
   game()
};

statistics.onclick = () => {
   console.log(usersLog);
   console.log(gameLog);
};

function game() {
   let levelLog = []; // лог игры
   let score = 0; // начальное значение для очков
   const squares = document.querySelector('.squares');
   const square = document.querySelectorAll('.square');
   let textArea = document.querySelector('.text-area');
   let timeLeft = document.querySelector('.time-left');
   let userArea = document.querySelector('.user-area');
   let header = document.querySelector('.header');

   userName = prompt('Давайте познакомимся. Как вас зовут ?');
   userArea.innerHTML = `Добро пожаловать ${userName}, рады Вас приветствовать.`;
   levelLog.push(`пользователь ${userName} - присоеденился`); // добавляем инфу в лог
   gameLog.push(`пользователь ${userName} - присоеденился`); // добавляем инфу в лог

   let time =  parseInt(prompt("сколько времени вам потребуеться?", "30 секунд"));
   levelLog.push(`пользователь ${userName} выбрал: ${time} секунд для игры`); // добавляем инфу в лог
   gameLog.push(`пользователь ${userName} выбрал: ${time} секунд для игры`); // добавляем инфу в лог
   let startTime = time;

   var  timer = setInterval(() => { // запускает таймер
      time--;
      timeLeft.innerHTML = `До конца раунда осталовь ${time} секунд.`;
   }, 1000);

   textArea.innerHTML = `Вы набрали: ${score} баллов !!!`;
   timeLeft.innerHTML = `До конца раунда отсаловь ${time} секунд.`;

   function random(min=0, max=256) {
      return Math.ceil(Math.random() * (max - min) + min)
   };

   function getRandomColor() { // генерируем случайный цвет 
      return `rgb(${random()}, ${random()}, ${random()})`;
   };

   square.forEach(element => {
      element.addEventListener('mouseup', function() {
         score++;
         textArea.innerHTML = `Вы на брали: ${score} баллов !!!`;

         levelLog.push('+1 очко'); // добавляем инфу в лог
         gameLog.push('+1 очко'); // добавляем инфу в лог
      });
   });

   let squareSize = innerHeight / 10; // размер кубиков (10% от ширины экрана)

   var squareMuve =  setInterval(() => {  
      let headerHigth = header.clientHeight;
      console.log(headerHigth);

      square.forEach(element => {
         let y = window.innerHeight - element.clientHeight;
         let x = window.innerWidth - element.clientWidth;

         element.style.backgroundColor = `${getRandomColor()}`;
         element.style.top = `${random(headerHigth, y)}px`;
         element.style.left = `${random(0, x)}px`;
         element.style.height = squareSize + 'px';
         element.style.width = squareSize + 'px';

      });
   }, 2000); // время в секундах для фигур


   setTimeout(() => { // останавливает таймер, по истечении времени
      clearInterval(timer);
      clearInterval(squareMuve);
      alert(`Время вышло ${userName}`)
      alert(`Ваш резальтат ${score} очков !!!`)
      console.log(levelLog);

      usersLog.push({player: `Player` + (+usersLog.length + 1) , name: userName, score: score, time: startTime, clickPerSec: Math.round(parseFloat(score / startTime) * 100) / 100,})

   }, (time * 1000));
};