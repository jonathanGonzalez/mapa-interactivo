var XLSX = require("xlsx")


const ExcelToJason = () => {
    const excel = XLSX.readfile('/data/MAPA.xlsx')
    var nombreHoja = excel.SheetNames;
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    console.log(datos)
}
ExcelToJason();