const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=c1dcfb6c8efcda936d6f6f66d54711d8&units=imperial";
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    
    document.getElementById('temperaturePreston').textContent = Math.round(jsObject.main.temp);
    document.getElementById('desPreston').textContent = jsObject.weather[0].description;
    document.getElementById('humidityPreston').textContent = jsObject.main.humidity;
    document.getElementById('windSpeedPreston').textContent = Math.round(jsObject.wind.speed);
    
      let temperature = parseFloat(jsObject.main.temp);
      let windspeed = parseFloat(jsObject.wind.speed);
      
      let windchill = "N/A";
      if (temperature <= 50 && windspeed > 3) {
          windchill = windChill(temperature, windspeed) + "&deg;F";
      }
     
      document.getElementById("windChill").innerHTML = windchill;
     
      function windChill(tempF, speed) {
          windchill = 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speed, .16)) + (0.4275 * tempF * Math.pow(speed, .16));
          return windchill.toFixed(0);
      }

});





