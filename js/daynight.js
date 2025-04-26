const container = document.getElementById('daynight-container');

function setDay() {
    const container = document.getElementById('daynight-container');
    container.classList.remove('night');
    container.classList.add('day');
}

function setNight() {
    const container = document.getElementById('daynight-container');
    container.classList.remove('day');
    container.classList.add('night');
}

export function updateDayNightstate(current, sunrise, sunset) {
    const sunriseTime = new Date(sunrise).getTime();
    const sunsetTime = new Date(sunset).getTime();
    const currentTime = new Date(current).getTime();
    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
        setDay();
    } else {
        setNight();
    }
}