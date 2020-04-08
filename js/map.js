Swal.fire({
  icon: 'success',
  title: 'Mapa de Especialidades Médicas',
  confirmButtonText: 'continuar',
  confirmButtonColor: '#990000',
  text: 'a continuación puede ver un mapa con las diferentes universidades con especialidades médicas en Colombia, seleccione una y consulte su información y sus especialidades',
})
//cargar datos desde un archivo json
function getData() {
  datajson = [];
  fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
      initMap(datajson);
    });
}

function initMap(universidades) 
{
  var centroMapa = { lat: 4.635280, lng: -74.120177 };
  var mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
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
    ] = `<div class="text-lg-center pt-3" id="content"><div id="siteNotice"><img width="100px" src="${universidad.logo}"></div><h4 id="firstHeading" class="firstHeading">${universidad.nombre}</h4><div id="bodyContent"><p><b class= h6 mt-1 >Ciudad: </b>${universidad.ciudad}</br><button class="btn btn-danger btn-sm mt-2" onclick="verUniversidad(${i})">Ver Universidad</button></div></div>`;
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
  fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
      universidadSeleccionada = obtenerUniversidad(datajson, id_universidad);

      var logoapp = document.getElementById("logoapp");
      var nombre = document.getElementById("nombre_universidad");
      var nombre2 = document.getElementById("nombre_universidad2");
      var ciudad = document.getElementById("ciudad");
      var naturaleza = document.getElementById("naturaleza");
      var convocatorias = document.getElementById("convocatorias");
      var especializaciones = document.getElementById("especialidades");


      logoapp.src = universidadSeleccionada.logo;
      logoapp2.src = universidadSeleccionada.logo;
      nombre.innerHTML = universidadSeleccionada.nombre;
      nombre2.innerHTML = universidadSeleccionada.nombre;
      ciudad.innerHTML = universidadSeleccionada.ciudad;
      ciudad2.innerHTML = universidadSeleccionada.ciudad;
      telefono2.innerHTML = universidadSeleccionada.telefono;
      direccion2.innerHTML = universidadSeleccionada.direccion;
      email2.innerHTML = universidadSeleccionada.email;


      naturaleza.innerHTML = universidadSeleccionada.naturaleza;
      convocatorias.innerHTML = universidadSeleccionada.convocatorias;
      //especializaciones.innerHTML = "";
      
      //ciclo
      lista = "";
      universidadSeleccionada.especialidades.forEach(function(especialidad, i) {
        lista = `${lista}
        <div class='col-lg-7 col-md-12 col-sm-12 pl-0'>
          <a target='_blank' href=${especialidad.enlace}>
            <i class='fa-li fa fa-graduation-cap text-secundary'>
            </i>${especialidad.nombre}
          </a>
        </div>`;
      });
      especializaciones.innerHTML = lista;
      //$("#especialidades").append(lista);
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
