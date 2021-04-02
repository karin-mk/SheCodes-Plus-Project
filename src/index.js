function newCity(cityName) {
  let dataInputCity = document.querySelector("#current-city");
  dataInputCity.innerHTML = ` ${cityName}`;
  switchCity(cityName); 
}

function switchCity(cityName) {
  let apiKey = `e2786f41f0156622c468940e038a0042`;
  let weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  let hourlyForecastDate = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=3&appid=${apiKey}&units=metric`;
  axios.get(weatherData).then(showWeather);
  axios.get(hourlyForecastDate).then(showHourlyForecast);
}

function showWeather(response) {
  let deg = Math.round([response.data.main.temp]);
  let temp = document.querySelector("#degree");
  let humidity = document.querySelector("#humidity-perc");
  let windSpeed = document.querySelector("#wind-speed");
  let sunset = document.querySelector("#sunset");
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let descriptor = document.querySelector("#weather-description");
  let iconCode = (response.data.weather[0].icon);
  let weatherIcon = document.querySelector("img");

  let changeColor = response.data.weather[0].main

  if (changeColor === "Rain") {
    city.classList.add("city-rain");
    city.classList.remove("city-clouds", "city-thunderstorm", "city-drizzle");
  };

  if (changeColor === "Clouds"){
    city.classList.add("city-clouds");
    city.classList.remove("city-rain", "city-thunderstorm", "city-drizzle");
  };

  if (changeColor === "Thunderstorm"){
    city.classList.add("city-thunderstorm");
    city.classList.remove("city-rain", "city-clouds", "city-drizzle");
  };

  if (changeColor === "Drizzle"){
    city.classList.add("city-drizzle");
    city.classList.remove("city-rain", "city-clouds", "city-thunderstorm");
  };

  if (changeColor !== "Rain" && changeColor !== "Clouds" && changeColor !== "Thunderstorm" && changeColor !== "Drizzle") {
    city.classList.remove("city-clouds", "city-thunderstorm", "city-drizzle", "city-rain");
  };

  celsiusTemperature = deg;
  temp.innerHTML = `${deg}`;
  humidity.innerHTML = `Humidity: ${[response.data.main.humidity]}%`;
  windSpeed.innerHTML = `Wind: ${Math.round([response.data.wind.speed])}km/h`;
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round([response.data.main.feels_like])}°C`;
  sunset.innerHTML = sunsetConversion(response.data.sys.sunset * 1000);
  descriptor.innerHTML = `${response.data.weather[0].description}`;
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${iconCode}@2x.png`);

  getDailyForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector(".form-control");
  newCity(citySearch.value);
}

function sunsetConversion(milliseconds) {
  let sunsetTime = new Date(milliseconds);
  let sunsetHour = sunsetTime.getHours();
  let sunsetMinutes = sunsetTime.getMinutes();
  return `Sunset: ${sunsetHour}:${sunsetMinutes}`;
}

function hourlyForecastConversion(milliseconds) {
let forecastTime = new Date(milliseconds);
let forecastHour = forecastTime.getHours();
return `${forecastHour}:00`
}


//Dailyly Forecast
function formatDay (date) {
  let dateconversion = new Date(date * 1000);
  let day = dateconversion.getDay();
  let days = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday" ]  

  return days[day];
}

function buildForecast(response) {
 
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = "";
  forecast.forEach(function (dailyForecast, index) {
    if (index < 5) {
  forecastHTML = forecastHTML +
   ` <div class="row">
        <div class="col-1"></div>
        <div class="col-4 forecast-weekday">${formatDay(dailyForecast.dt)}</div>
        <div class="col-2">
          <img
            src="https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png"
            width="44px"
            alt="weather forecast icon"
            />
        </div>
        <div class="col-4">
          <p class="sunny">
            <span class="forecast-temp-max">${Math.round(dailyForecast.temp.max)}°C </span>|
            <span class="forecast-temp-min"> ${Math.round(dailyForecast.temp.min)}°C</span>
          </p>
        </div>
      </div>
    `; }
  });

forecastElement.innerHTML = forecastHTML;          
}

function getDailyForecast(coordinates) {
  let myKey = `e2786f41f0156622c468940e038a0042`;
  let forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={minutely}&appid=${myKey}&units=metric`
  axios.get(forecastAPI).then(buildForecast);
}


function geoWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
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
  city.innerHTML = response.data.name;

  let humidity = document.querySelector("#humidity-perc");
  let windSpeed = document.querySelector("#wind-speed");
  let sunset = document.querySelector("#sunset");
  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  let descriptor = document.querySelector("#weather-description");
  let iconCode = (response.data.weather[0].icon);
  let weatherIcon = document.querySelector("img");

  humidity.innerHTML = `Humidity: ${[response.data.main.humidity]}%`;
  windSpeed.innerHTML = `Wind: ${Math.round([response.data.wind.speed])}km/h`;
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round([response.data.main.feels_like])}°C`;
  sunset.innerHTML = sunsetConversion(response.data.sys.sunset * 1000);
  descriptor.innerHTML = `${response.data.weather[0].description}`;
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${iconCode}@2x.png`);

  getDailyForecast(response.data.coord);

  let changeColor = response.data.weather[0].main;

  if (changeColor === "Rain") {
    city.classList.add("city-rain");
    city.classList.remove("city-clouds", "city-thunderstorm", "city-drizzle");
  };

  if (changeColor === "Clouds"){
    city.classList.add("city-clouds");
    city.classList.remove("city-rain", "city-thunderstorm", "city-drizzle");
  };

  if (changeColor === "Thunderstorm"){
    city.classList.add("city-thunderstorm");
    city.classList.remove("city-rain", "city-clouds", "city-drizzle");
  };

  if (changeColor === "Drizzle"){
    city.classList.add("city-drizzle");
    city.classList.remove("city-rain", "city-clouds", "city-thunderstorm");
  };

  if (changeColor !== "Rain" && changeColor !== "Clouds" && changeColor !== "Thunderstorm" && changeColor !== "Drizzle") {
    city.classList.remove("city-clouds", "city-thunderstorm", "city-drizzle", "city-rain");
  };

}

function searchMe() {
  navigator.geolocation.getCurrentPosition(geoWeather);
}

function showHourlyForecast(response) {
let timestampOne = (response.data.list[0].dt * 1000);
let timestampTwo = (response.data.list[1].dt * 1000);
let timestampThree = (response.data.list[2].dt * 1000);
 
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

hourlyIconOne.setAttribute("src", `https://openweathermap.org/img/wn/${timestampOneIconCode}@2x.png`);
hourlyIconTwo.setAttribute("src", `https://openweathermap.org/img/wn/${timestampTwoIconCode}@2x.png`);
hourlyIconThree.setAttribute("src", `https://openweathermap.org/img/wn/${timestampThreeIconCode}@2x.png`);
}

let city = document.querySelector("#current-city");

let changeCity = document.querySelector("form");
changeCity.addEventListener("submit", handleSubmit);

let myPosition = document.querySelector("#locate-me");
myPosition.addEventListener("click", searchMe);

newCity("Paris");

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
let body = document.querySelector("body");


if (hours > 20 || hours < 7) {
  body.classList.add("body-night");
  body.classList.remove("body-day");
} else {
  body.classList.add("body-day");
  body.classList.remove("body-night");  
};
