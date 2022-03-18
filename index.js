//import libs
import axios from 'axios'
import { load } from 'cheerio'
import express from 'express'
import  bodyparser  from 'body-parser'
//my libs
import { scrappedArray } from './scrapper.js'
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
//Bodyparser config
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

//routes
app.get('/', (req,res) => {
  res.render('index', {scrappedArray})
})

app.get('/api', (req,res) => {
  res.json(scrappedArray)
})

app.listen(PORT, () => console.log(`Server runing on http://localhost:${PORT}`))