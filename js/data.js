console.log("Data comverter linked");

function getData2() {
  datajson2 = [];
  fetch("data/newData.json")
    .then(response => response.json())
    .then(data => {
      datajson2 = data;
      convertData(datajson2)
    });
    
}
const convertData = (datajson2) => {
  // console.log(datajson2)
  let listaUniversidades = datajson2
  // for (const universidad of listaUniversidades) {
  //   // console.log(universidad.UNIVERSIDAD);
  // }
  listaUniversidades.map(uni =>{
    
    console.log(uni.UNIVERSIDAD)
  })

}
getData2()