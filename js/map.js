function initMap() 
{
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    var uluru2 = {lat: -27.344, lng: 131.036};
    // The map, centered at Uluru
    var mapa = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
    
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: mapa});
    var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Universidad 1</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '<a class="nav-link js-scroll-trigger" href="#experience">Experience</a>'
            '</div>'+
            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
}