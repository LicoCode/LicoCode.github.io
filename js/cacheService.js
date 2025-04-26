import { fetchLocation, fetchAddressByIP, fetchWeatherByCoordinates } from './weatherService.js';

// 缓存有效时间（默认15分钟）
const DEFAULT_CACHE_DURATION = 15 * 60 * 1000;

// 获取缓存数据
function getCache(key) {
    const cached = localStorage.getItem(key);
    if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < (parsed.duration || DEFAULT_CACHE_DURATION)) {
            return parsed.data;
        } else {
            localStorage.removeItem(key); // 缓存过期，移除
        }
    }
    return null;
}

// 设置缓存数据
function setCache(key, data, duration = DEFAULT_CACHE_DURATION) {
    const cacheData = {
        data,
        timestamp: Date.now(),
        duration
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
}

// 通过缓存层获取经纬度
export function getCachedLocation() {
    const cacheKey = 'fetchLocation';
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        console.log('Cached Location data:', cachedData);
        return Promise.resolve(cachedData);
    }

    return fetchLocation().then(data => {
        setCache(cacheKey, data);
        return data;
    });
}

// 通过缓存层获取城市信息
export function getCachedAddressByIP() {
    const cacheKey = 'fetchAddressByIP';
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        console.log('Cached address data:', cachedData);
        return Promise.resolve(cachedData);
    }

    return fetchAddressByIP().then(data => {
        setCache(cacheKey, data);
        return data;
    });
}

// 通过缓存层获取天气信息
export function getCachedWeatherByCoordinates(lng, lat) {
    const cacheKey = `fetchWeatherByCoordinates_${lng}_${lat}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        console.log('Cached weather data:', cachedData);
        return Promise.resolve(cachedData);
    }

    return fetchWeatherByCoordinates(lng, lat).then(data => {
        setCache(cacheKey, data);
        return data;
    });
}