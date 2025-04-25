const container = document.getElementById('daynight-container');

function setDay(){
    container.classList.remove('night');
    container.classList.add('day');
}

function setNight(){
    container.classList.remove('day');
    container.classList.add('night');
    
}