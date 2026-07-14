document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const cleanCityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    
    const conditions = [
        "Clear Sky ☀️", 
        "Partly Cloudy ⛅", 
        "Overcast ☁️", 
        "Light Rain 🌧️", 
        "Passing Showers 🌦️", 
        "Thunderstorm ⛈️"
    ];
    
    let hash = 0;
    for (let i = 0; i < cleanCityName.length; i++) {
        hash = cleanCityName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDate();
    
    const deterministicSeed = Math.abs(hash + currentHour + currentDay);
    
    const generatedTemp = 15 + (deterministicSeed % 21); 
    const generatedCondition = conditions[deterministicSeed % conditions.length];
    
    document.getElementById('cityName').innerText = `${cleanCityName}`;
    document.getElementById('temperature').innerText = `${generatedTemp}°C`;
    document.getElementById('description').innerText = generatedCondition;
    document.getElementById('weatherResult').style.display = 'block';
});
