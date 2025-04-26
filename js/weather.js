export function updateWeatherEffects(weatherCode, windSpeed, windDir) {
    const windDirection = getWindDirection(windDir);
    if (isRain(weatherCode)) {
        let rainStrength = getRainStrength(weatherCode);
        startRainEffect(rainStrength.rainCount, rainStrength.rainSize, rainStrength.rainSpeed, windSpeed, windDirection);
    } else if (isSnow(weatherCode)) {
        let snowStrength = getSnowStrength(weatherCode);
        startSnowEffect(snowStrength.snowCount, snowStrength.snowSize, windSpeed, windDirection);
    } else if (isLightning(weatherCode)) {
        startLightningEffect(getLightningStrength(weatherCode));
    } else if (isCloudy(weatherCode)) {
        let cloudStrength = getCloudStrength(weatherCode)
        startCloudEffect(cloudStrength.cloudCount, windSpeed, windDir);
    } else {
        console.log("No weather effect");
    } 

}

function startRainEffect(
    rainCount, 
    rainSize, 
    rainSpeed, 
    windSpeedKmh = 0, // 风速（km/h）
    windDirectionMultiplier = -1 // 风向：1表示向右，-1表示向左
) {
    console.log(`Rain effect started with ${rainCount} drops, size ${rainSize}, speed ${rainSpeed}, wind speed ${windSpeedKmh} km/h, direction ${windDirectionMultiplier}`);
    const canvas = document.getElementById('weather-canvas');
    const context = canvas.getContext('2d');

    // 设置 Canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 将风速从 km/h 转换为像素/帧（假设 1 km/h ≈ 0.28 px/frame）
    const windSpeedPxPerFrame = windSpeedKmh * 0.28;

    // 创建雨滴数组
    const rainDrops = [];
    for (let i = 0; i < rainCount; i++) {
        rainDrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * (rainSize * 1.5 - rainSize * 0.5) + rainSize * 0.5, // 雨滴长度
            width: Math.random() * (rainSize * 0.3 - rainSize * 0.1) + rainSize * 0.1, // 雨滴宽度
            speed: Math.random() * (rainSpeed * 1.5 - rainSpeed * 0.5) + rainSpeed * 0.5, // 雨滴速度
            opacity: Math.random() * 0.5 + 0.5,
            drift: (Math.random() * windSpeedPxPerFrame + windSpeedPxPerFrame / 2) * windDirectionMultiplier, // 水平漂移
        });
    }

    // 绘制雨滴和动画逻辑保持不变
    function drawRain() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        rainDrops.forEach(drop => {
            context.save();
            context.beginPath();

            const gradient = context.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
            gradient.addColorStop(0, `rgba(173, 216, 230, 0.2)`);
            gradient.addColorStop(1, `rgba(173, 216, 230, ${drop.opacity})`);

            context.fillStyle = gradient;

            const topX = drop.x;
            const topY = drop.y;
            const bottomX = drop.x + drop.drift;
            const bottomY = drop.y + drop.length;
            const halfWidth = drop.width / 2;

            context.moveTo(topX, topY);
            context.bezierCurveTo(
                topX - halfWidth, topY + drop.length / 3,
                bottomX - halfWidth, bottomY - drop.length / 3,
                bottomX, bottomY
            );
            context.bezierCurveTo(
                bottomX + halfWidth, bottomY - drop.length / 3,
                topX + halfWidth, topY + drop.length / 3,
                topX, topY
            );

            context.fill();
            context.restore();
        });
    }

    function updateRain() {
        rainDrops.forEach(drop => {
            drop.y += drop.speed;
            drop.x += drop.drift;

            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
            if (drop.x > canvas.width || drop.x < 0) {
                drop.x = Math.random() * canvas.width;
            }
        });
    }

    function animate() {
        drawRain();
        updateRain();
        requestAnimationFrame(animate);
    }

    animate();
}

