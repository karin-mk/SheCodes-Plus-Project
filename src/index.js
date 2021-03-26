function newCity(event) {
  event.preventDefault();
  let cityName = citySearch.value;
  console.log(cityName);
  city.innerHTML = `${citySearch.value}`;
  switchCity(cityName); 
}

function switchCity() {
  let apiKey = `e2786f41f0156622c468940e038a0042`;
  let weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherData).then(showWeather);
}

function sunsetConversion(milliseconds) {
  let sunsetTime = new Date(milliseconds);
  let sunsetHour = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  return `Sunset: ${sunsetHour}:${sunsetMinutes}`;
}


function showWeather(response) {
  console.log(response);
  let deg = Math.round([response.data.main.temp]);
  let temp = document.querySelector("#degree");
  let humidity = document.querySelector("#humidity-perc");
  let sunset = document.querySelector("#sunset");
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let iconCode = (response.data.weather[0].icon);
  let weatherIcon = document.querySelector("img");

  temp.innerHTML = `${deg}`;
  humidity.innerHTML = `Humidity: ${[response.data.main.humidity]}%`;
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round([response.data.main.feels_like])}°C`;
  sunset.innerHTML = sunsetConversion(response.data.sys.sunset * 1000);
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
}

let city = document.querySelector("#current-city");
let citySearch = document.querySelector(".form-control");
let changeCity = document.querySelector("form");
changeCity.addEventListener("submit", newCity);

function geoWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let myKey = `e2786f41f0156622c468940e038a0042`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let geoTemp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#degree");
  heading.innerHTML = `${geoTemp}`;
  console.log([response.data.name]);
  city.innerHTML = response.data.name;
}

function searchMe() {
  navigator.geolocation.getCurrentPosition(geoWeather);
}

let myPosition = document.querySelector("#locate-me");
myPosition.addEventListener("click", searchMe);

//Change Unit
function convertCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = "15";
}
function convertFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = "59";
}

let temperature = document.querySelector("#degree");
let changeCelsius = document.querySelector("#degree-celsius");
changeCelsius.addEventListener("click", convertCelsius);

let changeFahrenheit = document.querySelector("#degree-fahrenheit");
changeFahrenheit.addEventListener("click", convertFahrenheit);

//Display time
let time = new Date();
let hours = time.getHours();
let mins = time.getMinutes();
let secs = time.getSeconds();
let wdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekday = wdays[time.getDay()];

let displayTime = document.querySelector("#time-now");
displayTime.innerHTML = `${weekday}, ${hours}:${mins}:${secs}`;
