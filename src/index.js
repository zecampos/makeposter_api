const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json({limit: '50mb'}))

require('./app/controllers/index')(app)


app.get('/', (req, res) =>{
    res.send({ message: 'bem vindo'})
})


var port = process.env.PORT || 3000
app.listen(port, function () { console.log(' server started') })