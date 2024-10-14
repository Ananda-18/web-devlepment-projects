document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value; 
    const apiKey = 'YOUR_AP_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url) 
        .then(response => {
            if (!response.ok) { 
                throw new Error('City not found');
            }
            return response.json(); 
        })
        .then(data => {
            displayWeather(data); 
        })
        .catch(error => {
            document.getElementById('weatherResult').innerText = error.message; 
        });
});

function displayWeather(data) {
    const { main, wind, weather } = data; 
    const weatherResult = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Condition: ${weather[0].description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherResult; 
}
