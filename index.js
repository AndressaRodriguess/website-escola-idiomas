// importar o módulo express
const express = require("express");
//importar módulo body-parser
const bodyparser = require("body-parser")
//importação do nodemaler
const nodemaler = require("nodemailer");
//importar dotenv
require('dotenv/config');

//1. criar objeto server
const app = express();

//1.1 atribuir body-parser como interpretador dos dados enviados pelo browser
app.use(bodyparser.urlencoded());

//2. configurar rotas do servidor
app.post('/', (request, response) => {
    const dados = request.body;

    //transporter: objeto que com os dados do servidor de email realizará o envio
    const transporter = nodemaler.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
        secureConnection: false,
        secure: false,
        tls: { rejectUnauthorized: false }
    });

    //criar email
    const email = {
        from: process.env.EMAIL_FROM,
        to: dados.email,
        subject: "Teste de envio de e-mail com Node js",
        text: `Olá!  Cadastro do usuário: ${dados.nome}, com e-mail: ${dados.email} foi realizado com sucesso!`
    };

    //enviar email
    transporter.sendMail(email, (err, info) => {
        if(err) {
            console.error(err);
            response.send("Ocorreu um erro ao enviar e-mail :(");
        }
        else {
            console.log("sucesso");
            response.send("E-mail enviado com sucesso! :)");
        }
    });
})

//3. iniciar o servidor em alguma porta de rede
app.listen(8080, ()=>{
    console.log("servidor iniciado");
})

