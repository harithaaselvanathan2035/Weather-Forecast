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



function changeBackground(description) {
    description = description.toLowerCase();
    const video = document.getElementById("bgVideo");

    // 🌧 RAIN & DRIZZLE
    const rainList = [
        "rain", "light rain", "moderate rain", "heavy rain", "shower",
        "drizzle", "light intensity drizzle", "heavy intensity drizzle",
        "drizzle rain", "ragged shower rain"
    ];

    // 🌩 THUNDERSTORM
    const thunderList = [
        "thunderstorm", "thunder", "storm", "thunderstorm with rain",
        "thunderstorm with heavy rain", "thunderstorm with drizzle",
        "thunderstorm with hail"
    ];

    // ❄ SNOW & ICE
    const snowList = [
        "snow", "light snow", "heavy snow", "sleet", "light sleet",
        "shower sleet", "light rain and snow", "rain and snow",
        "freezing rain", "freezing drizzle", "blizzard", "ice pellets"
    ];

    // 🌫 FOG / MIST / LOW VISIBILITY
    const fogList = [
        "fog", "mist", "haze", "smoke", "smog", "sand", "dust",
        "volcanic ash", "ash", "sandstorm", "duststorm", "squalls",
        "tornado", "funnel cloud", "freezing fog"
    ];

    // ☁ CLOUDS
    const cloudList = [
        "clouds", "few clouds", "scattered clouds", "broken clouds",
        "overcast clouds", "mostly cloudy", "partly cloudy"
    ];

    // 🌞 CLEAR SKY
    const clearList = [
        "clear", "clear sky", "sunny", "hot"
    ];

    // 🔥 EXTREME WEATHER
    const extremeList = [
        "tropical storm", "hurricane", "cold", "windy", "extreme"
    ];

    // 🌡 DEFAULT VIDEO
    let videoSrc = "/videos/clearsky.mp4";

    if (rainList.some(w => description.includes(w))) {
        videoSrc = "/videos/rainy.mp4";
    }
    else if (thunderList.some(w => description.includes(w))) {
        videoSrc = "/videos/thunderstorm.mp4";
    }
    else if (snowList.some(w => description.includes(w))) {
        videoSrc = "/videos/snow.mp4";
    }
    else if (fogList.some(w => description.includes(w))) {
        videoSrc = "/videos/fog.mp4";
    }
    else if (cloudList.some(w => description.includes(w))) {
        videoSrc = "/videos/clouds.mp4";
    }
    else if (clearList.some(w => description.includes(w))) {
        videoSrc = "/videos/clearsky.mp4";
    }
    else if (extremeList.some(w => description.includes(w))) {
        videoSrc = "/videos/thunderstorm.mp4"; // best match
    }

    video.src = videoSrc;
}

