const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3010

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: 'MartaVeresovaOfficial@gmail.com', // generated ethereal user
        pass: 'send_message_node_js', // generated ethereal password
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
            <div>name: ${name}</div>
            <div>email: ${email}</div>
            <div>${message}</div>`, // html body
    });

    res.send('sendMessage')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})