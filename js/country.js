var country = document.querySelector("#country");
var btn = document.querySelector("#btn");

//Country informations
var countryName = document.querySelector("#contryName");
var currencies = document.querySelector("#currencies");
var continent = document.querySelector("#continent");
var capital = document.querySelector("#capital");
var population = document.querySelector("#population");
var imgFlag = document.querySelector("#imgFlag");
var tourists = document.querySelector("#tourists");

//API's
var URLCountryCode = 'https://restcountries.com/v3.1/alpha/'
var URLCountryName = 'https://api.api-ninjas.com/v1/country?name='
var KEYCountryName = 'ltRKlQilfL5zPv2ZFBKBZQ==h301C0fLZQ6kVJKB'

var req = new XMLHttpRequest();

country.addEventListener("keypress", function(event) {
    
    if (event.keyCode === 13) {
        event.preventDefault();
        btn.click();
    }
});

btn.onclick = function(){
    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);

        if(resp_obj.length != 0){
            document.getElementById('widget').style.display = 'block';
           
            //Country informations by code
            searchCountry(resp_obj[0].iso2);
            currencies.innerHTML = resp_obj[0].currency.name;
            tourists.innerHTML = resp_obj[0].tourists;
        }else {
            alert("Oops! The name you wrote does not match any country :/");
        }

    }
    req.open("GET", URLCountryName+country.value,true);
    req.setRequestHeader("X-Api-Key",KEYCountryName);
    req.send(null);
}

function searchCountry(country){
    var req = new XMLHttpRequest();
    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);
        
        countryName.innerHTML = resp_obj[0].name.common;
        continent.innerHTML = resp_obj[0].continents;
        capital.innerHTML = resp_obj[0].capital;
        population.innerHTML=resp_obj[0].population;
        imgFlag.src = resp_obj[0].flags.svg;

        //Map
        var latitude = resp_obj[0].capitalInfo.latlng[0];
        var longitude = resp_obj[0].capitalInfo.latlng[1];
        document.getElementById('weathermap').innerHTML = "<div id='map' style='height: 250px; width: 100%; margin-top: 50px; position: relative;'></div>";
        var map = L.map('map').setView([latitude, longitude], 13);
        var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        map.addLayer(osm);

    }

    req.open("GET", URLCountryCode + country);
    req.send(null);
}
