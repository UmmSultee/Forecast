function refreshWeather(response) {
    let cityElement = document.querySelector("#current-city");
    let timeElement = document.querySelector("#time");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let date = new Date(response.data.time *1000);
    

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
    temperatureElement.innerHTML = Math.round(temperature);



}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "saturday",
    ];

    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
        
    }
    return `${day} ${hours}:${minutes}`;
    
}

function getCity(city) {
    let apiKey = "0e07d3f80c4414708ec095toac29b8a4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    

    axios.get(apiUrl).then(refreshWeather);
}

getCity("Kano");

function searchInputSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    getCity(searchInputElement.value);

    
}

function forecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thurs",
        "Fri",
        "sat",
    ];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "0e07d3f80c4414708ec095toac29b8a4"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`

    axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
    let forecast = document.querySelector(".forecast");
    forecastFormat = "";
    response.data.daily.forEach(function (day, index) {

        if (index < 6) {
            forecastFormat = forecastFormat = `
            <div class="weather-forecast-day">
        <div class="weather-forecast-date">${forecastDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;

      
}

forecast.innerHTML = forecastFormat;

        
    })
}
        
    



let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchInputSubmit);