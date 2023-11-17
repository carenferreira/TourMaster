var city = document.querySelector("#city");
var btn = document.querySelector("#btn");

//Wether informations
var temperaturaAtual = document.querySelector("#tempAtual");
var temperaturaMaxima = document.querySelector("#tempMaxima");
var temperaturaMinima = document.querySelector("#tempMinima");
var description = document.querySelector("#description");
var imgWether = document.querySelector("#imgWhether");

//Country informations
var countryName = document.querySelector("#contryName");
var currencies = document.querySelector("#currencies");
var capital = document.querySelector("#capital");
var language = document.querySelector("#language");
var population = document.querySelector("#population");
var imgFlag = document.querySelector("#imgFlag");

//API's
var URLWether = 'https://api.openweathermap.org/data/2.5/weather?q='
var KEYWether = '&appid=3d153a186c6d625fc17f1c820c1248f2&units=metric'
var URLCity = 'https://api.api-ninjas.com/v1/city?name='
var KEYCity = 'ltRKlQilfL5zPv2ZFBKBZQ==h301C0fLZQ6kVJKB'
var URLCountry = 'https://restcountries.com/v2/alpha/'


var req = new XMLHttpRequest();

city.addEventListener("keypress", function(event) {
    
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
            //Wether informations
            wetherSearch(city);

            //Country Informations
            var country = resp_obj[0].country;
            searchCountry(country);

            //Map
            var latitude = resp_obj[0].latitude;
            var longitude = resp_obj[0].longitude;
            document.getElementById('weathermap').innerHTML = "<div id='map' style='height: 250px; width: 100%; margin-top: 50px; position: relative;'></div>";
            var map = L.map('map').setView([latitude, longitude], 13);
            var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 10,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
            map.addLayer(osm);
        }else {
            alert("Oops! The name you wrote does not match any city :/");
        }
        
    }
    req.open("GET", URLCity+city.value,true);
    req.setRequestHeader("X-Api-Key",KEYCity);
    req.send(null);
}

function wetherSearch(city){
    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);

        if( resp_obj['cod'] == "404" || resp_obj['cod'] == "400"){
            alert("O nome fornecido não corresponde a nenhuma cidade!");
        }else{
            //document.getElementById('widget').style.display = 'block';
            temperaturaAtual.innerHTML = resp_obj['main']['temp'];
            temperaturaMaxima.innerHTML = resp_obj['main']['temp_max'];
            temperaturaMinima.innerHTML = resp_obj['main']['temp_min'];

            var icon = resp_obj['weather'][0]['icon'];
            var URL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            imgWether.src = URL;

            description.innerHTML= resp_obj['weather'][0]['description'];

        }
    }
    req.open('GET', URLWether+city.value+KEYWether);
    req.send(null)
}

function searchCountry(country){
    var req = new XMLHttpRequest();
    req.onloadend = function(){
        resp = req.responseText;
        resp_obj = JSON.parse(resp);
        
        countryName.innerHTML = resp_obj.name;
        currencies.innerHTML = resp_obj.currencies[0].name;
        capital.innerHTML = resp_obj.capital;
        language.innerHTML = resp_obj.languages[0].name;
        population.innerHTML=resp_obj.population;
        imgFlag.src = resp_obj.flags.svg;

    }

    req.open("GET", URLCountry + country);
    req.send(null);
}

