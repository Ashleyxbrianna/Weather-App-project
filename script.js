let now = new Date();

let dateAndTime = document.querySelector("#date-and-time");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
dateAndTime.innerHTML = `${day} ${date}, ${year}</br> ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "efab28113e51e691a1bd59a696552d60";
  let city = document.querySelector("#input-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "efab28113e51e691a1bd59a696552d60";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrent);
