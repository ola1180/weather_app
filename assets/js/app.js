let weatherForm = document.querySelector('.weather__form')
let cityInput = document.querySelector('.weather__city')
let apiUrl = 'http://api.weatherapi.com/v1/current.json?key=a2d9f72be70a4af298b165515231506&aqi=no&q='
let apiDataContainer = document.querySelector('.weather__data')
let loader = document.querySelector('.weather__loader')
let gpsButton = document.querySelector('.weather__gps')

weatherForm.addEventListener('submit', (event) => {
showLoader()
    let city = cityInput.value
    let fullApiURl = apiUrl + city

    fetch(fullApiURl)
    .then(response => {
        hideLoader()
        if(response.status === 200) {
            return response.json()
        }
        throw new Error()

    })
    .then((dataFromApi)=> {
        // console.log(dataFromApi.current.temp_c)
        console.log(dataFromApi)
        cityInput.value = dataFromApi.location.name
        let view = ``
        view += `<div class="weather__info">`
        // county, city, time(region)
        view += `<div class="weather__region"> 
                <p>${dataFromApi.location.name}</p>
                <p>${dataFromApi.location.country}</p>
                <p> ${dataFromApi.location.localtime}</p>
        </div>`
 
        //icon
        view += `<div class="weather__icon"><img src= ${dataFromApi.current.condition.icon} 
        alt = ${dataFromApi.current.condition.text}></div >`
        //temp
        view += `<div class="weather__temp"> ${dataFromApi.current.temp_c} <span>&degC</span></div >`
 
        //details
        view += `<div class="weather__details">
                <p>The amount of rainfall: ${dataFromApi.current.precip_mm}mm </p>
                <p>Humidity: ${dataFromApi.current.humidity}%</p>
                <p>Wind: ${dataFromApi.current.wind_kph}km/h</p>
            </div>`
 
        view += `</div>`

        apiDataContainer.innerHTML = view
    }).catch((error) => showError())

    

    event.preventDefault()
})

let showError = () => {
    apiDataContainer.innerHTML = `<div class='weather__error'>City not found or thera are server problem</div>`
}

let showLoader = () => {
    loader.style.display = 'block'
}

let hideLoader = () => {
    loader.style.display = 'none'
}

//GPS

gpsButton.addEventListener('click', (event) => {
navigator.geolocation.getCurrentPosition(searchPosition)
})

let searchPosition = (position) => {
    cityInput.value = `${position.coords.latitude},${position.coords.longitude}`
    weatherForm.requestSubmit()
}

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
    	navigator.serviceWorker
        	.register("serviceWorker.js")
        	.then(res => console.log("service worker registered"))
        	.catch(err => console.log("service worker not registered", err))
	})
}