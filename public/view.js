
window.addEventListener('load',()=>{

    // In this whole js file 'L' is a global object provided by the leaflet which will create everything


    // Here we are creating a map and focusing it's zoom at 18 at the following coordinates
    var mymap = L.map('mapid').setView([28.710563, 77.121507], 18);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlrcmFudDkxMTk5OCIsImEiOiJjanM0Yzl1N2owM2prNDRueTF2ODVpNXVrIn0.uinLbRGMyalvL3atx8mUXA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
    // Here we are creating a static icon of the car
    var myIcon = L.icon({
        iconUrl: './topcar.png',
        iconSize: [30,19]
    });
    
    // Here we are creating a marker and assigning a image of the car at coordinates 28.709784, 77.122775 on our map.
    var marker = L.marker([28.709784, 77.122775],{icon: myIcon,rotationAngle:30}).addTo(mymap);
    
    // Here we are creating a default location marker of the leaflet with the popup that will display some data and an image when clicked
    var marker1 = L.marker([28.7096,77.1227]).addTo(mymap).bindPopup('<img src="https://scontent.fdel1-2.fna.fbcdn.net/v/t1.0-1/c0.0.720.720a/p720x720/26991742_2015001612049116_2583387590996392755_n.jpg?_nc_cat=101&_nc_ht=scontent.fdel1-2.fna&oh=bad4f00cb4b83a583a829dc20d2b7b66&oe=5CEBDA6A" height="200px" width="150px"/> <br><p>Brain Mentors pvt ltd</p>');
    

    // Here we are creating a popup using global object of the leaflet
    var popup = L.popup();
    // This function will display the coordinates of the place on the map when clicked
    function onMapClick(e) {
        
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
            console.log(e.latlng);
    }
    mymap.on('click', onMapClick);    


    // These are the coordinates on the map that are needed for the creation of the polyline
    var latlngs = [
    
        [28.710491, 77.121697],
        [28.710634, 77.121467],
        [28.710159, 77.121031],
        [28.710484, 77.120569],
        [28.710094, 77.120213],
        [28.710425, 77.119734]
    ];
    
    // Here we are creating a polyline that are using the coordinates of the array provided above and adding it to our map
    L.polyline(latlngs, {color: 'blue'}).addTo(mymap);

    // Here we are creating an array of the objects that will be needed to move the car along the path
    var locations = [
        {
            "lat": 28.710491,  //latitude
            "secs": 1000,     //time 
            "lng": 77.121697,  //longitude
            "rotation": 30     //rotation angle on the turns
        },
        {
            "lat": 28.710634,
            "secs": 9000,
            "lng": 77.121467,
            "rotation": 30
        },
        {
            "lat": 28.710159,
            "secs": 17000,
            "lng": 77.121031,
            "rotation": -60
        },
        {
            "lat": 28.710484,
            "secs": 25000,
            "lng": 77.120569,
            "rotation": 30
        },
        {
            "lat": 28.710094,
            "secs": 33000,
            "lng": 77.120213,
            "rotation": -60
        },
        {
            "lat": 28.710425,
            "secs": 41000,
            "lng": 77.119734,
            "rotation": 30
        }
    ];
    
    // Here we are creating a custom class for the creation of the div icon that will display the image of the car and it has two methods, one that will create an icon and another is responsible for rotation of the icon.
    var Icon = L.DivIcon.extend({
        createIcon: function() {
            // outerDiv.style.transform is updated by Leaflet
            var outerDiv = document.createElement('div');
            this.div = document.createElement('div');
            this.div.classList.add('car');
            const img = document.createElement('img');
            img.src = './topcar.png';
            img.width = '30';
            this.div.appendChild(img);
            outerDiv.appendChild(this.div);
            return outerDiv;
        },
        rotate(deg) {
            this.div.style.transform = 'translateX(-14px) rotate(' + deg + 'deg)';
        },
        iconSize: [40, 90],
    });
    
    // Here we are creating an icon from our custom class
    var icon = new Icon();

    // Here we are creating a marker that will use our custom icon and moves the car along the specified path
    var movmarker = L.movingMarker([locations[0].lat, locations[0].lng], {
        destinations: locations.map(function(item, index, array) {
            var duration = index === 0 ? 1000 : item.secs - array[index - 1].secs;
            return {
                latLng: [item.lat, item.lng],
                duration: duration,
                rotation: item.rotation,
            };
        }),
        icon: icon,
    });
    
    movmarker.on('destinationsdrained', function() {
        console.log('done');
    });
    
    movmarker.on('start', function() {
        icon.rotate(locations[0].rotation);
        
    });
    movmarker.on('destination', function(destination) {
        if (destination.rotation !== undefined) {
            icon.rotate(destination.rotation);
        }
    });
    
    // Here we are adding our moving marker to our map.
    movmarker.addTo(mymap);
    

});






