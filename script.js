
//for btn
const fetchButton = document.getElementById("button");
//for iframe
const map = document.getElementById("googleMap");
//for landing page
const landing = document.getElementById("hidden");
//for making a container after clicking fetch button
const container = document.getElementById("display");
//for printing lat & long
const currentLocation = document.getElementById("latitude");
//for printing bottom container
const detail = document.getElementById("details");
//print map
function initMap(latitude, longitude) {
  map.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=18&output=embed`;
  currentLocation.innerHTML = `<p>Lat : ${latitude}</p>
                                 <p>Long : ${longitude}</p>`;
}
//fetched  weather api
async function currentWeather(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cb38692bd004c473f1b609a257eb5b37`;
  try {
    const response = await fetch(url);
    const weather = await response.json();
    //called weather details
    displayData(weather);
  } catch (error) {
    console.log(error);
  }
}

//change direction to degree
function degreeToDirection(degree) {
  if (degree >= 337.5 || degree < 22.5) {
    return "North";
  } else if (degree >= 22.5 && degree < 67.5) {
    return "North East";
  } else if (degree >= 67.5 && degree < 112.5) {
    return "East";
  } else if (degree >= 112.5 && degree < 157.5) {
    return "South East";
  } else if (degree >= 157.5 && degree < 202.5) {
    return "South";
  } else if (degree >= 202.5 && degree < 247.5) {
    return "South West";
  } else if (degree >= 247.5 && degree < 292.5) {
    return "West";
  } else {
    return "North West";
  }
}
//change time in gmt
function secondsToTimeZoneString(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const sign = hours >= 0 ? "+" : "-";
  return { sign, hours: Math.abs(hours), minutes, seconds: remainingSeconds };
}
//weather function
function displayData(weather) {
  const locationName = weather.name;
  const speed = Math.round(weather.wind.speed * 3.6);
  const humidity = weather.main.humidity;
  const time = secondsToTimeZoneString(weather.timezone);
  const pressure = Math.round(weather.main.pressure / 1013.25);
  const direction = degreeToDirection(weather.wind.deg);
  // uv index
  const temp = Math.round(weather.main.temp - 273.15);

  detail.innerHTML = `<div>Location : ${locationName}</div>
                        <div>Wind Speed : ${speed}kmph</div>
                        <div>Humidity : ${humidity} %</div>
                        <div>Time Zone : GMT ${time.sign}${time.hours}:${time.minutes}</div>
                        <div>Pressure : ${pressure}atm</div>
                        <div>Wind Direction : ${direction}</div>
                        <div>UV Index : 500</div>
                        <div>Feels like : ${temp}° C</div>
                       `;
}
//fetched geolocation
function fetchLocationData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      //map ko call kiya with latitude longitude
      initMap(latitude, longitude);
      //weather ko call kiya with latitude longitude
      currentWeather(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported in this browser.");
  }
}
//button click 
fetchButton.addEventListener("click", () => {
  fetchLocationData();
  landing.style.display = "none";
  container.style.display = "contents";
});