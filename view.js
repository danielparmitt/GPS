
window.addEventListener('load',()=>{
    
        
        var mymap = L.map('mapid').setView([28.710563, 77.121507], 18);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlrcmFudDkxMTk5OCIsImEiOiJjanM0Yzl1N2owM2prNDRueTF2ODVpNXVrIn0.uinLbRGMyalvL3atx8mUXA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 25,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
    var myIcon = L.icon({
        iconUrl: './topcar.png',
        iconSize: [30,19]
    });
    
    // var marker = L.marker([28.710491, 77.121697], {icon: myIcon,rotationAngle:30}).addTo(mymap);
    
    var marker1 = L.marker([28.7096,77.1227]).addTo(mymap).bindPopup('<img src="https://scontent.fdel1-2.fna.fbcdn.net/v/t1.0-1/c0.0.720.720a/p720x720/26991742_2015001612049116_2583387590996392755_n.jpg?_nc_cat=101&_nc_ht=scontent.fdel1-2.fna&oh=bad4f00cb4b83a583a829dc20d2b7b66&oe=5CEBDA6A" height="200px" width="150px"/> <br><p>Brain Mentors pvt ltd</p>');
    
    var popup = L.popup();
    function onMapClick(e) {
        
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
            console.log(e.latlng);
    }
    mymap.on('click', onMapClick);    

        var latlngs = [
        
            [28.710491, 77.121697],
            [28.710634, 77.121467],
            [28.710159, 77.121031],
            [28.710484, 77.120569],
            [28.710094, 77.120213],
            [28.710425, 77.119734]
        ];
        
        var polyline = L.polyline(latlngs, {color: 'blue'}).addTo(mymap);

            // marker.remove();
            // var myMovingMarker = L.Marker.movingMarker(latlngs,30000,{autostart: false});
            // mymap.addLayer(myMovingMarker);
            // myMovingMarker.start();
        






        var locations = [
            {
                "lat": 28.710491,
                "recorded_at_ms": 29000,
                "lng": 77.1216971,
                "bearing": 30
            },
            {
                "lat": 28.710634,
                "recorded_at_ms": 35000,
                "lng": 77.121467,
                "bearing": 30
            },
            {
                "lat": 28.710159,
                "recorded_at_ms": 41000,
                "lng": 77.121031,
                "bearing": -60
            },
            {
                "lat": 28.710484,
                "recorded_at_ms": 47000,
                "lng": 77.120569,
                "bearing": 30
            },
            {
                "lat": 28.710094,
                "recorded_at_ms": 54000,
                "lng": 77.120213,
                "bearing": -60
            },
            {
                "lat": 28.710425,
                "recorded_at_ms": 61000,
                "lng": 77.119734,
                "bearing": 30
            }
        ];
        
        var Icon = L.DivIcon.extend({
            createIcon: function() {
                // outerDiv.style.transform is updated by Leaflet
                var outerDiv = document.createElement('div');
                this.div = document.createElement('div');
                this.div.classList.add('ferrari');
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
        
        var icon = new Icon();
        var movmarker = L.movingMarker([locations[0].lat, locations[0].lng], {
            destinations: locations.map(function(item, index, array) {
                var duration = index === 0 ? 1000 : item.recorded_at_ms - array[index - 1].recorded_at_ms;
                return {
                    latLng: [item.lat, item.lng],
                    duration: duration,
                    bearing: item.bearing,
                };
            }),
            icon: icon,
        });
        
        movmarker.on('destinationsdrained', function() {
            console.log('done');
        });
        
        movmarker.on('start', function() {
            icon.rotate(locations[0].bearing);
            
        });
        movmarker.on('destination', function(destination) {
            if (destination.bearing !== undefined) {
                icon.rotate(destination.bearing);
            }
        });
        
        movmarker.addTo(mymap);
        
    
    });






