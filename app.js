const button = document.querySelector("button");


button.addEventListener("click", ()=>{

    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
    else{
        button.innerText = "Your browser not support";
    }
    
});


function onSuccess(position){

    button.innerText = "Detecting your location...";

    let {latitude, longitude} = position.coords;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9bc66ee477ba4037bf2347b1a6748da9`)
    
    
    .then(response => response.json()).then(response =>{

        let allDetails = response.results[0].components;
        console.table(allDetails);

        let {city, postcode, country} = allDetails;
        button.innerText = `${city} ${postcode}, ${country}`;

    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}

function onError(error){

    if(error.code == 1){
        button.innerText = "You denied the request";
    }

    else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }

    else{
        button.innerText = "Something went wrong";
    }

    button.setAttribute("disabled", "true");
}