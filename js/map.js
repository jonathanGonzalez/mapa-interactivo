//cargar datos desde un archivo json
function getData() {
  datajson = [];
  fetch("/data/data.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
      initMap(datajson);
    });
}

function initMap(universidades) {
  // The location of Uluru
  var uluru = { lat: -25.344, lng: 131.036 };
  var uluru0 = { lat: -27.344, lng: 131.036 };
  var uluru1 = { lat: -30.344, lng: 131.036 };
  // The map, centered at Uluru
  var mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru
  });

  // The marker, positioned at Uluru
  var markers = [];
  var infowindow = [];
  var contentString = [];

  //inicia foreach
  universidades.forEach(function(universidad, i) {
    console.log("%d: %s", i, universidad);
    var markers = [];
    var infowindow = [];
    var contentString = [];
    //arr[index] = item * 10;
    var coors = { lat: -27.344 + i, lng: 131.036 };
    markers[i] = new google.maps.Marker({ position: coors, map: mapa });
    //markers[1] = new google.maps.Marker({position: uluru1, map: mapa});
    contentString[
      i
    ] = `<div  id="content"><div id="siteNotice"></div><h4 id="firstHeading" class="firstHeading">${universidad.nombre}</h4><div id="bodyContent"><p><b class=h6 >Ciudad: </b>${universidad.ciudad}</br><button class="btn btn-dark btn-sm mt-3" onclick="verUniversidad(${i})">Ver Universidad</button></div></div>`;
    infowindow[i] = new google.maps.InfoWindow({
      content: contentString[i]
    });

    markers[i].addListener("click", function() {
      infowindow[i].open(map, markers[i]);
    });
  });
}

function verUniversidad(id_universidad) {
  console.log(id_universidad);
  datajson = [];
  fetch("/data/data.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
      universidadSeleccionada = obtenerUniversidad(datajson, id_universidad);

      var nombre = document.getElementById("nombre_universidad");
      var nombre2 = document.getElementById("nombre_universidad2");
      var ciudad = document.getElementById("ciudad");
      var naturaleza = document.getElementById("naturaleza");
      var convocatorias = document.getElementById("convocatorias");

      var texto_nombre = document.createTextNode(
        universidadSeleccionada.nombre
      );
      var texto_nombre2 = document.createTextNode(
        universidadSeleccionada.nombre
      );
      var texto_ciudad = document.createTextNode(
        universidadSeleccionada.ciudad
      );
      var texto_naturaleza = document.createTextNode(
        universidadSeleccionada.naturaleza
      );
      var texto_convocatorias = document.createTextNode(
        universidadSeleccionada.convocatorias
      );

      nombre.appendChild(texto_nombre);
      nombre2.appendChild(texto_nombre2);
      ciudad.appendChild(texto_ciudad);
      naturaleza.appendChild(texto_naturaleza);
      convocatorias.appendChild(texto_convocatorias);
      //crear función para pintar

      var especializades = document.getElementById("especialidades");
      //ciclo
      lista = "";
      universidadSeleccionada.especialidades.forEach(function(universidad, i) {
        //var texto_url = document.createTextNode(universidadSeleccionada.nombre);
        lista =
          lista +
          "<li><i class='fa-li fa fa-graduation-cap text-secundary'></i>" +
          universidad.nombre +
          "</li>";
      });

      $("#especialidades").append(lista);
    });
  window.scrollTo(0, 600);
}

function obtenerUniversidad(universidades, id_universidad) {
  universidades.forEach(function(universidad, i) {
    //console.log("ciclo" + i);
    if (id_universidad === i) {
      //console.log(universidad);
      universidadSeleccionada = universidad;
    }
  });
  return universidadSeleccionada;
}
