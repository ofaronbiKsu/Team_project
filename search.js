document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "b929948ea60cb7281aa3fbc0cdcdb09d";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const searchInput = document.querySelector(".search input");
  const searchIcon = document.querySelector(".search img");

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const city = searchInput.value;
      fetchWeather(city);
    }
  });

  searchIcon.addEventListener("click", function () {
    const city = searchInput.value;
    fetchWeather(city);
  });

  function fetchWeather(city) {
    const url = `${BASE_URL}?q=${city}&APPID=${API_KEY}&units=imperial`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data);
        updateSearchResult(data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  function updateSearchResult(data) {
    console.log("Search Result Weather:", data);

    document.querySelector("[data-search-wind]").textContent = data.wind.speed;

    document.querySelector("[data-search-humidity]").textContent =
      data.main.humidity;

    document.querySelector(
      ".search-result .temperature"
    ).textContent = `${Math.round(data.main.temp)}°`;

    const weatherIcon = document.querySelector(".search-result [data-icon]");
    const iconSrc = getWeatherIcon(data.weather[0].icon);
    console.log("Weather Icon Src:", iconSrc);
    weatherIcon.src = iconSrc;

    document.querySelector(
      ".search-result h3"
    ).textContent = `${data.name}, ${data.sys.country}`;
  }

  function getWeatherIcon(iconCode) {
    const iconMap = {
      "01d": "/icons/sun.svg",
      "01n": "/icons/sun.svg",
      "02d": "/icons/cloud-sun.svg",
      "02n": "/icons/cloud-sun.svg",
      "03d": "/icons/cloud.svg",
      "03n": "/icons/cloud.svg",
      "04d": "/icons/cloud.svg",
      "04n": "/icons/cloud.svg",
      "09d": "/icons/rain.svg",
      "09n": "/icons/rain.svg",
      "10d": "/icons/rain.svg",
      "10n": "/icons/rain.svg",
      "11d": "/icons/rain.svg",
      "11n": "/icons/rain.svg",
      "13d": "/icons/snow.svg",
      "13n": "/icons/snow.svg",
      "50d": "/icons/cloud.svg",
      "50n": "/icons/cloud.svg",
    };

    return iconMap[iconCode] || "/icons/sun.svg";
  }
});
