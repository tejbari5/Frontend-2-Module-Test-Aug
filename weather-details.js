const latitude = document.getElementById("lat");
const longitude = document.getElementById("long");
const main = document.getElementById("main");
const weatherData = document.getElementById("weather-info");


window.addEventListener("load", () => {
    let coords = document.cookie.split(";").map(x => {return x.trim()});
    
    let newCoords = {}
    console.log(coords);
    for(let i = 0; i<coords.length ;i++){
        let tempCoords = [];
        tempCoords = coords[i].split("=");
        console.log(tempCoords)
        newCoords[tempCoords[0]] = tempCoords[1];
    }

    latitude.innerText = "Lat: " + newCoords.latitude;
    longitude.innerText = "Long: " + newCoords.longitude;
    
    const div = document.createElement("div");
    div.className = "location";
    div.innerHTML = `
            <iframe class="map" src="https://maps.google.com/maps?q=${newCoords.latitude}, ${newCoords.longitude}&z=18&output=embed" width="90%" height="100%" frameborder="0" style="border:0"></iframe>
    `;
    main.appendChild(div);
    fetchWeatherData(newCoords.latitude, newCoords.longitude);

    const elementsToShow = document.querySelectorAll("body *");
    elementsToShow.forEach((element) => {
        console.log(element);
      element.classList.add("fade-in");
    });
    
});

const openWeatherAPI = `d2e6c9019743a5e2b41d19c98653f36b`


async function fetchWeatherData(latitude,longitude){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPI}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        weatherData.innerHTML = `
        <span>Location : ${result.name}</span>
        <span>Wind-Speed : ${((result.wind.speed)*3.6).toFixed(2)} kmph</span>
        <span>Humidity : ${result.main.humidity}%</span>
        <span>Time Zone : GMT+5:30</span>
        <span>Pressure : ${(result.main.pressure * 0.000987).toFixed()}atm</span>
        <span>Wind Direction : ${getWindDirection(
          result.wind.deg
        )}</span>
        <span>Feels like : ${(
          result.main.feels_like - 273.15
        ).toFixed()}&deg;</span>
    `;
    }catch(error){
        alert("Some error has occurred, please try after some time")
        console.log(error);
    }
    
}

function getWindDirection(degrees) {
    const directions = [
      "North",
      "North-North-East",
      "North-East",
      "East-North-East",
      "East",
      "East-South-East",
      "South-East",
      "South-South-East",
      "South",
      "South-South-West",
      "South-West",
      "West-South-West",
      "West",
      "West-North-West",
      "North-West",
      "North-NorthWest",
    ];

    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}