// const http = require('http')
// const fs = require('fs')

import path from 'path'
import express from 'express'
import { create } from 'express-handlebars'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()

import homeRoute from './routes/home'
import coursesRoute from './routes/courses'
import addCourseRoute from './routes/add-course'
import aboutRoute from './routes/about'
import cartRoute from './routes/cart'

const hbs = create({
  defaultLayout: `main`,
  extname: `hbs`
})

const PORT = process.env.PORT || 3005

app.engine(`hbs`, hbs.engine);
app.set(`view engine`, `hbs`)
app.set(`views`, `views`)

app.use(express.static(path.join(__dirname, `public`)))
app.use(express.urlencoded({extended: true}))

app.use(`/`, homeRoute)
app.use(`/courses`, coursesRoute)
app.use(`/add-course`, addCourseRoute)
app.use(`/about`, aboutRoute)
app.use(`/cart`, cartRoute)

app.listen(PORT, () => {
  console.log(`Server is running`)
})

// const server = http.createServer((req, res) => {
//   if (req.method === `GET`) {
//     res.writeHead(200, {
//       'Content-Type': 'text/html; charset=utf-8'
//     })

//     if (req.url === `/`) {
//       fs.readFile(
//         path.join(__dirname, `views`, `index.html`),
//         `utf-8`,
//         (err, content) => {
//           if (err) throw err

//           res.end(content)
//         }
//       )
//     } else if (req.url === `/about`) {
//       fs.readFile(
//         path.join(__dirname, `views`, `about.html`),
//         `utf-8`,
//         (err, content) => {
//           if (err) throw err

//           res.end(content)
//         }
//       )
//     }
//   }
// })

// server.listen(3005, () => {
//   console.log(`Server is running`)
// })
