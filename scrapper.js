//import libs
import axios from 'axios'
import { load } from 'cheerio'
//vars
const url = 'https://www.idt.org.br/vagas-disponiveis'

const getData = async() => axios(url).then(response => {

  const html = response.data
  const $ = load(html)

  let dataArr = []
  let cityArr = []
  let data = []

  $("#ContentPlaceHolder1_lblCorpo > table.table > tbody > tr").each((idx, el) => {
    //adicionando as cidades
    $(el).find("td > em").each((i, el) => {
      if($(el).children().length == 0){
        let obj = {
          cityIndex: idx,
          cityName: $(el).text(),
          cityInfo: $(el).parent().text().replace($(el).text(), '').replace(/\n|\t|\n\t/g,'')
        }
        cityArr.push(obj)
      }
    })
    //adicionando as vagas
    let arr = []
    $(el).find('td').each((i,el) => {
      arr.push($(el).text().replace(/\n|\t|\n\t/g,''))
    })
    dataArr.push(
      {
        index: idx,
        vaga: arr[0],
        qt: arr[1]
      }
    )
  })

  //trocando a cidade por objeto
  cityArr.forEach((el, i) => {
    dataArr[el.cityIndex] = el
  })
  // removendo resumo
  dataArr = dataArr.slice(0,dataArr.length - 4)
  // add ultimo elemento ao array
  cityArr = [...cityArr, {cityIndex: dataArr.length}]
  //cria lista de cidades com index de inicio e fim
  let cityArrIndexed = []
  for(let i = 0; i < cityArr.length -1; i++){
    cityArrIndexed.push(
      {
        city: cityArr[i].cityName,
        idx: [cityArr[i].cityIndex, cityArr[i+1].cityIndex]
      }
    )
  }

  function printData(indexArr, dataArr){
    let arr = []
    for(let i = indexArr[0]; i < indexArr[1]; i++){
      arr.push(dataArr[i])
    }
    return arr
  }

  for(let i = 0; i < cityArr.length -1; i++){
    data.push(printData(cityArrIndexed[i].idx, dataArr))
  }

  return data
})

let scrappedArray = await getData()

export {scrappedArray}