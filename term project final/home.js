const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.navigation');

hambutton.addEventListener(
  'click',
  () => {
    mainnav.classList.toggle('responsive');
  },
  false
);

window.onresize = () => {
  if (window.innerWidth > 760) mainnav.classList.remove('responsive');
};

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let dayObj = new Date();
let weekday = dayNames[dayObj.getDay()];
document.getElementById('day').textContent = weekday;

let dayn = new Date();
let daynum = dayn.getDate();
document.getElementById('daynum').textContent = daynum;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let m = new Date();
let n = monthNames[m.getMonth()];
document.getElementById('month').textContent = n;

let x = new Date();
let y = x.getFullYear();
document.getElementById('year').textContent = y;

