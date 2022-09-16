let now = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) min = `0${min}`;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
h2.innerHTML = `${month} ${date}, ${year}`;
h3.innerHTML = `${day}`;
h4.innerHTML = `${hour}: ${min}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weatherType").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°F`;
  fahrenTemp=response.data.main.temp;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}% Humidity`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )}km/h Wind Speed`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCelciusTemperature(event){
  event.preventDefault();
  let celciusTemperature=(fahrTemp - 32) * 5/9 ;
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(celciusTemperature);
}

function displayfahrTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrTemp);
}

let fahrTemp=null; 


let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celciusLink=document.querySelector("#celciusLink");
celciusLink.addEventListener("click",displayCelciusTemperature)

let fahrLink=document.querySelector("#fahrLink");
fahrLink.addEventListener("click",displayfahrTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
