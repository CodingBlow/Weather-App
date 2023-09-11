const apiKeys = "771d18ea9d184944206461f85cdfdc20";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKeys}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
    }

    const data = await response.json();

    console.log(data);

    // Update HTML content inside the function
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update weather icon based on the weather condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "cloud.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "mist.png";
    } else {
      weatherIcon.src = "unknown.png"; // Default icon for unknown weather conditions
    }
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Error fetching or updating weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  // Call the function to fetch and update weather data
  checkWeather(searchBox.value);
});
