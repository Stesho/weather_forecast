let dayButton = document.querySelector('.forecast-type_dayly');
let weekButton = document.querySelector('.forecast-type_weekly');

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
dayButton.addEventListener('', () => {
    
});

weekButton.addEventListener('click', () => {
    weekButton.style.background = '#4F5D73';
    weekButton.style.color = '#fff';
    dayButton.style.background = '#E6E6FF';
    dayButton.style.color = '#4F5D73';
});


// let temp = document.querySelector('.head-location');

// window.addEventListener('load', () => {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => { 
//             let long = position.coords.longitude;
//             let lat = position.coords.latitude; 
//             let apiKey = '8d410c4d25751a2ffc588b6019d83a8b';
//             let part = 'current';

//             //console.log(cities.findIndex(item => item.name === 'Minsk' ? true : false));
            
            
            
//             const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${apiKey}`;
//             //const api = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${apiKey}`;
//             fetch(api)
//                 .then(response => {
//                     return response.json()
//                 })
//                 .then(data => {
//                     console.log(data)
//                 });
//         });
//     }
// });


