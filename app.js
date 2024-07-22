document.addEventListener("DOMContentLoaded", function () {
  const API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&daily" +
    "=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min," +
    "precipitation_sum,weather_code,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=" +
    "mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto";

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("API Data:", data);
      updateCurrentWeather(data.current_weather);
      updateForecast(data.daily);
      updateCityCountry(data.timezone);
    })
    .catch((error) => console.error("Error fetching weather data:", error));

  function updateCurrentWeather(current) {
    console.log("Current Weather:", current);
    document.querySelector("[data-current-temp]").textContent =
      current.temperature;
    document.querySelector("[data-current-wind]").textContent =
      current.windspeed;

    const weatherIcon = document.querySelector("[data-current-icon]");
    const iconSrc = getWeatherIcon(current.weathercode);
    console.log("Weather Icon Src:", iconSrc);
    weatherIcon.src = iconSrc;
  }

  function updateForecast(daily) {
    const daySection = document.querySelector("[data-day-section]");
    daySection.innerHTML = "";

    const template = document.querySelector("#day-card-template");
    console.log("Daily Forecast:", daily);

    daily.time.forEach((time, index) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector("[data-day]").textContent = new Date(
        time * 1000
      ).toLocaleDateString("en-US", { weekday: "long" });
      clone.querySelector("[data-temp]").textContent =
        daily.temperature_2m_max[index];
      clone.querySelector("[data-icon]").src = getWeatherIcon(
        daily.weather_code[index]
      );

      daySection.appendChild(clone);
    });

    document.querySelector("[data-current-high]").textContent =
      daily.temperature_2m_max[0];
    document.querySelector("[data-current-fl-high]").textContent =
      daily.apparent_temperature_max[0];
    document.querySelector("[data-current-low]").textContent =
      daily.temperature_2m_min[0];
    document.querySelector("[data-current-fl-low]").textContent =
      daily.apparent_temperature_min[0];
    document.querySelector("[data-current-precip]").textContent =
      daily.precipitation_sum[0];
  }

  function getWeatherIcon(weatherCode) {
    const weatherIcons = {
      0: "/icons/sun.svg",
      1: "/icons/cloud-sun.svg",
      2: "/icons/cloud.svg",
      3: "/icons/cloud.svg",
      61: "/icons/rain.svg",
      63: "/icons/rain.svg",
      65: "/icons/rain.svg",
      71: "/icons/snow.svg",
      73: "/icons/snow.svg",
      75: "/icons/snow.svg",
    };

    return weatherIcons[weatherCode] || "/icons/sun.svg";
  }

  function updateCityCountry(timezone) {
    document.querySelector("[data-city-country]").textContent =
      timezone.replace("/", " ");
  }
});
