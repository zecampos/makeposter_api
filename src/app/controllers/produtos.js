const express = require('express')


const router = express.Router()



router.get('/', async (req, res) => {
    try {
        return res.send({ message: 'Produtos listados com sucesso'})

    } catch (error) {
        return res.status(400).send({ error: 'Erro ao acessar produtos' })
    }
})


module.exports = app => app.use('/produtos', router)