function startSnowEffect(
    snowCount, 
    snowSize, 
    windSpeedKmh = 0, 
    windDirection = -1) { 
    console.log(`Snow effect started with ${snowCount} flakes, size ${snowSize}, wind speed ${windSpeedKmh} km/h, direction ${windDirection}`);
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    // 设置 Canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 将风速从 km/h 转换为像素/帧（假设 1 km/h ≈ 0.28 px/frame）
    const windSpeedPxPerFrame = windSpeedKmh * 0.28;

    // 创建雪花数组
    const snowflakes = [];
    for (let i = 0; i < snowCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width, // 随机 X 坐标
            y: Math.random() * canvas.height, // 随机 Y 坐标
            radius: Math.random() * (snowSize * 0.5) + snowSize * 0.5, // 雪花半径根据大小控制
            speed: Math.random() * 1 + 0.5, // 雪花下落速度
            drift: (Math.random() * windSpeedPxPerFrame + windSpeedPxPerFrame / 2) * windDirection, // 水平漂移速度根据风速和风向控制
            angle: Math.random() * Math.PI * 2, // 雪花初始旋转角度
        });
    }

    // 绘制标准雪花
    function drawSnowflake(x, y, radius, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();

        // 绘制六边形主干
        for (let i = 0; i < 6; i++) {
            const theta = (Math.PI / 3) * i;
            const xPos = radius * Math.cos(theta);
            const yPos = radius * Math.sin(theta);
            ctx.moveTo(0, 0);
            ctx.lineTo(xPos, yPos);

            // 在每个主干上添加分支
            const branchLength = radius / 3;
            const branchAngle = Math.PI / 6;
            const branchX1 = xPos - branchLength * Math.cos(theta - branchAngle);
            const branchY1 = yPos - branchLength * Math.sin(theta - branchAngle);
            const branchX2 = xPos - branchLength * Math.cos(theta + branchAngle);
            const branchY2 = yPos - branchLength * Math.sin(theta + branchAngle);

            ctx.moveTo(xPos, yPos);
            ctx.lineTo(branchX1, branchY1);
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(branchX2, branchY2);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }

    // 绘制雪花
    function drawSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

        snowflakes.forEach(flake => {
            drawSnowflake(flake.x, flake.y, flake.radius, flake.angle);
        });
    }

    // 更新雪花位置
    function updateSnow() {
        snowflakes.forEach(flake => {
            flake.y += flake.speed; // 雪花下落
            flake.x += flake.drift; // 雪花漂移
            flake.angle += 0.01; // 雪花旋转

            if (flake.y > canvas.height) {
                flake.y = -flake.radius; // 重置到顶部
                flake.x = Math.random() * canvas.width; // 随机 X 坐标
            }

            if (flake.x > canvas.width) {
                flake.x = 0; // 从左侧重新进入
            } else if (flake.x < 0) {
                flake.x = canvas.width; // 从右侧重新进入
            }
        });
    }

    // 动画循环
    function animate() {
        drawSnow();
        updateSnow();
        requestAnimationFrame(animate);
    }

    animate();
}

function startLightningEffect(frequency) { 
    console.log(`Lightning effect started with frequency: ${frequency}`);
    const canvas = document.getElementById('lightning-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    function drawLightning() {
        if (Math.random() > frequency) { // 使用传入的频率控制闪电出现
            // 优化闪光效果，降低透明度
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // 降低亮光透明度
            ctx.fillRect(0, 0, canvas.width, canvas.height); // 闪电亮光

            // 绘制闪电主干
            ctx.strokeStyle = `rgba(255, 255, ${200 + Math.random() * 55}, 0.8)`; // 随机偏蓝色
            ctx.lineWidth = Math.random() * 4 + 3; // 增加闪电线条宽度
            ctx.beginPath();
            const startX = Math.random() * canvas.width;
            let currentX = startX;
            let currentY = 0;

            while (currentY < canvas.height) {
                const nextX = currentX + (Math.random() * 40 - 20); // 随机偏移范围
                const nextY = currentY + Math.random() * 15; // 进一步减少垂直延伸范围，使闪电速度更慢
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(nextX, nextY);

                // 随机生成分支
                if (Math.random() > 0.7) {
                    const branchX = nextX + (Math.random() * 30 - 15); // 分支偏移
                    const branchY = nextY + Math.random() * 15; // 分支延伸
                    ctx.moveTo(nextX, nextY);
                    ctx.lineTo(branchX, branchY);
                }

                currentX = nextX;
                currentY = nextY;
            }

            ctx.stroke();

            // 延长闪光效果的清除时间
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 300); // 增加闪光持续时间，使闪电效果更持久
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        drawLightning();
        requestAnimationFrame(animate);
    }

    animate();
}

