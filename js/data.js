// console.log("Data linked");



function getData2() {
    // console.log("inside the data");
    // datajson2 = [];
    fetch("/data/newData.json")
    .then(response => response.json())
    .then(data => {
      datajson = data;
       convertData(data) 

    });
}
getData2()
const convertData = (datajson2) => {
    // console.log(datajson2)
    let listaUniversidades = datajson2
    // for (const universidad of listaUniversidades) {
    //   // console.log(universidad.UNIVERSIDAD);
    // }
    listaReal =[]
    listaEspecialidades =[]
    listaUniversidades.map(universidad => {

        if (universidad.UNIVERSIDAD) {
            // console.log(universidad.UNIVERSIDAD    );
          
            universidad.ESPECIALIDADES =[...[universidad.ESPECIALIDADES],[universidad.LINK]]
            listaReal = [...listaReal, universidad]
           

        } else {

          
        }
         console.log(universidad);    
    })

    // console.log(listaReal)
    // console.log(listaEspecialidades)
}