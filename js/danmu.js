import { chatWithDeepSeek } from './deepseekService.js'; // 导入 chatAI.js 中的函数
// 弹幕功能
let danmuChannel = [];
const maxDanmu = 50;

export async function sendDanmu() {
    const input = document.getElementById('danmu-input');
    if (input.value.trim()) {
        createDanmuElement(input.value, 'user');
        chatWithDeepSeek(input.value).then(response => {
            if (response) {
                createDanmuElement(response, 'assistant'); 
            }
        });
        input.value = '';
    }
}

function createDanmuElement(text, type = 'user') {
    const stage = document.querySelector('.danmu-stage');
    const danmu = document.createElement('div');
    danmu.className = 'danmu-item';
    danmu.textContent = text;
    danmu.style.top = `${Math.random() * 350}px`;
    danmu.style.color = type === 'assistant' ? '#FF6B6B' : '#6c63ff';
    
    stage.appendChild(danmu);
    danmuChannel.push(danmu);
    
    if (danmuChannel.length > maxDanmu) {
        const old = danmuChannel.shift();
        old.remove();
    }
    
    danmu.addEventListener('animationend', () => {
        danmu.remove();
        danmuChannel = danmuChannel.filter(d => d !== danmu);
    });
}

