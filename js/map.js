
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
  // const excel = XLSX.readFile("data/MAPA.xlsx");
  // var nombreHoja = excel.SheetNames;
  // let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
  // console.log("datos desde excel", datos);
  
  fetch("data/mapa3.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
      //console.log("------ datajson: ",datajson)
      initMap(datajson);
    });
}

function initMap(universidades) {
  var centroMapa = {
    lat: 4.635280,
    lng: -74.120177
  };
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
    //console.log("-------- universidad: ", universidad);
    coors = {"lat":parseFloat(universidad.LAT), "lng":parseFloat(universidad.LNG)};
    if(universidad.LAT === 'undefined' || universidad.LAT === '')
    {

    }
    else
    {
    markers[i] = new google.maps.Marker({ position: coors,
                                          map: mapa,
                                          label: {text: universidad.UNIVERSIDAD, color: "white"} });
    contentString[i] = `
    <div className="contaier">
        <div class="container d-flex pt-3" id="content">
        
        <div class="p-2"   id="siteNotice">
            <img width="100px" src="${universidad.IMAGEN}">
        </div>
        <div class="p-2">
            <h4 id="firstHeading" class="firstHeading">
            ${universidad.UNIVERSIDAD}
            </h4>
                <div id="bodyContent">
                    <p class="card-text">
                        <b class= h6 mt-1 >Ciudad: </b>
                        ${universidad.CIUDAD}</br>
                    </p>   
                    <p class="card-text">
                        <b class= h6 mt-1 >PBX: </b>
                        ${universidad.TELEFONO}</br>
                    </p>   
                    <p class="card-text">
                        <b class= h6 mt-1 >Direccion: </b>
                        ${universidad.DIRECCION}</br>
                    </p>   
                    <p class="card-text">
                        <b class= h6 mt-1 >
                        Email:
                         </b>
                        ${universidad.EMAIL}</br>
                    </p>   
                    <div className="container">
                        <button class="btn btn-danger btn-sm mt-2" onclick="verUniversidad(${i})">Ver Universidad
                        </button>
                    </div>
                </div>
            
            </div>
        </div>
        
    </div>
    `;
    infowindow[i] = new google.maps.InfoWindow({
      content: contentString[i]
    });

    markers[i].addListener("click", function() {
      infowindow[i].open(map, markers[i]);
    });
  }
  });
}

function verUniversidad(id_universidad) {
  //console.log("----- id_universidad", id_universidad);
  var elmnt = document.getElementById("awards");
  elmnt.scrollIntoView();
  datajson = [];
  fetch("data/mapa3.json")
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


      logoapp.src = universidadSeleccionada.IMAGEN;
      logoapp2.src = universidadSeleccionada.IMAGEN;
      nombre.innerHTML = universidadSeleccionada.UNIVERSIDAD;
      nombre2.innerHTML = universidadSeleccionada.UNIVERSIDAD;
      ciudad.innerHTML = universidadSeleccionada.CIUDAD;
      ciudad2.innerHTML = universidadSeleccionada.CIUDAD;
      telefono2.innerHTML = universidadSeleccionada.TELEFONO;
      direccion2.innerHTML = universidadSeleccionada.DIRECCION;
      email2.innerHTML = universidadSeleccionada.EMAIL;


      naturaleza.innerHTML = universidadSeleccionada.NATURALEZA;
      convocatorias.innerHTML = universidadSeleccionada.CONVOCATORIAS;
      especializaciones.innerHTML = ``;
      
      let lista = "";



      // console.log("--------- universidadSeleccionada", universidadSeleccionada)
      universidadSeleccionada.ESPECIALIDADES.forEach(function (especialidades, i){
        console.log(especialidades);
        lista = `${lista}
        <div class='col-lg-7 col-md-12 col-sm-12 pl-0'>
          <a target='_blank' href=${universidadSeleccionada.LINK[i]}>
            <i class='fa-li fa fa-graduation-cap text-secundary'>
            </i>${especialidades}
          </a>
        </div>`;
      });
     

      especializaciones.innerHTML = lista





    });
  //window.scrollTo(0, 600);

}

function obtenerUniversidad(universidades, id_universidad) {
  listaUniversidades = universidades
  // console.log(id_universidad);
  let ESPECIALIDADES = []
  let LINK = []
  let listafiltrada =  listaUniversidades.filter(universidad => universidad.UNIVERSIDAD === universidades[id_universidad].UNIVERSIDAD).forEach(universidad => {
    LINK = [...LINK,universidad.LINK ]
    ESPECIALIDADES = [...ESPECIALIDADES,universidad.ESPECIALIDADES ]
  })
   

  let universidadSelcionada = { 
    "UNIVERSIDAD": universidades[id_universidad].UNIVERSIDAD,
    "NATURALEZA": universidades[id_universidad].NATURALEZA,
    "CIUDAD": universidades[id_universidad].CIUDAD,
    "ESPECIALIDADES": ESPECIALIDADES,
    "LINK": LINK,
    "CONVOCATORIAS": universidades[id_universidad].CONVOCATORIAS,
    "TELEFONO": universidades[id_universidad].TELEFONO,
    "IMAGEN": universidades[id_universidad].IMAGEN,
    "DIRECCION": universidades[id_universidad].DIRECCION,
    "LAT": universidades[id_universidad].LAT,
    "LNG": universidades[id_universidad].LNG,

  }

    // console.log(universidadSelcionada);
 
    return  universidadSelcionada
}