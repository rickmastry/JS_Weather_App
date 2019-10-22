window.addEventListener('load', ()=>{
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let alertDescription = document.querySelector('.alert-description');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;
           
           const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = `${proxy}https://api.darksky.net/forecast/2ac315464fa68216a84905f690721854/${lat},${long}`

           fetch(api)
           .then(response =>{
               return response.json();
           })
           .then(data => {
              console.log(data)
              const {temperature, icon} = data.currently; 
              const {summary} = data.daily;
              /*const {description} = data.alerts[0];
              if(!description){
                  console.log('no alerts at this time');
                  return true;
              }*/
              //console.log(description)
              //set DOM elements from api
              tempDegree.textContent = Math.floor(temperature);
              tempDescription.textContent = summary;
              locationTimeZone.textContent = data.timezone;
              //alertDescription.textContent = description;
              //set icons
              setIcons(icon, document.querySelector('.icon'));
           })
        });
     }
     function setIcons(icon, iconID){
         const skycons = new Skycons({color: "white"});
         const currentIcon = icon.replace(/-/g, "_").toUpperCase();
         skycons.play();
         return skycons.set(iconID, Skycons[currentIcon]);
     }
})


  
   



const button = document.querySelector('.button');
button.addEventListener('click', (e)=>{
    e.preventDefault();
   
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
     
    
   
    const api_call = `https://api.opencagedata.com/geocode/v1/json?q=${city}%C3%ADba%2C+${state}&key=fba487552a54417280c3eefb4aed07d3&pretty=1`;
   
    fetch(api_call)
    .then(response =>{
        return response.json();
    })
    .then(data_call => {
        console.log(data_call)
        var latitude = data_call.results[0].geometry.lat; 
        var longitude = data_call.results[0].geometry.lng;
        let tempDescription = document.querySelector('.temp-description');
        let tempDegree = document.querySelector('.temp-degree');
        let locationTimeZone = document.querySelector('.location-timezone');
        let locationCity = document.querySelector('.location-city');
        let alertDescription = document.querySelector('.alert-description');
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/2ac315464fa68216a84905f690721854/${latitude},${longitude}`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data => {
           console.log(data)
           const {temperature, icon} = data.currently; 
           const {summary} = data.daily;
           /*const {description} = data.alerts;
           if(description === NULL){
            console.log('no alerts at this time');
            return true;
           }*/
           const place = document.getElementById('city').value ;
           const placeUpper = place.toUpperCase();
           const placetwo = document.getElementById('state').value ;
           const placetwoUpper = placetwo.toUpperCase();
           //console.log(description)
           //set DOM elements from api
           tempDegree.textContent = Math.floor(temperature);
           tempDescription.textContent = summary;
           locationTimeZone.textContent = data.timezone;
           locationCity.textContent = placeUpper+' '+  placetwoUpper;
           //alertDescription.textContent = description;
           //set icons
           setIcons(icon, document.querySelector('.icon'));
        })

        function setIcons(icon, iconID){
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

        
    })
    
   
  
  
        })