document.getElementById('button').addEventListener('click', appUp)
document.getElementById('input').onkeyup = function(event){
    if(event.code == 'Enter'){
        appUp();
    }
}



async function appUp(){
    let erreur = document.querySelectorAll('h4')[0]
    try{
        let city = document.getElementById('input').value;
        let cityCompare = document.getElementById('input_compare').value;
        let key = '0da0646afb285a4f7697ca7f0acae0bb';
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&mode=json&lang=fr`);
        let weatherCompare = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityCompare}&appid=${key}&units=metric&mode=json&lang=fr`);
        let objects = weather.json();
        let objectsCompare = weatherCompare.json();
        let output = document.querySelector('section.output')
        output.innerHTML = "";

        objects.then((arrays) => {
            try{
                erreur.style.visibility = 'hidden';
                output.style.visibility = 'visible';
                output.insertAdjacentHTML('afterbegin', `
                    <div class="output__div">
                        <h2 class="output__h2">${city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}, ${arrays.sys.country}</h2>
                        <img src="http://openweathermap.org/img/wn/${arrays.weather[0].icon}.png">
                        <h3 class="output__h3">Humidity : ${arrays.main.humidity}%</h3>
                        <h3 class="output__h3">Weather : ${arrays.weather[0].main}</h3>
                        <h3 class="output__h3">Temp : ${Math.floor(Math.ceil(arrays.main.temp))} °C</h3>
                        <h3 class="output__h3">Min : ${Math.floor(Math.ceil(arrays.main.temp_min))}°C Max : ${Math.floor(Math.ceil(arrays.main.temp_max))}°C</h3>
                    </div>
                ` )
            }
            catch(err){
                document.querySelector('.output').style.visibility = 'hidden';
                document.querySelectorAll('.comparediv')[1].style.visibility = 'hidden';
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red';
                if(document.getElementById('input').innerText == "" || document.getElementById('input_compare').innerText == ""){
                    erreur.innerText = "One input is empty/or the town doesn't exist.";
                } else {
                    erreur.innerText = "This town doesn't exist";
                }
            }
        })

        objectsCompare.then((arrays) => {
            try{
                erreur.style.visibility = 'hidden';
                output.style.visibility = 'visible';
                output.insertAdjacentHTML('beforeend', `
                    <div class="output__div">
                        <h2 class="output__h2">${cityCompare.charAt(0).toUpperCase() + cityCompare.slice(1).toLowerCase()}, ${arrays.sys.country}</h2>
                        <img src="http://openweathermap.org/img/wn/${arrays.weather[0].icon}.png">
                        <h3 class="output__h3">Humidity : ${arrays.main.humidity}%</h3>
                        <h3 class="output__h3">Weather : ${arrays.weather[0].main}</h3>
                        <h3 class="output__h3">Temp : ${Math.floor(Math.ceil(arrays.main.temp))} °C</h3>
                        <h3 class="output__h3">Min : ${Math.floor(Math.ceil(arrays.main.temp_min))}°C Max : ${Math.floor(Math.ceil(arrays.main.temp_max))}°C</h3>
                    </div>
                ` )
            }
            catch(err){
                document.querySelectorAll('.comparediv')[1].style.visibility = 'hidden';
                document.querySelector('.output').style.visibility = 'hidden';
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red';
                if(document.getElementById('input').innerText == "" || document.getElementById('input_compare').innerText == ""){
                    erreur.innerText = "One input is empty/or the town doesn't exist.";
                } else {
                    erreur.innerText = "This town doesn't exist";
                }
            }
        })
        
        let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&mode=json&lang=fr`);
        let forecastCompare = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityCompare}&appid=${key}&units=metric&mode=json&lang=fr`);
        let call = forecast.json()
        let callCompare = forecastCompare.json()
        let forecastSec = document.querySelectorAll('.comparediv')[0];
        let forecastSecCompare = document.querySelectorAll('.comparediv')[1];
        forecastSec.innerHTML ="";
        forecastSecCompare.innerHTML ="";
        
        call.then((arrays) => {
            try{
                let j = 32;
                for(let i = 0; i <= 32; i += 8, j -= 8){
                        erreur.style.visibility = 'hidden';
                        forecastSec.style.visibility = 'visible';
                            forecastSec.insertAdjacentHTML('afterbegin', `
                                <div class="forecast__div">
                                    <h2 class="forecast__h2">In ${(j/8)+1} Days</h2>
                                    <h2 class="forecast__h2">${city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}, ${arrays.city.country}</h2>
                                    <img src="http://openweathermap.org/img/wn/${arrays.list[i].weather[0].icon}.png">
                                    <h3 class="forecast__h3">Humidity : ${arrays.list[i].main.humidity}%</h3>
                                    <h3 class="forecast__h3">Weather : ${arrays.list[i].weather[0].main}</h3>
                                    <h3 class="forecast__h3">Temp : ${Math.floor(Math.ceil(arrays.list[i].main.temp))} °C</h3>
                                    <h3 class="forecast__h3">Min : ${Math.floor(Math.ceil(arrays.list[i].main.temp_min))}°C Max : ${Math.floor(Math.ceil(arrays.list[i].main.temp_max))}°C</h3>
                                </div>
                        ` )
                }
            
            }
            catch(err){
                document.querySelectorAll('.comparediv')[1].style.visibility = 'hidden';
                document.querySelector('.output').style.visibility = 'hidden';
                forecastSec.style.visibility = 'hidden';
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red'
                if(document.getElementById('input').innerText == "" || document.getElementById('input_compare').innerText == ""){
                    erreur.innerText = "One input is empty/or the town doesn't exist.";
                } else {
                    erreur.innerText = "This town doesn't exist";
                }
                console.log(err)
            }
        })
        callCompare.then((arrays) => {
            try{
                let j = 32;
                for(let i = 0; i <= 32; i += 8, j -= 8){
                        erreur.style.visibility = 'hidden';
                        forecastSecCompare.style.visibility = 'visible';
                        forecastSecCompare.insertAdjacentHTML('afterbegin', `
                            <div class="forecast__div">
                                <h2 class="forecast__h2">In ${(j/8)+1} Days</h2>
                                <h2 class="forecast__h2">${cityCompare.charAt(0).toUpperCase() + cityCompare.slice(1).toLowerCase()}, ${arrays.city.country}</h2>
                                <img src="http://openweathermap.org/img/wn/${arrays.list[i].weather[0].icon}.png">
                                <h3 class="forecast__h3">Humidity : ${arrays.list[i].main.humidity}%</h3>
                                <h3 class="forecast__h3">Weather : ${arrays.list[i].weather[0].main}</h3>
                                <h3 class="forecast__h3">Temp : ${Math.floor(Math.ceil(arrays.list[i].main.temp))} °C</h3>
                                <h3 class="forecast__h3">Min : ${Math.floor(Math.ceil(arrays.list[i].main.temp_min))}°C Max : ${Math.floor(Math.ceil(arrays.list[i].main.temp_max))}°C</h3>
                            </div>
                    ` )
                }

            }
            catch(err){
                document.querySelectorAll('.comparediv')[1].style.visibility = 'hidden';
                document.querySelector('.output').style.visibility = 'hidden';
                forecastSec.style.visibility = 'hidden';
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red'
                if(document.getElementById('input').innerText == "" || document.getElementById('input_compare').innerText == ""){
                    erreur.innerText = "One input is empty/or the town doesn't exist.";
                } else {
                    erreur.innerText = "This town doesn't exist";
                }
                console.log(err)
            }
        })
    }
    catch(err){
        document.querySelectorAll('.comparediv')[0].style.visibility = 'hidden';
        document.querySelectorAll('.comparediv')[1].style.visibility = 'hidden';
        document.querySelector('.output').style.visibility = 'hidden';
        erreur.style.visibility = 'visible';
        erreur.style.color = 'red'
        erreur.innerText = "I can't communicate with the API";
        console.log(err)
}}