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

function initMap(universidades) 
{
  var centroMapa = { lat: -25.344, lng: 131.036 };
  var mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: centroMapa
  });

  // The marker, positioned at Uluru
  var markers = [];
  var infowindow = [];
  var contentString = [];

  //inicia foreach
  universidades.forEach(function(universidad, i) {
    console.log("%d: %s", i, universidad);
    coors = universidad.coordenadas;
    markers[i] = new google.maps.Marker({ position: coors, map: mapa });
    contentString[
      i
    ] = `<div class="text-lg-center pt-3" id="content"><div id="siteNotice"></div><h4 id="firstHeading" class="firstHeading">${universidad.nombre}</h4><div id="bodyContent"><p><b class= h6 mt-1 >Ciudad: </b>${universidad.ciudad}</br><button class="btn btn-dark btn-sm mt-2" onclick="verUniversidad(${i})">Ver Universidad</button></div></div>`;
    infowindow[i] = new google.maps.InfoWindow({
      content: contentString[i]
    });

    markers[i].addListener("click", function() {
      infowindow[i].open(map, markers[i]);
    });
  });
}


function verUniversidad(id_universidad) {
  console.log(id_universidad, this.hash);
  var elmnt = document.getElementById("awards");
  elmnt.scrollIntoView();
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
      var especializaciones = document.getElementById("especialidades");

      // var texto_nombre = document.createTextNode(
      //   universidadSeleccionada.nombre
      // );
      // var texto_nombre2 = document.createTextNode(
      //   universidadSeleccionada.nombre
      // );
      // var texto_ciudad = document.createTextNode(
      //   universidadSeleccionada.ciudad
      // );
      // var texto_naturaleza = document.createTextNode(
      //   universidadSeleccionada.naturaleza
      // );
      // var texto_convocatorias = document.createTextNode(
      //   universidadSeleccionada.convocatorias
      // );

      nombre.innerHTML = universidadSeleccionada.nombre;
      nombre2.innerHTML = universidadSeleccionada.nombre;
      ciudad.innerHTML = universidadSeleccionada.ciudad;
      naturaleza.innerHTML = universidadSeleccionada.naturaleza;
      convocatorias.innerHTML = universidadSeleccionada.convocatorias;
      especializaciones.innerHTML = "";

      //nombre.appendChild(texto_nombre);
      // nombre2.appendChild(texto_nombre2);
      // ciudad.appendChild(texto_ciudad);
      // naturaleza.appendChild(texto_naturaleza);
      // convocatorias.appendChild(texto_convocatorias);
      //crear función para pintar

      
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
  //window.scrollTo(0, 600);
  
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
