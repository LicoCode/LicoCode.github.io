async function init(){
    let coordinates = null;
    let weatherInfo = null;
    try {
        coordinates = await fetchLocation();
    } catch (error) {
        coordinates = await fetchAddressByIP();
    }
    if(coordinates){
        weatherInfo = await fetchWeatherByCoordinates(coordinates.longitude,coordinates.latitude);
    }
    if (weatherInfo) {
        let curTime = new Date(weatherInfo.time);
        const currentHour = curTime.getHours();
        if ((currentHour >= 22 || currentHour < 6) || (currentHour >= 12 && currentHour < 13)) {
            setStatus('sleep');
        } else {
            setStatus('awake');
        }
        
        const sunrise = new Date(weatherInfo.sunrise).getTime();
        const sunset = new Date(weatherInfo.sunset).getTime();
        const currentTime = curTime.getTime();

        if (currentTime >= sunrise && currentTime < sunset) {
            setDay();
        } else {
            setNight();
        }
        /*
        等级	名称	风速范围（km/h）	陆地现象
        0	无风	<1	烟垂直上升
        1	软风	1-5	烟示风向
        2	轻风	6-11	树叶微动
        3	微风	12-19	树枝摇动
        4	和风	20-28	尘土飞扬
        5	劲风	29-38	小树摇摆
        6	强风	39-49	举伞困难
        7	疾风	50-61	步行受阻
        8	大风	62-74	树枝折断
        9	烈风	75-88	屋顶受损
        10	狂风	89-102	树木连根拔起
        11	暴风	103-117	广泛破坏
        12	飓风/台风	≥118	摧毁性破坏
        */
        let windLevel = null;
        if(weatherInfo.windSpeed >= 1 && weatherInfo.windSpeed < 11){
            windLevel = 'light' ;
        }
        if(weatherInfo.windSpeed >= 11 && weatherInfo.windSpeed < 28){
            windLevel = 'medium' ;
        }
        if(weatherInfo.windSpeed >= 28 && weatherInfo.windSpeed < 28){
            windLevel = 'heavy' ;
        }

        // 划分16方位：每22.5°（360°/16）为一个区间
        let windDirection = null;
        if(weatherInfo.WindDirection >= 0 && weatherInfo.WindDirection < 180){
            windDirection = 'right' ;
        }else{
            windDirection = 'left' ;
        }
        /*
        0	晴朗的天空
        1、2、3	晴间多云
        45，48	雾和沉积雾凇
        51、53、55	毛毛雨：小雨、中雨、大雨
        56，57	冻毛毛雨：强度轻且密集
        61、63、65	降雨：小雨、中雨、大雨
        66，67	冻雨：强度轻和强度重
        71、73、75	降雪：小雪、中雪、大雪
        77	雪粒
        80、81、82	阵雨：小雨、中雨、强雨
        85，86	阵雪（小雪和大雪）
        95*	雷暴：轻微或中等
        96、99*	雷暴，伴有小到大冰雹
        */
        let strength = null;
        
        // 下雨
        if((weatherInfo.weatherCode >= 51 && weatherInfo.weatherCode <= 57) || weatherInfo.weatherCode == 61 || weatherInfo.weatherCode == 66 || weatherInfo.weatherCode == 80){
            strength = 'light';
            startRainEffect(strength, windLevel,windDirection);
        }
        if(weatherInfo.weatherCode == 63 || weatherInfo.weatherCode == 67 || weatherInfo.weatherCode == 81){
            strength = 'medium';
            startRainEffect(strength, windLevel,windDirection);
        }
        if(weatherInfo.weatherCode == 65 || weatherInfo.weatherCode == 82){
            strength = 'heavy';
            startRainEffect(strength, windLevel,windDirection);
        }
        // 下雪
        if (weatherInfo.weatherCode == 71 || weatherInfo.weatherCode == 85) {
            strength = 'light'; // 小雪
            startSnowEffect(strength, windLevel,windDirection);
        }
        if (weatherInfo.weatherCode == 73) {
            strength = 'medium'; // 中雪
            startSnowEffect(strength, windLevel,windDirection);
        }
        if (weatherInfo.weatherCode == 75 || weatherInfo.weatherCode == 86) {
            strength = 'heavy'; // 大雪
            startSnowEffect(strength, windLevel,windDirection);
        }
        if (weatherInfo.weatherCode == 95) {
            strength = 'light'; 
            startLightningEffect(strength)
        }
        if (weatherInfo.weatherCode == 96) {
            strength = 'medium'; 
            startLightningEffect(strength)
        }
        if (weatherInfo.weatherCode == 99) {
            strength = 'heavy'; 
            startLightningEffect(strength)
        }
        if((weatherInfo.weatherCode >= 1 && weatherInfo.weatherCode <= 3) || weatherInfo.weatherCode == 45 || weatherInfo.weatherCode == 48){
            strength = 'medium';
            startCloudEffect(strength, windLevel,windDirection);
        }
    }


    
}

init();
setInterval(init, 1800000);





