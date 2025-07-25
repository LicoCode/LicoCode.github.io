const icon=document.getElementById("icon");let container;var currentStatus="";let timeoutId=null,shakeCount=0,resetTimer=null,lastTriggerTime=0;export function updateStatus(t){const e=new Date(t).getHours(),n=new Date(t).getMinutes();setStatus(e>22||22===e&&n>=30||e<6||6===e&&n<30||12===e&&n>=30?"sleep":"awake")}function setStatus(t){"sleep"==t&&startSleepStatus(),"awake"==t&&startAwakeStatus()}function startSleepStatus(){currentStatus="sleep",icon.style.backgroundImage="url('./assets/images/zzz.jpg')",icon.style.animation="none",icon.offsetWidth,icon.style.animation="sleep 3s ease-in-out infinite",addEventListener()}function startAwakeStatus(){currentStatus="awake",icon.style.backgroundImage="url('./assets/images/eee.jpg')",icon.style.animation="none",icon.offsetWidth,icon.style.animation="awake 3s ease-in-out infinite",addEventListener()}function startAnger(){icon.style.backgroundImage="url('./assets/images/aaa.jpg')",icon.style.animation="none",icon.offsetWidth,icon.style.animation="anger 0.25s ease-in-out infinite",timeoutId&&clearTimeout(timeoutId),timeoutId=setTimeout((()=>setStatus(currentStatus)),3500),removeEventListener()}function startShake(t){t.preventDefault(),t.stopPropagation();const e=Date.now();e-lastTriggerTime<300||(lastTriggerTime=e,icon.style.animation="none",icon.offsetWidth,icon.style.animation="shake 2s",timeoutId&&clearTimeout(timeoutId),timeoutId=setTimeout((()=>setStatus(currentStatus)),2e3),recordShakeCount())}function recordShakeCount(){shakeCount++,"awake"===currentStatus||(shakeCount>=4&&"sleep"===currentStatus?startAnger():(clearTimeout(resetTimer),resetTimer=setTimeout((()=>{shakeCount=0}),5e3)))}function addEventListener(){icon.addEventListener("mouseenter",startShake),icon.addEventListener("click",startShake),icon.addEventListener("touchstart",startShake)}function removeEventListener(){icon.removeEventListener("mouseenter",startShake),icon.removeEventListener("click",startShake),icon.removeEventListener("touchstart",startShake)}function showContent(t){container&&container.classList.remove("active"),container=document.getElementById(t),container.classList.add("active"),document.getElementById("modal").classList.add("active")}