function startCloudEffect(cloudCount, windSpeedKmh, windDirection) {
    console.log(`Cloud effect started with ${cloudCount} clouds, wind speed: ${windSpeedKmh} km/h, wind direction: ${windDirection}`);
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 调整风速转换比例，使云移动更符合人眼观察
    const windSpeedPxPerFrame = windSpeedKmh * 0.05; // 降低转换比例

    // 计算风向的x和y分量
    const windX = -Math.sin(windDirection); // 使用sin计算x分量
    const windY = Math.cos(windDirection); // 使用cos计算y分量，取负值表示向下移动

    // 创建云层数组
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
        const cloudShapes = [];
        const width = Math.random() * 200 + 100;
        const height = Math.random() * 50 + 30;

        // 预生成云的形状
        for (let j = 0; j < 5; j++) {
            cloudShapes.push({
                offsetX: Math.random() * width - width / 2,
                offsetY: Math.random() * height - height / 2,
                ellipseWidth: Math.random() * width * 0.6 + width * 0.4,
                ellipseHeight: Math.random() * height * 0.6 + height * 0.4,
            });
        }

        // 调整云速计算方式，增加距离感效果
        const distanceFactor = Math.random() * 0.6 + 0.4; // 模拟远近效果
        const baseSpeed = windSpeedPxPerFrame * distanceFactor;
        
        clouds.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            width,
            height,
            speedX: (Math.random() * 0.3 + 0.1) * baseSpeed * windX, // 降低随机幅度
            speedY: (Math.random() * 0.3 + 0.1) * baseSpeed * windY,
            shapes: cloudShapes,
            opacity: distanceFactor * 0.8 + 0.2 // 根据距离调整透明度
        });
    }

    // 绘制单个云
    function drawCloud(cloud) {
        const gradient = ctx.createRadialGradient(
            cloud.x,
            cloud.y,
            cloud.height / 4,
            cloud.x,
            cloud.y,
            cloud.width
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.fillStyle = gradient;

        cloud.shapes.forEach(shape => {
            ctx.beginPath();
            ctx.ellipse(
                cloud.x + shape.offsetX,
                cloud.y + shape.offsetY,
                shape.ellipseWidth,
                shape.ellipseHeight,
                0,
                0,
                Math.PI * 2
            );
            ctx.fill();
        });
    }

    // 绘制云层
    function drawClouds() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 根据y坐标排序，实现远近层次感
        clouds.sort((a, b) => a.y - b.y).forEach(cloud => {
            drawCloud(cloud);
        });
    }

    // 更新云层位置
    function updateClouds() {
        clouds.forEach(cloud => {
            cloud.x += cloud.speedX;
            cloud.y += cloud.speedY;
            
            // 处理云层超出边界的情况
            if (cloud.x > canvas.width + cloud.width) {
                cloud.x = -cloud.width;
                cloud.y = Math.random() * canvas.height / 2;
            } else if (cloud.x < -cloud.width) {
                cloud.x = canvas.width + cloud.width;
                cloud.y = Math.random() * canvas.height / 2;
            }
            
            if (cloud.y > canvas.height + cloud.height) {
                cloud.y = -cloud.height;
                cloud.x = Math.random() * canvas.width;
            } else if (cloud.y < -cloud.height) {
                cloud.y = canvas.height + cloud.height;
                cloud.x = Math.random() * canvas.width;
            }
        });
    }

    // 动画循环
    function animate() {
        drawClouds();
        updateClouds();
        requestAnimationFrame(animate);
    }

    animate();
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
// 划分16方位：每22.5°（360°/16）为一个区间
function getWindDirection(windDirection) {
    return windDirection < 180 ? -1 : 1;
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
function isRain(weatherCode) {
    return [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode);
}

function isSnow(weatherCode) {
    return [71, 73, 75, 77, 85, 86].includes(weatherCode);
}

function isLightning(weatherCode) {
    return [95, 96, 99].includes(weatherCode);
}

function isCloudy(weatherCode) {
    return [1, 2, 3, 45, 48].includes(weatherCode);
}

function getRainStrength(weatherCode) {
    // 定义天气代码与雨滴参数的映射
    const paramMap = {
        51: { rainCount: 100, rainSize: 6, rainSpeed: 2.5 }, // 毛毛小雨，增加数量和大小，适当提高速度
        53: { rainCount: 300, rainSize: 9, rainSpeed: 2.5 }, // 毛毛中雨，增加数量和大小，适当提高速度
        55: { rainCount: 400, rainSize: 12, rainSpeed: 2.5 }, // 毛毛大雨，增加数量和大小，适当提高速度
        56: { rainCount: 100, rainSize: 6, rainSpeed: 2.5 }, // 冻毛毛雨
        57: { rainCount: 100, rainSize: 6, rainSpeed: 2.5 }, // 冻毛毛雨
        61: { rainCount: 200, rainSize: 20, rainSpeed: 3.5 }, // 小雨，增加数量和大小，适当提高速度
        80: { rainCount: 200, rainSize: 20, rainSpeed: 3.5 }, // 小雨，增加数量和大小，适当提高速度
        63: { rainCount: 300, rainSize: 30, rainSpeed: 4 }, // 中雨，增加数量和大小，适当提高速度
        81: { rainCount: 300, rainSize: 30, rainSpeed: 4 }, // 中雨，增加数量和大小，适当提高速度
        65: { rainCount: 400, rainSize: 40, rainSpeed: 5.5 }, // 大雨，增加数量和大小，适当提高速度
        82: { rainCount: 400, rainSize: 40, rainSpeed: 5.5 }, // 大雨，增加数量和大小，适当提高速度
        95: { rainCount: 500, rainSize: 50, rainSpeed: 7 }, // 暴雨，增加数量和大小，适当提高速度
        96: { rainCount: 550, rainSize: 50, rainSpeed: 7 }, // 大暴雨，增加数量和大小，适当提高速度
        99: { rainCount: 600, rainSize: 50, rainSpeed: 7 } // 超大暴雨，增加数量和大小，适当提高速度
    };
    return paramMap[weatherCode] || { rainCount: 0, rainSize: 0, rainSpeed: 0 };
}

function getSnowStrength(weatherCode) {
    // 定义天气代码与雪参数的映射
    const paramMap = {
        71: { snowCount: 50, snowSize: 3}, // 小雪
        85: { snowCount: 50, snowSize: 3}, // 小阵雪
        73: { snowCount: 70, snowSize: 7}, // 中雪
        75: { snowCount: 100, snowSize: 10}, // 大雪
        77: { snowCount: 100, snowSize: 5}, // 雪粒
        86: { snowCount: 50, snowSize: 10}, // 大阵雪
    };
    return paramMap[weatherCode] || { snowCount: 0, snowSize: 0};
}

function getCloudStrength(weatherCode) {
    const paramMap = {
        1: { cloudCount: 3},
        45: { cloudCount: 3},
        2: { cloudCount: 6},
        48: { cloudCount: 6},
        3: { cloudCount: 10},
    };
    return paramMap[weatherCode] || { frequency: 1};
}

function getLightningStrength(weatherCode) {
    const paramMap = {
        95: { frequency: 0.998},
        96: { frequency: 0.995},
        99: { frequency: 0.99},
    };
    return paramMap[weatherCode] || { frequency: 1};
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('weather-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});