function startRainEffect(rainLevel = 'medium', windLevel = 'none', windDirection = 'left') { // 默认中雨，中等风，风向向右
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    // 设置 Canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 根据雨强度设置雨滴数量、长度和速度
    let raindropCount, lengthRange, speedRange;
    if (rainLevel === 'heavy') {
        raindropCount = 500;
        lengthRange = [20, 40];
        speedRange = [6, 10];
    } else if (rainLevel === 'light') {
        raindropCount = 80;
        lengthRange = [10, 20];
        speedRange = [2, 4];
    } else {
        raindropCount = 200;
        lengthRange = [15, 30];
        speedRange = [4, 6];
    }

    // 根据风速设置水平漂移速度
    let windSpeed;
    if (windLevel === 'heavy') {
        windSpeed = 3;
    } else if (windLevel === 'light') {
        windSpeed = 0.5;
    } else if (windLevel === 'medium') {
        windSpeed = 1.5; // 中等风
    } else {
        windSpeed = 0; // 无风
    }

    // 根据风向调整漂移方向
    const windMultiplier = windDirection === 'left' ? -1 : 1;

    // 创建雨滴数组
    const raindrops = [];
    for (let i = 0; i < raindropCount; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * (lengthRange[1] - lengthRange[0]) + lengthRange[0],
            speed: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
            opacity: Math.random() * 0.5 + 0.5,
            drift: (Math.random() * windSpeed + windSpeed / 2) * windMultiplier, // 确保漂移方向与风向一致
        });
    }

    // 绘制雨滴
    function drawRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        raindrops.forEach(drop => {
            const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
            gradient.addColorStop(0, `rgba(173, 216, 230, 0.2)`);
            gradient.addColorStop(1, `rgba(173, 216, 230, ${drop.opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = `rgba(173, 216, 230, ${drop.opacity})`;
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + drop.drift, drop.y + drop.length);
            ctx.stroke();
        });
    }

    // 更新雨滴位置
    function updateRain() {
        raindrops.forEach(drop => {
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

    // 动画循环
    function animate() {
        drawRain();
        updateRain();
        requestAnimationFrame(animate);
    }

    animate();
}

function startSnowEffect(snowLevel = 'medium', windLevel = 'none', windDirection = 'right') { // 默认中雪，无风，风向向右
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    // 设置 Canvas 尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 根据雪强度设置雪花数量
    let snowflakeCount;
    if (snowLevel === 'heavy') {
        snowflakeCount = 300; // 大雪
    } else if (snowLevel === 'light') {
        snowflakeCount = 100; // 小雪
    } else {
        snowflakeCount = 200; // 中雪
    }

    // 根据风速设置水平漂移速度
    let windSpeed;
    if (windLevel === 'heavy') {
        windSpeed = 2; // 强风
    } else if (windLevel === 'light') {
        windSpeed = 0.5; // 微风
    } else if (windLevel === 'none') {
        windSpeed = 0; // 无风
    } else {
        windSpeed = 1; // 中等风
    }

    // 根据风向调整漂移方向
    const windMultiplier = windDirection === 'left' ? -1 : 1;

    // 创建雪花数组
    const snowflakes = [];
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width, // 随机 X 坐标
            y: Math.random() * canvas.height, // 随机 Y 坐标
            radius: Math.random() * 4 + 2, // 雪花半径
            speed: Math.random() * 1 + 0.5, // 雪花下落速度
            drift: (Math.random() * 0.5 + windSpeed) * windMultiplier, // 水平漂移速度
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

function startLightningEffect(frequencyLevel = 'medium') { 
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 根据频率等级设置闪电频率
    let frequency;
    if (frequencyLevel === 'heavy') {
        frequency = 0.995; // 高
    } else if (frequencyLevel === 'light') {
        frequency = 0.999; // 低
    } else {
        frequency = 0.997; // 
    }

    function drawLightning() {
        if (Math.random() > frequency) { // 使用传入的频率控制闪电出现
            // 优化闪光效果，降低透明度
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // 降低亮光透明度
            ctx.fillRect(0, 0, canvas.width, canvas.height); // 闪电亮光

            // 绘制闪电主干
            ctx.strokeStyle = `rgba(255, 255, ${200 + Math.random() * 55}, 0.8)`; // 随机偏蓝色
            ctx.lineWidth = Math.random() * 2 + 1; // 随机线条宽度
            ctx.beginPath();
            const startX = Math.random() * canvas.width;
            let currentX = startX;
            let currentY = 0;

            while (currentY < canvas.height) {
                const nextX = currentX + (Math.random() * 40 - 20); // 随机偏移范围
                const nextY = currentY + Math.random() * 25; // 减少垂直延伸范围，速度减慢
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(nextX, nextY);

                // 随机生成分支
                if (Math.random() > 0.7) {
                    const branchX = nextX + (Math.random() * 30 - 15); // 分支偏移
                    const branchY = nextY + Math.random() * 20; // 分支延伸
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
            }, 200); // 闪光持续时间加倍
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        drawLightning();
        requestAnimationFrame(animate);
    }

    animate();
}

function startCloudEffect(cloudLevel = 'medium', windLevel = 'medium', windDirection = 'right') {
    const canvas = document.getElementById('weather-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 根据云层密度设置云的数量
    let cloudCount;
    if (cloudLevel === 'heavy') {
        cloudCount = 10; // 多云
    } else if (cloudLevel === 'light') {
        cloudCount = 3; // 少云
    } else {
        cloudCount = 6; // 默认中等云量
    }

    // 根据风速设置水平移动速度
    let windSpeed;
    if (windLevel === 'heavy') {
        windSpeed = 4; // 强风
    } else if (windLevel === 'light') {
        windSpeed = 0.5; // 微风
    } else if (windLevel === 'none') {
        windSpeed = 0; // 无风
    } else {
        windSpeed = 2; // 中等风
    }

    // 根据风向调整移动方向
    const windMultiplier = windDirection === 'left' ? -1 : 1;

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

        clouds.push({
            x: Math.random() * canvas.width, // 随机 X 坐标
            y: Math.random() * canvas.height / 2, // 随机 Y 坐标（上半部分）
            width,
            height,
            speed: (Math.random() * 0.5 + 0.2) * windSpeed * windMultiplier, // 云层移动速度和方向
            shapes: cloudShapes, // 云的形状
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
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;

        // 使用预生成的形状绘制云
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
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

        clouds.forEach(cloud => {
            drawCloud(cloud);
        });
    }

    // 更新云层位置
    function updateClouds() {
        clouds.forEach(cloud => {
            cloud.x += cloud.speed; // 云层水平移动
            if (cloud.x > canvas.width + cloud.width) {
                cloud.x = -cloud.width; // 从左侧重新进入
                cloud.y = Math.random() * canvas.height / 2; // 随机 Y 坐标
            } else if (cloud.x < -cloud.width) {
                cloud.x = canvas.width + cloud.width; // 从右侧重新进入
                cloud.y = Math.random() * canvas.height / 2; // 随机 Y 坐标
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

window.addEventListener('resize', () => {
    const canvas = document.getElementById('weather-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});