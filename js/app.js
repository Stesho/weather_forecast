let dayButton = document.querySelector('.forecast-type_dayly');
let weekButton = document.querySelector('.forecast-type_weekly');
let showWeatherButton = document.querySelector('.btn');

window.addEventListener('load', () => {
    let btn = document.querySelector('.day');
    let city = document.querySelector('.timezone_input-field');
    city.value = "Minsk";
    btn.checked = true;
    dayButton.style.background = '#4F5D73';
    dayButton.style.color = '#fff';
});

dayButton.addEventListener('click', () => {
    dayButton.style.background = '#4F5D73';
    dayButton.style.color = '#fff';
    weekButton.style.background = '#E6E6FF';
    weekButton.style.color = '#4F5D73';
});
// dayButton.addEventListener('mouseover', () => {
//     dayButton.style.background = '#4F5D73';
//     dayButton.style.color = '#fff';
// });
// dayButton.addEventListener('mouseout', () => {
//     dayButton.style.background = '#E6E6FF';
//     dayButton.style.color = '#4F5D73';
// });

weekButton.addEventListener('click', () => {
    weekButton.style.background = '#4F5D73';
    weekButton.style.color = '#fff';
    dayButton.style.background = '#E6E6FF';
    dayButton.style.color = '#4F5D73';
});

showWeatherButton.addEventListener('click', () => {
    showWeather();
});

function showWeather() {
    const cityName = document.querySelector('.timezone_input-field').value;
    const apiKey = '8d410c4d25751a2ffc588b6019d83a8b';
    const part = 'current';
    const city = cities.find(item => item.name === cityName);
    const lat = city.coord.lat;
    const long = city.coord.lon;
    
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${apiKey}`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let day = document.querySelectorAll('.weather_day');
            let temperature = document.querySelectorAll('.weather_temperature');
            let icon = document.querySelectorAll('.weather_image');

            let currentDay = Date(data.daily[0].dt*1000).split(' ')[0];
            let week =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            let weatherIcons = {
                '01d': 'wi-day-sunny.svg',
                '01n': 'wi-night-clear.svg',
                '02d': 'wi-day-cloudy.svg',
                '02n': 'wi-night-alt-cloudy.svg',
                '03d': 'wi-cloud.svg',
                '03n': 'wi-cloud.svg',
                '04d': 'wi-cloudy.svg',
                '04n': 'wi-cloudy.svg',
                '09d': 'wi-showers.svg',
                '09n': 'wi-showers.svg',
                '10d': 'wi-day-rain.svg',
                '10n': 'wi-night-alt-rain.svg',
                '11d': 'wi-storm-showers.svg',
                '11n': 'wi-storm-showers.svg',
                '13d': 'wi-day-snow.svg',
                '13n': 'wi-night-alt-snow.svg',
                '50d': 'wi-day-fog.svg',
                '50n': 'wi-night-fog.svg',
            }

            for(let i = 0, j = week.indexOf(currentDay); i < day.length; i++, j++) {
                if(j === 7) j = 0;
                day[i].innerHTML = week[j];
                temperature[i].innerHTML = (data.daily[i].feels_like.day-273.15).toFixed(1) + '&deg;С';
                icon[i].src = `./img/${weatherIcons[data.daily[i].weather[0].icon]}`;
            }
        });
}


