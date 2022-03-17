document.getElementById('button').addEventListener('click', async () => {
    try{
        let tc = document.getElementById('input').value;
        let key = '0da0646afb285a4f7697ca7f0acae0bb';
        let city = tc;
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
        let objects = api.json()
        objects.then((arrays) => {
            try{
                document.querySelectorAll('h4')[0].style.visibility = 'hidden';
                document.querySelector('.output').style.visibility = 'visible';
                document.querySelector('img').src = `http://openweathermap.org/img/wn/${arrays.weather[0].icon}.png`;
                document.querySelector('h2').innerText = `${city.charAt(0).toUpperCase() + city.slice(1)}, ${arrays.sys.country}`;
                document.querySelectorAll('h3')[0].innerText = `Humidity : ${arrays.main.humidity}%`;
                document.querySelectorAll('h3')[1].innerText = `Wheater : ${arrays.weather[0].main}`;
                document.querySelectorAll('h3')[2].innerText = `Temp : ${Math.floor(Math.ceil(arrays.main.temp))} °C`;
                document.querySelectorAll('h3')[3].innerText = `Min : ${Math.floor(Math.ceil(arrays.main.temp_min))}°C Max : ${Math.floor(Math.ceil(arrays.main.temp_max))}°C`;
            }
            catch(err){
                document.querySelectorAll('h4')[0].style.visibility = 'visible';
                document.querySelectorAll('h4')[0].style.color = 'red'
                document.querySelectorAll('h4')[0].innerText = "This town doesn't exist";
            }
        })
    }
    catch(err){
            document.querySelectorAll('h4')[0].style.visibility = 'visible';
            document.querySelectorAll('h4')[0].style.color = 'red'
            document.querySelectorAll('h4')[0].innerText = "I can't communicate with the API...";
    }
    

    
    
    
})