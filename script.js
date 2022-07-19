const loader = document.querySelector("#loading");

if (window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(successfulLookup),
    console.log;
}

async function successfulLookup(position) {
  displayLoading();
  let lat = await position.coords.latitude;
  let lon = await position.coords.longitude;
  fetch(
    `http://api.weatherstack.com/current?access_key=8632c375ab98fef7197a62b66a5fee10&query=${lat},${lon}`
  )
    .then((response) => response.json())
    .then((response) => buildSite(response));
  hideLoading();
}

async function fetchWeather(place) {
  fetch(
    `http://api.weatherstack.com/current?access_key=8632c375ab98fef7197a62b66a5fee10&query=${place}`
  )
    .then((data) => data.json())
    .then((data) => buildSite(data));
}

function buildSite(data) {
  console.log(data);

  if (data === undefined) {
    window.navigator.geolocation.getCurrentPosition(successfulLookup);
  }

  const place = document.querySelector(".sfw-normal");
  place.textContent = `${data.location.name}, ${data.location.country}        ${data.current.observation_time}`;

  const currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `<i class="fa-solid fa-temperature-half"></i> Temperature: <strong> ${data.current.temperature}°C </strong>`;

  const currentPressure = document.querySelector(".pressure");
  currentPressure.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Pressure: <strong> ${data.current.pressure} Pa </strong>`;

  const currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: <strong> ${data.current.humidity}% </strong>`;

  const windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i>Wind: <strong> ${data.current.wind_speed}km/h </strong> `;
}

const searchBtn = document.querySelector("#basic-addon2");
searchBtn.addEventListener("click", (event) => {
  const searchField = document.querySelector(`.form-control`);
  let city = searchField.value;
  fetchWeather(city);
});

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}
