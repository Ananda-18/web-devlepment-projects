const apiKey = '45b072368756cca7df893cd72a1f9d7e';
const forecastChart = document.getElementById('forecast-chart').getContext('2d');
let chart;

displayLoadingMessage();
// Fetch current location or set to Delhi
navigator.geolocation.getCurrentPosition(setLocation, () => getWeatherData('Delhi'));

function setLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherDataByCoords(lat, lon);
}

async function getWeatherData(city = 'Delhi') {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      displayCurrentWeather(data);
      getForecast(city);
    } catch (error) {
      alert("Could not fetch weather data. Please try again.");
    }
  }

async function getWeatherDataByCoords(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  displayCurrentWeather(data);
  getForecast(data.name);
}

function displayLoadingMessage() {
    document.getElementById('condition').innerText = 'Loading...';
    document.getElementById('temperature').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('wind-speed').innerText = '';
    document.getElementById('date-time').innerText = '';
  }
  
function displayCurrentWeather(data) {
  document.getElementById('condition').innerText = `Condition: ${data.weather[0].description}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('date-time').innerText = `Date/Time: ${new Date(data.dt * 1000).toLocaleString()}`;
}

async function getForecast(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  const temps = data.list.map(item => item.main.temp);
  const humidity = data.list.map(item => item.main.humidity);
  const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleString());

  if (chart) chart.destroy();
  chart = new Chart(forecastChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temps,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        },
        {
          label: 'Humidity (%)',
          data: humidity,
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date/Time'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    }
  });
}