const XLSX  = require('xlsx');

const excelToJson = () => {
 const excel = XLSX.readFile("data/MAPA.xlsx");
 var nombreHoja = excel.SheetNames;
 let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

//  console.log(datos);
    listarUniversidades(datos)

}

const listarUniversidades = (datos) => {
    // console.log(datos);
    let listaUniversidades = datos 
    // console.log(listaUniversidades);
    listaUniversidades.map(universidad =>{
        console.log(universidad);
        if(universidad.UNIVERSIDAD){
            // console.log(universidad.UNIVERSIDAD);
            //Si existe la prompiedad UNIVERSIDAD  es una universidad sino existe es una especialiad 
            // Entonces debe recorer el nuevamente la lista desde el index de universidad y agregar todas los onejeros sin la Propiedad UNIVERISDAD dentro de la propiedad universidad.ESPECIALIDADES  
        }
        else{
            // console.log(universidad.ESPECIALIDADES);

        }

    })

}   

excelToJson()