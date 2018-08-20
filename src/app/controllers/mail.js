const express = require('express')
const puppeteer = require('puppeteer');
const moment = require('moment')

const html = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC" />'


const router = express.Router()

gerarPDF = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        const arquivo = html
        const fileData = moment().format('HH-mm-DD-MM-YYYY')
        await page.setContent(arquivo);
        await page.emulateMedia('print')
        await page.pdf({
            path: `${fileData}arquivo.pdf`,
            format: 'A4',
        })
        
        await browser.close()
        console.log('done')
    } catch (error) {
        return error
    }
}



router.get('/', async (req, res) => {
    try {
        
        return res.send({ mensagem: 'Aguardando processamento...' })

    } catch (error) {
        return res.send({ mensagem: 'Erro ao processar' })
    }
})

router.post('/', async (req, res) => {
    try {
        await gerarPDF()
        return res.send({ mensagem: 'arquivo recebido' })
    } catch (error) {
        return res.send({ mensagem: 'erro ao receber requisição' })
    }
})

module.exports = app => app.use('/mail', router)