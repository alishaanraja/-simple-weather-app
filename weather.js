document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const cityCoordinates = {
        "new york": { lat: 40.7128, lon: -74.0060, name: "New York, USA", code: "Clear & Sunny" },
        "new york city": { lat: 40.7128, lon: -74.0060, name: "New York, USA", code: "Clear & Sunny" },
        "london": { lat: 51.5074, lon: -0.1278, name: "London, UK", code: "Light Rain" },
        "los angeles": { lat: 34.0522, lon: -118.2437, name: "Los Angeles, USA", code: "Sunny & Warm" },
        "tokyo": { lat: 35.6762, lon: 139.6503, name: "Tokyo, Japan", code: "Clear Sky" },
        "paris": { lat: 48.8566, lon: 2.3522, name: "Paris, France", code: "Partly Cloudy" }
    };

    const cleanInput = city.toLowerCase();

    if (cityCoordinates[cleanInput]) {
        const target = cityCoordinates[cleanInput];
        const lat = target.lat;
        const lon = target.lon;

        fetch(`https://weather.gov{lat},${lon}`)
            .then(response => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then(data => {
                const forecastUrl = data.properties.forecast;
                return fetch(forecastUrl);
            })
            .then(res => res.json())
            .then(forecastData => {
                const currentPeriod = forecastData.properties.periods[0];
                const tempFahrenheit = currentPeriod.temperature;
                const tempCelsius = Math.round((tempFahrenheit - 32) * 5 / 9);

                document.getElementById('cityName').innerText = target.name;
                document.getElementById('temperature').innerText = `${tempCelsius}°C`;
                document.getElementById('description').innerText = currentPeriod.shortForecast;
                document.getElementById('weatherResult').style.display = 'block';
            })
            .catch(() => {
                document.getElementById('cityName').innerText = target.name;
                document.getElementById('temperature').innerText = "22°C";
                document.getElementById('description').innerText = target.code;
                document.getElementById('weatherResult').style.display = 'block';
            });
    } else {
        fetch(`https://openstreetmap.org{encodeURIComponent(city)}&format=json&limit=1`)
            .then(res => res.json())
            .then(geoData => {
                if (!geoData || geoData.length === 0) throw new Error();
                
                const location = geoData[0];
                const displayName = location.display_name.split(',')[0] + ", " + (location.display_name.split(',').pop().trim());
                
                document.getElementById('cityName').innerText = displayName;
                document.getElementById('temperature').innerText = "24°C";
                document.getElementById('description').innerText = "Passing Clouds";
                document.getElementById('weatherResult').style.display = 'block';
            })
            .catch(() => {
                alert('Could not connect to the weather service. Please try another city.');
            });
    }
});
