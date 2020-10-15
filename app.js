window.addEventListener('load',() =>{
  let longitude;
  let latitude;
  let temperatureDegree = document.querySelector('.temperatureDegree');
  let description = document.querySelector('.description');
  let timezone = document.querySelector('.timezone');
  let getWeatherUnit = document.querySelector('.degree-section span');
  let celciusButton = document.querySelector('.celcius-btn');
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;
      fetch(api)
      .then(response =>{
        return response.json();
      })
      .then(response =>{
        console.log(response);
        const {temperature , summary, icon} = response.currently;
        temperatureDegree.textContent = temperature;
        description.textContent = summary;
        timezone.textContent = response.timezone;
        let celsius = (temperature - 32 ) * (5 / 9);
        setWeatherIcon(icon, document.querySelector('.icon'));
        celciusButton.addEventListener('click',() =>{
          if (getWeatherUnit.textContent === 'F'){
            getWeatherUnit.textContent = 'C';
            celciusButton.textContent = 'Click here to see in Farenheit'
            temperatureDegree.textContent = Math.floor(celsius);
          } else{
            getWeatherUnit.textContent = 'F';
            celciusButton.textContent = 'Click here to see in Celcius';
            temperatureDegree.textContent = temperature;
          }
        })
      })
      .catch(err => {
        console.log(err);
        alert("Oops Try again in sometime");
      });
    });
  }
  function setWeatherIcon(icon,iconId){
    const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});