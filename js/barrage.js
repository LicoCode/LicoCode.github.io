import { chatWithDeepSeek } from './deepseekService.js'; // 导入 chatAI.js 中的函数
// 弹幕功能
let barrageChannel = [];
const maxBarrage = 50;

export async function sendBarrage() {
    const input = document.getElementById('barrage-input');
    if (input.value.trim()) {
        createBarrageElement(input.value, 'user');
        chatWithDeepSeek(input.value).then(response => {
            if (response) {
                createBarrageElement(response, 'assistant'); 
            }
        });
        input.value = '';
    }
}

function createBarrageElement(text, type = 'user') {
    const stage = document.querySelector('.barrage-stage');
    const barrage = document.createElement('div');
    barrage.className = 'barrage-item';
    barrage.textContent = text;
    barrage.style.top = `${Math.random() * 350}px`;
    barrage.style.color = type === 'assistant' ? '#FF6B6B' : '#6c63ff';
    
    stage.appendChild(barrage);
    barrageChannel.push(barrage);
    
    if (barrageChannel.length > maxBarrage) {
        const old = barrageChannel.shift();
        old.remove();
    }
    
    barrage.addEventListener('animationend', () => {
        barrage.remove();
        barrageChannel = barrageChannel.filter(d => d !== barrage);
    });
}

