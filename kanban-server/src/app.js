const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const path = require('path');
// const serveStatic = require('serve-static');

const app = express()
// app.use(serveStatic(__dirname + "/dist"));
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, '../client/dist')));
app.post('/register', (req, res) => {
  res.send({
    message: `${req.body.email} are now registered!`
  })
})
let port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
