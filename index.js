//import libs
import axios from 'axios'
import { load } from 'cheerio'
import express from 'express'
//vars
const PORT = process.env.PORT || 8000
const app = express()
const url = 'https://www.idt.org.br/vagas-disponiveis'

//functions

/**
  *@param {string} type
*/
const data = (type) => axios(url).then(response => {

  const html = response.data
  const $ = load(html)

  const h4 = $('#ContentPlaceHolder1_lblCorpo > h4 > strong > span', html)
  const date = $('#ContentPlaceHolder1_lblCorpo > table:nth-child(2) > tbody > tr > td > strong:nth-child(1)', html)
  const info = $('#ContentPlaceHolder1_lblCorpo > table:nth-child(2) > tbody > tr > td > span', html)
  const tableTitle = $('#ContentPlaceHolder1_lblCorpo > table:nth-child(2) > tbody > tr > td > strong:nth-child(7)', html)
  const table = $('#ContentPlaceHolder1_lblCorpo > table.table', html)
  
  const myreplace = (html) => {
    return html.replace(/(?:\r\n|\r|\n|\t|<br>)/g, '')
  }

  if(type == 'html'){
    return `
      <style>
        *{
          font-family: sans-seriff;
        }

        tr {
          border: 1px solid rgba(0 0 0 / 40%);
        }
        
        tr > td:nth-child(2) {
          text-align: center;
        }

        td {
          padding: 4px 10px;
        }
        
        td[colspan="2"]{
          background: #e0ebff;
        }
        
        td[colspan="2"] > em {
          font-style: inherit;
          font-weight: 600;
          font-size: 22px;
        }
      </style>
      ${h4}
      ${date}
      <p>${info}</p>
      <h3>${tableTitle}</h3>
      ${table}
    `
  }

  if(type == 'obj'){
    return {
      h4,
      date,
      info,
      tableTitle,
      table,
    }
  }
})

//routes
app.get('/obj', async(req,res) => {
  res.send(await data('obj'))
})

app.get('/html', async(req,res) => {
  res.send(await data('html'))
})







app.listen(PORT, () => console.log(`Server runing on port:${PORT}`))