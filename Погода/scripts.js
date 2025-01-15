let apiKey = "5aab3c8cb41eb997f34a0f5fa40e98ed";
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");

let cel; 

async function checkWeather(city) {
    try {
      const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Город не найден. Проверьте ввод.");
        } else {
          throw new Error("Не удалось получить данные о погоде.");
        }
      }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    const tempCelcius = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = tempCelcius + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;

    if (data.weather[0].main === "Clouds") {
        weather_icon.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weather_icon.src = "./images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weather_icon.src = "./images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weather_icon.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weather_icon.src = "./images/mist.png";
    }
    
      

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";

   
    cel = tempCelcius;
  } catch (error) {
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error(error);
  }
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});


document.getElementById("farenheit").addEventListener("click", () => {
  if (cel !== undefined) {
    let fer = Math.floor(cel * 1.8 + 32);
    document.querySelector(".temp").innerHTML = fer + "°F";
  }
});


document.getElementById("celcius").addEventListener("click", () => {
  if (cel !== undefined) {
    document.querySelector(".temp").innerHTML = cel + "°C";
  }
});