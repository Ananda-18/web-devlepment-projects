document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value; // Get city input
    const apiKey = 'YOUR_AP_KEY'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url) // Fetch the weather data
        .then(response => {
            if (!response.ok) { // Check if response is okay
                throw new Error('City not found');
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            displayWeather(data); // Call function to display weather
        })
        .catch(error => {
            document.getElementById('weatherResult').innerText = error.message; // Display error message
        });
});

function displayWeather(data) {
    const { main, wind, weather } = data; // Destructure weather data
    const weatherResult = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Humidity: ${main.humidity} %</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Condition: ${weather[0].description}</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherResult; // Display weather info
}
