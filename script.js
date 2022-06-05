const map = L.map('map').setView([-25,95 ], 2);
        // const markr=L.marker([0,0]).addTo(map);
        
        const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tiles=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution
        });
        tiles.addTo(map);
        const api_url='https://api.wheretheiss.at/v1/satellites/25544';
        var myIcon = L.icon({
            iconUrl: 'iss.png',
            iconSize: [40, 40],
            iconAnchor: [25, 25]
            // popupAnchor: [-3, -76],
            // shadowUrl: 'my-icon-shadow.png',
            // shadowSize: [68, 95],
            // shadowAnchor: [22, 94]
        });
        const markr=L.marker([0, 0], {icon: myIcon}).addTo(map);
        
        
        let firstTime=true;
        async function getIss(){
            const response=await fetch(api_url); 
            const data=await response.json();
            const {latitude, longitude}=data;
            console.log(latitude);
            console.log(longitude);
            markr.setLatLng([latitude,longitude]);
            if(firstTime==true){

                map.setView([latitude,longitude],5);
                firstTime=false;
            }
            document.getElementById("lat").textContent=latitude;
            document.getElementById("lon").textContent=longitude;
            
            
        
        }
        
        getIss();
        setInterval(getIss,1000);