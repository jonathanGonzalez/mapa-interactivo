//cargar datos desde un archivo json
function getData() 
{
  datajson = [];
  fetch('/data/data.json')
  .then(response => response.json())
  .then(data => 
  {
    datajson= data;
    initMap(datajson);
  });
}

function initMap(universidades)
{
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  var uluru0 = {lat: -27.344, lng: 131.036};
  var uluru1 = {lat: -30.344, lng: 131.036};
  // The map, centered at Uluru
  var mapa = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
  
  // The marker, positioned at Uluru
  var markers = [];
  var infowindow = [];
  var contentString = [];

//inicia foreach
universidades.forEach(function (universidad, i) 
{
  console.log('%d: %s', i, universidad);
  var markers = [];
  var infowindow = [];
  var contentString = [];
  //arr[index] = item * 10;
  var coors = {lat: -27.344 + i, lng: 131.036};
  markers[i] = new google.maps.Marker({position: coors, map: mapa});
  //markers[1] = new google.maps.Marker({position: uluru1, map: mapa});
  contentString[i] = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h3 id="firstHeading" class="firstHeading">'+universidad.UNIVERSIDAD+'</h3>'+
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
          '<a class="nav-link js-scroll-trigger" href="#experience">Experience</a>'+
          '<button onclick="verUniversidad('+ i +')">Ver Universidad</button>'+
          '</div>'+
          '</div>';
    infowindow[i] = new google.maps.InfoWindow({
        content: contentString[i]
      });

    markers[i].addListener('click', function() {
        infowindow[i].open(map, markers[i]);
      });
});
}

function verUniversidad(id_universidad)
{
  console.log(id_universidad);
  datajson = [];
  fetch('/data/data.json')
  .then(response => response.json())
  .then(data => 
  {
    datajson= data;
    console.log(obtenerUniversidad(datajson, id_universidad));
    //crear función para pintar html
  });
  window.scrollTo(0, 600);
  //reemplazar información de las universidad
  //window.location.hash = "experience";
}

function obtenerUniversidad(universidades, id_universidad)
{
  universidades.forEach(function (universidad, i) 
  {
    //console.log("ciclo" + i);
    if(id_universidad === i)
    {
      //console.log(universidad);
      universidadSeleccionada = universidad;
    }
  });
  return universidadSeleccionada;
}
