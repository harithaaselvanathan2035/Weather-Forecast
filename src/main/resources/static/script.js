async function searchWeather() {



    let city = document.getElementById("city").value;

    const response = await fetch("/api/weather?city=" + city);

    const data = await response.json();

    if (data.cod === "404") {
        document.getElementById("result").innerHTML = "❌ City not found";
        return;
    }
     document.getElementById("info").style.display = "block";
    // Change video background based on weather
    changeBackground(data.weather[0].description.toLowerCase());

    document.getElementById("result").innerHTML = `
        <h2 style="
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        ">
            🌍 ${data.name}, ${data.sys.country}
        </h2>

        <p style="font-size: 20px; margin: 8px 0;">
            ☁️ <b>Weather :</b> ${data.weather[0].description}
        </p>

        <p style="font-size: 20px; margin: 8px 0;">
            🌡️ <b>Temperature :</b> ${data.main.temp}°C
        </p>

        <p style="font-size: 20px; margin: 8px 0;">
            💧 <b>Humidity :</b> ${data.main.humidity}%
        </p>

        <p style="font-size: 20px; margin: 8px 0;">
            🌬️ <b>Wind Speed :</b> ${data.wind.speed} m/s
        </p>
    `;


}



function changeBackground(weather) {
    if (weather.includes("rain")) {
        bgVideo.src = "/videos/rainy.mp4";
    } else if (weather.includes("cloud")) {
        bgVideo.src = "/videos/clouds.mp4";
    } else if (weather.includes("clear")) {
        bgVideo.src = "/videos/clearsky.mp4";
    } else if (weather.includes("snow")) {
        bgVideo.src = "/videos/snow.mp4";
    } else if (weather.includes("fog") || weather.includes("mist")) {
        bgVideo.src = "/videos/fog.mp4";
    } else if (weather.includes("thunder")) {
        bgVideo.src = "/videos/thunderstorm.mp4";
    } else {
        bgVideo.src = "/videos/clearsky.mp4";
    }
}
