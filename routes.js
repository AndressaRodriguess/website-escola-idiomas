var express = require('express');
var router = express.Router();

// página home
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// página contato
router.get('/contato', function(req, res) {
  res.sendFile(__dirname + '/views/contato.html');
});

router.post('/contato', (request, response) => {
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

// cursos
router.get('/cursos', function(req, res) {
    res.sendFile(__dirname + '/views/cursos.html');
});

// ensino
router.get('/ensino', function(req, res) {
    res.sendFile(__dirname + '/views/ensino.html');
});

// unidades
router.get('/unidades', function(req, res) {
    res.sendFile(__dirname + '/views/unidades.html');
});

// institucional
router.get('/institucional', function(req, res) {
    res.sendFile(__dirname + '/views/institucional.html');
});


module.exports = router;