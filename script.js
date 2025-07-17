const apiKey = "dc41ed29ab94001e863da24a0bdce5f3"; //API key for OpenWeatherMap

function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => showWeather(data))
    .catch(error => {
      document.getElementById("result").innerHTML = "Error fetching weather!";
      console.error(error);
    });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => showWeather(data))
        .catch(error => {
          document.getElementById("result").innerHTML = "Error getting location weather.";
          console.error(error);
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("result").innerHTML = "City not found!";
    return;
  }

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("result").innerHTML = weatherHTML;
}
