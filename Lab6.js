function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

let lat1 = getRandomInRange(30, 35, 3);
let lon1 = getRandomInRange(-90, -100, 3);

let lat2 = getRandomInRange(30, 35, 3);
let lon2 = getRandomInRange(-90, -100, 3);

let lat3 = getRandomInRange(30, 35, 3);
let lon3 = getRandomInRange(-90, -100, 3);

const map = L.map('map').setView([32, -96], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getLocality(latitude, longitude, markerIndex) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();

    document.getElementById(`lat${markerIndex}`).innerText = latitude; 
    document.getElementById(`lon${markerIndex}`).innerText = longitude;
    document.getElementById(`locality${markerIndex}`).innerText = data.locality || "Not found";
}

getLocality(lat1, lon1, 1);
getLocality(lat2, lon2, 2);
getLocality(lat3, lon3, 3);

L.marker([lat1, lon1]).addTo(map).bindPopup(`Marker 1: (${lat1}, ${lon1})`).openPopup();
L.marker([lat2, lon2]).addTo(map).bindPopup(`Marker 2: (${lat2}, ${lon2})`);
L.marker([lat3, lon3]).addTo(map).bindPopup(`Marker 3: (${lat3}, ${lon3})`);
