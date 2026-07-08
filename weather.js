document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://deno.dev{encodeURIComponent(city)}`;

    fetch(url)
        .then(response => response.json())
        .then(searchData => {
            if (!searchData.results || searchData.results.length === 0) {
                throw new Error('City not found. Please check the spelling.');
            }

            const location = searchData.results[0];
            const lat = location.latitude;
            const lon = location.longitude;
            const displayName = `${location.name}, ${location.country}`;

            const weatherUrl = `https://open-meteo.com{lat}&longitude=${lon}&current=temperature_2m,weather_code`;

            return fetch(weatherUrl).then(res => res.json()).then(weatherData => {
                return { name: displayName, weather: weatherData.current };
            });
        })
        .then(result => {
            const codeMap = {
                0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
                45: "Foggy", 48: "Depositing rime fog", 51: "Light drizzle", 
                53: "Moderate drizzle", 55: "Dense drizzle", 61: "Slight rain", 
                63: "Moderate rain", 65: "Heavy rain", 71: "Slight snow", 
                73: "Moderate snow", 75: "Heavy snow", 95: "Thunderstorm"
            };

            const conditionText = codeMap[result.weather.weather_code] || "Conditions varying";

            document.getElementById('cityName').innerText = result.name;
            document.getElementById('temperature').innerText = `${Math.round(result.weather.temperature_2m)}°C`;
            document.getElementById('description').innerText = conditionText;
            document.getElementById('weatherResult').style.display = 'block';
        })
        .catch(error => {
            alert(error.message || 'Error connecting to the weather network.');
        });
});
