
const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json"


fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject['towns'];

    const fishfilter = towns.filter(x => x.name == "Fish Haven");
    let fishEvents = fishfilter[0].events;
    let ul = document.createElement('ul'); 

    fishEvents.forEach(event => {
    let listItem = document.createElement('li');
    listItem.innerHTML = event;
    ul.append(listItem);
  }); 

  document.getElementById("eventFish").appendChild(ul);
});