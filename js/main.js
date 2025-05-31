import { preloadImages } from './preload.js';
import { updateDayNightstate } from './daynight.js';
import { updateStatus } from './status.js';
import { getCachedLocation, getCachedAddressByIP, getCachedWeatherByCoordinates } from './cacheService.js';
import { updateWeatherEffects } from './weather.js';
//import { sendBarrage } from './barrage.js';

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
     return await getCachedAddressByIP();
    // try {
    //     return await getCachedLocation();
    // } catch (error) {
    //     return await getCachedAddressByIP();
    // }
}

async function getWeatherInfo(coordinates) {
    if (coordinates) {
        return await getCachedWeatherByCoordinates(coordinates.longitude, coordinates.latitude);
    }
    return null;
}


document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.barrage-input button');
    // 添加触摸事件监听
    // sendButton.addEventListener('touchstart', (e) => {
    //     e.preventDefault();
    //     sendBarrage();
    // });
    preloadImages('./assets/images/zzz.jpg', './assets/images/aaa.jpg', './assets/images/eee.jpg');
    // document.getElementById('barrage-input').addEventListener('keydown', (e) => {
    //     if (e.key === 'Enter') {
    //         sendBarrage();
    //     }
    // });
    setTimeout(() => {
        init();
        setInterval(init, 1800000);
    }, 1000);
});

//window.sendBarrage = sendBarrage;