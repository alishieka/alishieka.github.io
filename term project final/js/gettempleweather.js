let apiURL1 =
  'https://api.openweathermap.org/data/2.5/weather?id=5596475&units=imperial&appid=a6bea4e16102442de7b4c070cffb4029';
let apiURL2 =
  'https://api.openweathermap.org/data/2.5/weather?id=5605242&units=imperial&appid=a6bea4e16102442de7b4c070cffb4029';
let apiURL3 =
  'https://api.openweathermap.org/data/2.5/weather?id=4393217&units=imperial&appid=a6bea4e16102442de7b4c070cffb4029';
let apiURL4 =
  'https://api.openweathermap.org/data/2.5/weather?id=4544379&units=imperial&appid=a6bea4e16102442de7b4c070cffb4029';

fetch(apiURL1)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('idahofalls').textContent = jsObject.weather[0].main;
    document.getElementById('temp').textContent = Math.round(
      jsObject.main.temp
    );
    document.getElementById('hum').textContent = jsObject.main.humidity;
    document.getElementById('ws').textContent = Math.round(jsObject.wind.speed);
    document.getElementById('wind').textContent = windchill(
      jsObject.main.temp,
      jsObject.wind.speed
    );
  });

fetch(apiURL2)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('rexburg').textContent = jsObject.weather[0].main;
    document.getElementById('temp2').textContent = Math.round(
      jsObject.main.temp
    );
    document.getElementById('hum2').textContent = jsObject.main.humidity;
    document.getElementById('ws2').textContent = Math.round(jsObject.wind.speed);
    document.getElementById('wind2').textContent = windchill(
      jsObject.main.temp,
      jsObject.wind.speed
    );
  });

  fetch(apiURL3)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('kansas3').textContent = jsObject.weather[0].main;
    document.getElementById('kansastemp3').textContent = Math.round(
      jsObject.main.temp
    );
    document.getElementById('hum3').textContent = jsObject.main.humidity;
    document.getElementById('ws3').textContent = jsObject.wind.speed;
    document.getElementById('kansaswind3').textContent = windchill(
      jsObject.main.temp,
      jsObject.wind.speed
    );
  });





fetch(apiURL4)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('oklahomacity').textContent = jsObject.weather[0].main;
    document.getElementById('temp4').textContent = Math.round(
      jsObject.main.temp
    );
    document.getElementById('hum4').textContent = jsObject.main.humidity;
    document.getElementById('ws4').textContent = Math.round(jsObject.wind.speed);
    document.getElementById('wind4').textContent = windchill(
      jsObject.main.temp,
      jsObject.wind.speed
    );
  });

temples = [109, 108, 103, 198];
temples.forEach((templeid) => {
  fetch(`https://nathan-byui-api.herokuapp.com/temples/${templeid}`, {
    headers: {
      apiKey:
        'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68XwZj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N',
    },
  })
    .then((response) => response.json())
    .then((jsObject) => {
      console.log(jsObject);

      let card = document.createElement('section');
      let image = document.createElement('img');
      image.setAttribute('src', jsObject.imageurl);
      image.alt = jsObject.city;
      let h2 = document.createElement('h2');
      h2.textContent = jsObject.name;
      let h3 = document.createElement('h3');
      h3.textContent = 'Phone: ' + jsObject.phone;
      let p = document.createElement('h3');
      p.textContent = 'Address: ' + jsObject.address1;
      let p2 = document.createElement('h3');
      p2.textContent = 'Services: ';
      let p22 = document.createElement('p');
      p22.textContent = jsObject.services[0];
      let p3 = document.createElement('p');
      p3.textContent = jsObject.services[1];
      let p4 = document.createElement('p');
      p4.textContent = jsObject.services[2];
      let p5 = document.createElement('p');
      p5.textContent = jsObject.services[3];
      let ptext = document.createElement('h3');
      ptext.textContent = 'Closure Schedule';
      let p55 = document.createElement('h3');
      p55.textContent = 'History: ';
      let p6 = document.createElement('p');
      p6.textContent = jsObject.Summary.facts[0];
      let p66 = document.createElement('p');
      p6.textContent = jsObject.Summary.facts[1];
      let p666 = document.createElement('p');
      p6.textContent = jsObject.Summary.facts[2];

      card.appendChild(image);
      card.appendChild(h2);
      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(p2);
      card.appendChild(p22);
      card.appendChild(p3);
      card.appendChild(p4);
      card.appendChild(p5);
      card.appendChild(ptext);
      for (const key of Object.keys(jsObject.closures)) {
       

        jsObject.closures[key].forEach((closure) => {
          console.log(closure);
          let p7 = document.createElement('p');
          p7.textContent =
            'Startdate: ' +
            closure.startdate +
            ' - ' +
            'Enddate: ' +
            closure.enddate;

          card.appendChild(p7);
        });
      }
      card.appendChild(p55);
      card.appendChild(p6);
      card.appendChild(p66);
      card.appendChild(p666);

      document.querySelector('div.cards').appendChild(card);
    });
});

function windchill(t, s) {
  let f = 35.74 + 0.6215 * t - 35.75 * s ** 0.16 + 0.4275 * t * s ** 0.16;
  if (f <= 50 && s > 3) {
    return Math.round(f);
  } else {
    return 'N/A';
  }
}


