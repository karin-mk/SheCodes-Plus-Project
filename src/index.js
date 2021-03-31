function newCity(event) {
  event.preventDefault();
  let cityName = citySearch.value;
  console.log(cityName);
  city.innerHTML = ` ${citySearch.value}`;
  switchCity(cityName); 
}

function switchCity() {
  let apiKey = `e2786f41f0156622c468940e038a0042`;
  let weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;
  let hourlyForecastDate = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch.value}&cnt=3&appid=${apiKey}&units=metric`
  axios.get(weatherData).then(showWeather);
  axios.get(hourlyForecastDate).then(showHourlyForecast);
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

  celsiusTemperature = deg;
  temp.innerHTML = `${deg}`;
  humidity.innerHTML = `Humidity: ${[response.data.main.humidity]}%`;
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round([response.data.main.feels_like])}°C`;
  sunset.innerHTML = sunsetConversion(response.data.sys.sunset * 1000);
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
}

function hourlyForecastConversion(milliseconds) {
let forecastTime = new Date(milliseconds);
let forecastHour = forecastTime.getHours();
return `${forecastHour}:00`
}


function showHourlyForecast(response) {
  console.log(response);

let timestampOne = (response.data.list[0].dt * 1000);
let timestampTwo = (response.data.list[1].dt * 1000);
let timestampThree = (response.data.list[2].dt * 1000);
console.log(response.data.list[0]);
 
let forecastTimestampOne = document.querySelector("#timestamp-1");
let forecastTimestampTwo = document.querySelector("#timestamp-2");
let forecastTimestampThree = document.querySelector("#timestamp-3");

forecastTimestampOne.innerHTML = hourlyForecastConversion(timestampOne);
forecastTimestampTwo.innerHTML = hourlyForecastConversion(timestampTwo);
forecastTimestampThree.innerHTML = hourlyForecastConversion(timestampThree);

let timestampOneTemp = Math.round(response.data.list[0].main.temp);
let timestampTwoTemp = Math.round(response.data.list[1].main.temp);
let timestampThreeTemp = Math.round(response.data.list[2].main.temp);

let forecastTimestampOneTemp = document.querySelector("#hourly-forecast-temp-1");
let forecastTimestampTwoTemp = document.querySelector("#hourly-forecast-temp-2");
let forecastTimestampThreeTemp = document.querySelector("#hourly-forecast-temp-3");

forecastTimestampOneTemp.innerHTML = `${timestampOneTemp} °C`
forecastTimestampTwoTemp.innerHTML = `${timestampTwoTemp}°C` 
forecastTimestampThreeTemp.innerHTML = `${timestampThreeTemp}°C` 

let timestampOneIconCode = (response.data.list[0].weather[0].icon);
let timestampTwoIconCode = (response.data.list[1].weather[0].icon);
let timestampThreeIconCode = (response.data.list[2].weather[0].icon);

let hourlyIconOne = document.querySelector("#hourly-forecast-icon-1");
let hourlyIconTwo = document.querySelector("#hourly-forecast-icon-2");
let hourlyIconThree = document.querySelector("#hourly-forecast-icon-3");

hourlyIconOne.setAttribute("src", `http://openweathermap.org/img/wn/${timestampOneIconCode}@2x.png`);
hourlyIconTwo.setAttribute("src", `http://openweathermap.org/img/wn/${timestampTwoIconCode}@2x.png`);
hourlyIconThree.setAttribute("src", `http://openweathermap.org/img/wn/${timestampThreeIconCode}@2x.png`);
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
  let geoForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${myKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  axios.get(geoForecastUrl).then(showHourlyForecast);
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
  temperature.innerHTML = celsiusTemperature;
  changeCelsius.classList.remove("active");
  changeFahrenheit.classList.add("active");
}
function convertFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32) ;
  temperature.innerHTML = tempFahrenheit;
  changeCelsius.classList.add("active");
  changeFahrenheit.classList.remove("active");
}

let celsiusTemperature = null;
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
