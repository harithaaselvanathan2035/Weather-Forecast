async function searchWeather() {



    let city = document.getElementById("city").value;

    const response = await fetch(`http://localhost:8081/api/weather?city=${city}`);
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
    const video = document.getElementById("bgVideo");
    const has = arr => arr.some(word => weather.includes(word));

    if (has(["clear", "sunny", "bright"])) {
        video.src = "http://localhost:8081/videos/clearsky.mp4";
    }
    else if (has(["cloud", "overcast"])) {
        video.src = "http://localhost:8081/videos/clouds.mp4";
    }
    else if (has(["rain", "drizzle", "shower"])) {
        video.src = "http://localhost:8081/videos/rainy.mp4";
    }
    else if (has(["thunder", "storm", "lightning"])) {
        video.src = "http://localhost:8081/videos/thunderstorm.mp4";
    }
    else if (has(["snow","snowfall"])) {
        video.src = "http://localhost:8081/videos/snow.mp4";
    }
    else if (has(["fog", "mist", "haze","smoke"])) {
        video.src = "http://localhost:8081/videos/fog.mp4";
    }
}
