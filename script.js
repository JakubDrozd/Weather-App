let cityLat = "";
let cityLon = "";
let weather = fetch(
  "http://api.openweathermap.org/geo/1.0/direct?q=Warsaw&limit=5&appid=69d30b66a929001be23d0422d1cff9b8"
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response[0].lat);
  })
  .catch((err) => console.log(err));
