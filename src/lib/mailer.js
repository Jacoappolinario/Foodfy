const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "Adicione sua credencial aqui",
      pass: "Adicione sua credencial aqui"
    }
})