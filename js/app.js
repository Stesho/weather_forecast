let dayButton = document.querySelector('.forecast-type_dayly');
let weekButton = document.querySelector('.forecast-type_weekly');
let showWeatherButton = document.querySelector('.btn');

window.addEventListener('load', () => {
    let btn = document.querySelector('.day');
    let lon;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            let city = document.querySelector('.timezone_input-field');
            let apiKey = 'pk.231ddd06923d3f5bbf9939408619bc0b';
            let api = `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    city.value = data.address.city;
                    showWeather();
                });
        })
    }
    else {
        city.value = 'London';
        showWeather();
    }
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
    let apiKey = '8d410c4d25751a2ffc588b6019d83a8b';
    let part = 'current';
    let cityName = document.querySelector('.timezone_input-field').value;
    let city = cities.find(item => item.name === cityName);
    let lat = city.coord.lat;
    let lon = city.coord.lon;
    
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let btn = document.querySelector('.day');
            let day = document.querySelectorAll('.weather_day');
            let temperature = document.querySelectorAll('.weather_temperature');
            let icon = document.querySelectorAll('.weather_image');
            let description = document.querySelectorAll('.weather_description');

            let week =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let weatherIcons = {
                '01d': 'icon-wi-day-sunny',
                '01n': 'icon-wi-night-clear',
                '02d': 'icon-wi-day-cloudy',
                '02n': 'icon-wi-night-cloudy',
                '03d': 'icon-wi-cloud',
                '03n': 'icon-wi-cloud',
                '04d': 'icon-wi-cloudy',
                '04n': 'icon-wi-cloudy',
                '09d': 'icon-wi-showers',
                '09n': 'icon-wi-showers',
                '10d': 'icon-wi-day-rain',
                '10n': 'icon-wi-night-rain',
                '11d': 'icon-wi-storm-showers',
                '11n': 'icon-wi-storm-showers',
                '13d': 'icon-wi-day-snow',
                '13n': 'icon-wi-night-snow',
                '50d': 'icon-wi-day-fog',
                '50n': 'icon-wi-night-fog',
            }

            if(btn.checked === true) {
                for(let i = 0, j = 0; i < day.length; i++, j+=3) {
                    let currentTime = new Date(data.hourly[j].dt*1000);
                    day[i].innerHTML = currentTime.getHours() + ':00';
                    temperature[i].innerHTML = 'temp: ' + (data.hourly[j].temp-273.15).toFixed(1) + '&deg;С';
                    icon[i].className = `weather_image ${weatherIcons[data.hourly[j].weather[0].icon]}`;
                    description[i].innerHTML = data.hourly[j].weather[0].description;
                }
            }
            else {
                for(let i = 0; i < day.length; i++) {
                    let currentDay = new Date(data.daily[i].dt*1000);
                    day[i].innerHTML = week[currentDay.getDay()];
                    temperature[i].innerHTML = 'day: ' + (data.daily[i].temp.day-273.15).toFixed(1) + '&deg;С';
                    temperature[i].innerHTML += '<br/>night: ' + (data.daily[i].temp.night-273.15).toFixed(1) + '&deg;С';
                    icon[i].className = `weather_image ${weatherIcons[data.daily[i].weather[0].icon]}`;
                    description[i].innerHTML = data.daily[i].weather[0].description;
                }
            }
        });
}

