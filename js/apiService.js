// Get longitude and latitude based on the user's location
function fetchLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Browser does not support geolocation'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                let { latitude, longitude } = position.coords;
                latitude = latitude.toFixed(6);
                longitude = longitude.toFixed(6);
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                resolve({ longitude, latitude }); // Use resolve to pass the result
            },
            error => {
                console.error('Failed to fetch geolocation:', error);
                reject(error); // Use reject to handle errors
            }
        );
    });
}

// Get the city name based on the user's IP
function fetchAddressByIP() {
    const apiUrl = `https://ipapi.co/json/`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data) { // 检查是否成功返回数据
                const ip = data.ip;
                const city = data.city; // 城市名称
                const region = data.region; // 省份/地区名称
                const country = data.country_name; // 国家名称
                const latitude = data.latitude;
                const longitude = data.longitude
                console.log(`City: ${city}, Region: ${region}, Country: ${country}, Latitude: ${latitude}, Longitude: ${longitude}`);
                return { city, region, country, latitude, longitude };
            } else {
                throw new Error(`Failed to fetch city information: ${JSON.stringify(data)}`);
            }
        })
        .catch(error => {
            console.error('Failed to fetch city information:', error);
            throw error;
        });
}

function fetchWeatherByCoordinates(lng, lat) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?longitude=${lng}&latitude=${lat}&daily=sunset,sunrise&models=best_match&current_weather=true&timezone=auto&forecast_days=1`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.current_weather && data.daily) { // 检查是否成功返回数据
                const time = data.current_weather.time; // 当前天气代码
                const weatherCode = data.current_weather.weathercode; // 当前天气代码
                const temperature = data.current_weather.temperature; // 当前温度
                const windSpeed = data.current_weather.windspeed; // 风速
                const windDirection = data.current_weather.winddirection; // 风向
                const isDay = data.current_weather.is_day; // 是否为白天
                const sunrise = data.daily.sunrise[0]; // 日出时间
                const sunset = data.daily.sunset[0]; // 日落时间
                console.log(`Time: ${time}, WeatherCode: ${weatherCode}, Temperature: ${temperature}°C, WindSpeed: ${windSpeed} km/h, WindDirection: ${windDirection}, IsDay: ${isDay}, Sunrise: ${sunrise}, Sunset: ${sunset}`);
                return { time, weatherCode, temperature, windSpeed, windDirection, isDay, sunrise, sunset };
            } else {
                throw new Error(`Failed to fetch weather data: ${JSON.stringify(data)}`);
            }
        })
        .catch(error => {
            console.error('Failed to fetch weather data:', error);
            throw error;
        });
}



