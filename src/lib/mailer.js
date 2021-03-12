const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "edffe30d5d0631",
      pass: "8c90dda583635b"
    }
})