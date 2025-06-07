const icon = document.getElementById('icon');
let container;
var currentStatus = '';
let timeoutId = null; 
let shakeCount = 0; 
let resetTimer = null; 
let lastTriggerTime = 0;  

export function updateStatus(currentTime) {
    const currentHour = new Date(currentTime).getHours();
    // 晚上10:30到早上6:30，或中午12:30到13:00
    const currentMinute = new Date(currentTime).getMinutes();
    if (
        (currentHour > 22 || (currentHour === 22 && currentMinute >= 30) || currentHour < 6 || (currentHour === 6 && currentMinute < 30)) ||
        (currentHour === 12 && currentMinute >= 30)
    ) {
        setStatus('sleep'); 
    } else {
        setStatus('awake');
    }
}

function setStatus(status){
    if(status == 'sleep'){
        startSleepStatus();
    }
    if(status == 'awake'){
        startAwakeStatus();
    }
}

function startSleepStatus(){
    currentStatus = 'sleep';
    icon.style.backgroundImage = `url('./assets/images/zzz.jpg')`; 
    icon.style.animation = 'none'; 
    void icon.offsetWidth;
    icon.style.animation = `sleep 3s ease-in-out infinite`; 
    addEventListener();
}

function startAwakeStatus(){
    currentStatus = 'awake';
    icon.style.backgroundImage = `url('./assets/images/eee.jpg')`; 
    icon.style.animation = 'none';
    void icon.offsetWidth;
    icon.style.animation = 'awake 3s ease-in-out infinite'; 
    addEventListener();
}


function startAnger(){
    icon.style.backgroundImage = `url('./assets/images/aaa.jpg')`; 
    icon.style.animation = 'none'; 
    void icon.offsetWidth; 
    icon.style.animation = 'anger 0.25s ease-in-out infinite'; 
    if (timeoutId) clearTimeout(timeoutId); // 清除当前阶段切换定时器
    timeoutId = setTimeout(() => setStatus(currentStatus), 3500);
    removeEventListener()
}

function startShake(e){
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTriggerTime < 300) return; // 防止短时间内重复触发
    lastTriggerTime = now;
    icon.style.animation = 'none'; 
    void icon.offsetWidth; 
    icon.style.animation = 'shake 2s';
    if (timeoutId) clearTimeout(timeoutId); // 清除当前阶段切换定时器
    timeoutId = setTimeout(() => setStatus(currentStatus), 2000);
    recordShakeCount();
}

function recordShakeCount() {
    shakeCount++;
    if(currentStatus === 'awake'){
        if(shakeCount == 39){
            showContent('goaway')
        }
        else if(shakeCount == 36){
            showContent('annoying')
        }
        else if(shakeCount == 32){
            showContent('receive')
        }
        else if(shakeCount == 29){
            showContent('boring')
        }
        else if(shakeCount == 25){
            showContent('justdoit')
        }
        else if(shakeCount == 22){
            showContent('find')
        }
        else if(shakeCount == 20){
            showContent('default')

        }
        else if(shakeCount == 17){
            showContent('persistence')
        }
        else if(shakeCount == 13){
            showContent('deception')
        }else if(shakeCount == 9){
            showContent('waiting')
        }
        else if(shakeCount == 3){
            showContent('secret')
        }
        clearTimeout(resetTimer); // 清除计数重置定时器
        resetTimer = setTimeout(() => {
            shakeCount = 0; // 5秒后重置计数
        }, 30000);
    } else if (shakeCount >= 4 && currentStatus === 'sleep') {
            startAnger(); // 超过3次切换到愤怒阶段
    } else {
        clearTimeout(resetTimer); // 清除计数重置定时器
        resetTimer = setTimeout(() => {
            shakeCount = 0; // 5秒后重置计数
        }, 5000);
    }
}

function addEventListener(){
    icon.addEventListener('mouseenter', startShake); 
    icon.addEventListener('click', startShake);
    icon.addEventListener('touchstart', startShake);
}

function removeEventListener(){
    icon.removeEventListener('mouseenter', startShake); 
    icon.removeEventListener('click', startShake);
    icon.removeEventListener('touchstart', startShake);
}



function showContent(type) {
    if (container) {
        container.classList.remove('active');
    }
    container = document.getElementById(type);
    container.classList.add('active');
    // 自动激活弹窗
    document.getElementById('modal').classList.add('active');
}