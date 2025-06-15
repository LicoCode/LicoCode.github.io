import { preloadImages } from './preload.js';
import { updateDayNightstate } from './daynight.js';
import { updateStatus } from './status.js';
import { updateWeatherEffects } from './weather.js';
import { fetchLocation, fetchAddressByIP, fetchWeatherByCoordinates } from './weatherService.js';

async function init() {
    try {
        const coordinates = await getCoordinates();
        const weatherInfo = await getWeatherInfo(coordinates);
        if (weatherInfo) {
            updateStatus(weatherInfo.time);
            updateDayNightstate(weatherInfo.time, weatherInfo.sunrise, weatherInfo.sunset);
            updateWeatherEffects(weatherInfo.weatherCode, weatherInfo.windSpeed, weatherInfo.windDirection);
        }
    } catch (error) {
        console.error('Initialization failed:', error);
        alert('无法加载天气信息，请检查网络连接或稍后重试。');
    }
}

async function getCoordinates() {
     return await fetchAddressByIP();
}

async function getWeatherInfo(coordinates) {
    if (coordinates) {
        return await fetchWeatherByCoordinates(coordinates.longitude, coordinates.latitude);
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    preloadImages('./assets/images/zzz.jpg', './assets/images/aaa.jpg', './assets/images/eee.jpg');
    setTimeout(() => {
        init();
        setInterval(init, 1800000);
    }, 1000);
});



