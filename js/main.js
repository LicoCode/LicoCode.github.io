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

// 弹窗控制逻辑
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
// 关闭弹窗的多种方式
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});


