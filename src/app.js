const key = config.IPIFY_API_KEY;
const mapKey = config.MAPBOX_API_KEY;

const displayIP = document.getElementById('display-ip');
const displayCity = document.getElementById('display-city');
const displayISP = document.getElementById('display-isp');
const displayTimezone = document.getElementById('display-timezone');

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

let mymap = '';
let marker = '';



async function getIP() {
    let res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress`)
    let data = await res.json()
    console.log(data)
    let {ip, isp} = data
    let {city, postalCode, lat, lng, timezone} = data.location;
    console.log('ip:',ip)
    console.log('isp:', isp)
    console.log('city:', city)
    console.log('postal code:', postalCode)
    console.log('lat/long:', lat, lng)
    console.log('timezone:', timezone)

    displayIP.textContent = ip
    displayISP.textContent = isp
    displayCity.textContent = city + "" + postalCode
    displayTimezone.textContent = timezone

    mymap = L.map('mapid').setView([lat, lng], 13);
    marker = L.marker([lat, lng]).addTo(mymap);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapKey}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

}

async function updateIp() {
let q = '172.93.177.85'
    let res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=172.93.177.85`)
    let data = await res.json()
    let {ip, isp} = data
    let {city, postalCode, lat, lng, timezone} = data.location;
    console.log('ip:',ip)
    console.log('isp:', isp)
    console.log('city:', city)
    console.log('postal code:', postalCode)
    console.log('lat/long:', lat, lng)
    console.log('timezone:', timezone)

    displayIP.textContent = ip
    displayISP.textContent = isp
    displayCity.textContent = city + "" + postalCode
    displayTimezone.textContent = timezone

    console.log(mymap)

    marker.setLatLng([lat, lng]);
    mymap.setView([lat, lng], 13)

    
}




function onClick(e) {
    console.log('clicked!!!', searchInput.value)
    updateIp()
}

searchBtn.addEventListener('click', onClick)




getIP()
let q = '172.93.177.85'