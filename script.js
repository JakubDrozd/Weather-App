if (window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(
    successfulLookup,
    console.log
  );
}

async function successfulLookup(position) {
  let lat = await position.coords.latitude;
  let lon = await position.coords.longitude;
  fetch(
    `http://api.weatherstack.com/current?access_key=8632c375ab98fef7197a62b66a5fee10&query=${lat},${lon}`
  )
    .then((response) => response.json())
    .then((response) => buildSite(response));
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
  const place = document.querySelector(".mb-1.sfw-normal");
  place.textContent = `${data.location.name}, ${data.location.country}        ${data.current.observation_time}`;
  const currentTemp = document.querySelector("p.mb-2:nth-child(1)");
  currentTemp.innerHTML = `Current temperature: <strong> ${data.current.temperature}°C </strong>`;
}
