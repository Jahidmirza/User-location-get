const button = document.querySelector('button');

button.addEventListener('click', ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerHTML = 'Your browser not support';
    }
});

function onSuccess(position) {
    let (latitude, longitude)  = position.coords;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)

    .then(response => response.json()).then(result =>{
        let allDateils = result.results[0].components;
        let {county, postcode, country} = allDateils;
        console.log(county, postcode, country)
    })
  
}

function onError(error) {
    if (error.code == 1) {
        button.innerHTML = 'Your denied the request';
    }
    else if (error.code == 2){
        button.innerHTML = 'Your location not available';
    }
    else{
        button.innerHTML = 'Something want wrong';
    }
}
