var express = require('express')
var path = require('path')
const puppeteer = require('puppeteer')


var app = express()

app.get('/', (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    const url = 'https://google.com'
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    const buffer = await page.screenshot({path: 'example.png'})
    res.type('image/png').send(buffer)
  })()
})
const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log('Hello world listening on port', port)
})
