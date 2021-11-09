const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/sendMessage', async (req, res) => {

    let {name, email, message} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'My profile page', // sender address
        to: "MartaVeresovaa@gmail.com", // list of receivers
        subject: 'My profile page', // Subject line
        // text: 'Привет, учусь отправлять письма', // plain text body
        html: `<b>Сообщение с вашего portfolio</b>
            <div><b>name:</b> ${name}</div>
            <div><b>email:</b> ${email}</div>
            <br/>
            <div>${message}</div>`, // html body
    })
    res.send('sendMessage')
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})