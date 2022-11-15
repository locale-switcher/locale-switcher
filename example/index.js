import { dirname, join } from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
const app = express()

app.set('view engine', 'ejs')
app.set('views', join(dirname(fileURLToPath(import.meta.url)), 'views'))

app.get('/', function (req, res) {
  res.render('pages/index', {
    acceptLanguage: req.headers['accept-language'] || 'Not specified',
  })
})

app.listen(8080, function () {
  console.log('Server listening on port 8080...')
})
