
document.getElementById('button').addEventListener('click', appUp)
document.getElementById('input').onkeyup = function(event){
    if(event.code == 'Enter'){
        appUp();
    }
}

async function appUp(){
    let erreur = document.querySelectorAll('h4')[0]
    try{
        let tc = document.getElementById('input').value;
        let key = '0da0646afb285a4f7697ca7f0acae0bb';
        let city = tc;
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&mode=json&lang=fr`);
        let objects = weather.json();
        console.log(objects)
        let output = document.querySelector('section.output')
        output.innerHTML = "";

        objects.then((arrays) => {
            try{
                erreur.style.visibility = 'hidden';
                output.style.visibility = 'visible';
                output.insertAdjacentHTML('afterbegin', `
                    <div>
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
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red'
                erreur.innerText = "This town doesn't exist";
            }
        })
        
        let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric&mode=json&lang=fr`);
        let call = forecast.json()
        let forecastSec = document.querySelector('.comparediv')
        forecastSec.innerHTML ="";
       
        call.then((arrays) => {
            try{
                let chart = document.getElementById('myChart')
                let j = 32;
                const labels = [
                    'In 1 day',
                    'In 2 days',
                    'In 3 days',
                    'In 4 days',
                    'In 5 days',
                    ];
                    const data = {
                    labels: labels,
                    datasets: [{
                        label: '°C',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [arrays.list[0].main.temp, arrays.list[8].main.temp, arrays.list[16].main.temp, arrays.list[24].main.temp, arrays.list[32].main.temp],
                    }]
                    };
                    const config = {
                        type: 'line',
                        data: data,
                        options: {}
                        };
                    const myChart = new Chart(
                    chart,
                    config
                    );
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
                document.querySelector('.output').style.visibility = 'hidden';
                forecastSec.style.visibility = 'hidden';
                erreur.style.visibility = 'visible';
                erreur.style.color = 'red'
                erreur.innerText = "This town doesn't exist";
                console.log(err)
            }
        })
    }
    catch(err){
        forecastSec.style.visibility = 'hidden';
        document.querySelector('.output').style.visibility = 'hidden';
        erreur.style.visibility = 'visible';
        erreur.style.color = 'red'
        erreur.innerText = "I can't communicate with the API";
        console.log(err)
}}