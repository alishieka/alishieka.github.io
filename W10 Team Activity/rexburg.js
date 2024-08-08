const url =
   "https://api.openweathermap.org/data/2.5/forecast?id=5605242&units=imperial&appid=744fe90a723fbf1d7ad8053159c6a1d5";

const dofW = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Frid", "Sat"]; 


function cDay(weatherObjct) {
   let weatherData = weatherObjct.list[0];

   let dt = new Date(weatherData.dt_txt);
   let cDay = document.createElement('h3');
   cDay.textContent = dofW[dt.getDay()];
   

   let cTemp = document.createElement("p");
   cTemp.textContent = `Air Temp: ${Math.round(weatherData.main.temp)} °F`;

   let cWeather = document.createElement("img");
   let imagesrc =
      "https://openweathermap.org/img/w/" +
      weatherData.weather[0].icon +
      ".png";
   cWeather.setAttribute("src", imagesrc);
   cWeather.setAttribute("alt", weatherData.weather[0].description);

   let cFeels = document.createElement("p");
   cFeels.textContent = `Feels-like: ${Math.round(weatherData.main.feels_like)} °F`;

   let tempHigh = document.createElement("p");
   tempHigh.textContent = `Max Temp: ${Math.round(weatherData.main.temp_max)} °F`;

   let tempLow = document.createElement("p");
   tempLow.textContent = `Min Temp: ${Math.round(weatherData.main.temp_min)} °F`;

   let todayElem = document.querySelector("#today");

   todayElem.appendChild(cDay);
   todayElem.appendChild(cWeather);
   todayElem.appendChild(cTemp);
   todayElem.appendChild(cFeels);
   todayElem.appendChild(tempHigh);
   todayElem.appendChild(tempLow);

}

fetch(url)

   .then((response) => {
      return response.json();
   })
   .then((weatherObjct) => {
      cDay(weatherObjct);
      fiveDay(weatherObjct);
   });

   function fiveDay(weatherObjct) {
      const forecast = weatherObjct.list;
      const size = forecast.length;
      const fiveDayElem = document.querySelector('#fiveDay');
      let fiveDayList = [...fiveDayElem.children];
  
      let i2 = 0;
      for (let i = 0; i < size; i++) {
          if (forecast[i].dt_txt.includes('15:00:00')) {
              let highTempElem = document.createElement('p');
              highTempElem.textContent = `Max Temp: ${Math.round(forecast[i].main.temp_max)} °F`;
  
              let fiveWeather = document.createElement('img');
              let imagesrc = "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png";
              fiveWeather.setAttribute("src", imagesrc)
              fiveWeather.setAttribute("alt", forecast[i].weather[0].description)
              
              let dt = new Date(forecast[i].dt_txt);
              let dayElem = document.createElement('h3');
              dayElem.textContent = dofW[dt.getDay()];
              
              
              fiveDayList[i2].appendChild(dayElem);
              fiveDayList[i2].appendChild(highTempElem);
              fiveDayList[i2].appendChild(fiveWeather);
  
              i2++;
          }
      }
  }
