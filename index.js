//import libs
import axios from 'axios'
import { load } from 'cheerio'
import express from 'express'
//dirname es6 modules support *_*
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//vars
const app = express()
const PORT = process.env.PORT || 8000
const url = 'https://www.idt.org.br/vagas-disponiveis'
//sets
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//routes
app.get('/', (req,res) => {

  //functions
  axios(url).then(response => {

    const html = response.data
    const $ = load(html)

    const mainData = $("#main > div > div > div.col-md-8").html()

    const title = $("#ContentPlaceHolder1_lblCorpo > h4").html()
    const infoTable = $(mainData).find('#ContentPlaceHolder1_lblCorpo > table:nth-child(2)').html()
    const dataTable = $(mainData).find('#ContentPlaceHolder1_lblCorpo > table.table').html()
    
    res.send(dataTable)
  })
})

app.listen(PORT, () => console.log(`Server runing on port:${PORT}`))