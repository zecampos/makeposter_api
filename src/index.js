const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

require('./app/controllers/index')(app)


app.get('/', (req, res) =>{
    res.send({ message: 'bem vindo'})
})


app.listen(3000,() =>{
console.log('ouvindo na porta 3000')
})