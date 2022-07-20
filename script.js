const loader = document.querySelector("#loading");

if (window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(successfulLookup),
    console.log;
}

async function successfulLookup(position) {
  let lat = await position.coords.latitude;
  let lon = await position.coords.longitude;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=69d30b66a929001be23d0422d1cff9b8&units=metric&lang=en
    `
  )
    .then((response) => response.json())
    .then((response) => buildSite(response));
}

async function fetchWeather(place) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=69d30b66a929001be23d0422d1cff9b8&units=metric&lang=en`
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
  place.innerHTML = `${data.name}, ${
    data.sys.country
  } <img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'>${
    data.weather[0].description
  } <span style='color: gray;'>${Math.round(data.main.temp_max)} | ${Math.round(
    data.main.temp_min
  )}</span>`;

  const currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `<i class="fa-solid fa-temperature-half"></i> Temperature: <strong> ${Math.round(
    data.main.temp
  )}°C </strong>`;

  const currentPressure = document.querySelector(".pressure");
  currentPressure.innerHTML = `<i class="fa-solid fa-arrow-down"></i> Pressure: <strong> ${data.main.pressure} Pa </strong>`;

  const currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: <strong> ${data.main.humidity}% </strong>`;

  const windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i>Wind: <strong> ${Math.round(
    data.wind.speed * 3.6
  )}km/h </strong> `;

  const cloud = document.querySelector(".clouds");
  cloud.innerHTML = `<i class="fa-solid fa-cloud"></i> Clouds: <strong>${data.clouds.all}%</strong>`;

  const desc = document.querySelector(".weatherDesc");
  desc.innerHTML = `<img src='http://openweathermap.org/img/w/${data.weather[0].icon}.png'><strong>${data.weather[0].description}</strong>`;
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
