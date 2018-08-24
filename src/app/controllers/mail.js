const express = require("express");
const puppeteer = require("puppeteer");
const moment = require("moment");
const nodemailer = require("nodemailer");
const fs = require("fs");

const enviarPDF =  (nome, pathArquivo) => {
  
    console.log(pathArquivo);
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.ensaiogospel.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "financeiro@ensaiogospel.com", // generated ethereal user
          pass: "Jose_2505" // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Server Email - Print" <financeiro@ensaiogospel.com>', // sender address
        to: "joseguilhermesantoscampos@gmail.com", // list of receivers
        subject: "Nova Impressão", // Subject line
        text: "", // plain text body
        html: "",
        attachments: [
          {
            // file on disk as an attachment
            filename: nome,
            path: pathArquivo // stream this file
          }
        ]
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
          res.send({ msg: "Erro ao enviar" });
        }

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.send({ msg: "Enviado com Sucesso!!!" });
        /*fs.unlink(pathArquivo, err => {
          if (err) {
            console.log(err);
          }
          console.log("deletado");
        });*/
      });
    });
  
};

const router = express.Router();

gerarPDF = async base64 => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const arquivo = `<img src="${base64}" />`;
    const fileData = moment().format("HH-mm-DD-MM-YYYY");
    const pathFile = `file/${fileData}.pdf`;
    await page.setContent(arquivo);
    await page.emulateMedia("print");
    await page.pdf({
      path: pathFile,
      format: "A4"
    });

    await browser.close();

    enviarPDF(fileData, pathFile);
    console.log("done");
  } catch (error) {
    return error;
  }
};

router.get("/", async (req, res) => {
  try {
    return res.send({ mensagem: "Aguardando processamento..." });
  } catch (error) {
    return res.send({ mensagem: "Erro ao processar" });
  }
});

router.post("/", async (req, res) => {
  try {
    await gerarPDF(req.body.base);
    return res.send({ mensagem: "arquivo recebido" });
    console.log(req);
  } catch (error) {
    return res.send({ mensagem: "erro ao receber requisição" });
  }
});

module.exports = app => app.use("/mail", router);
