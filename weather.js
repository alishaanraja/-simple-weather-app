document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://wttr.in{city}?format=j1`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('City data not found');
            return response.json();
        })
        .then(data => {
            const currentCondition = data.current_condition[0];
            const area = data.nearest_area[0];
            
            const cityName = area.areaName[0].value;
            const countryName = area.country[0].value;
            
            document.getElementById('cityName').innerText = `${cityName}, ${countryName}`;
            document.getElementById('temperature').innerText = `${currentCondition.temp_C}°C`;
            document.getElementById('description').innerText = currentCondition.weatherDesc[0].value;
            document.getElementById('weatherResult').style.display = 'block';
        })
        .catch(error => {
            alert('Could not find that city. Please check the spelling.');
        });
});
