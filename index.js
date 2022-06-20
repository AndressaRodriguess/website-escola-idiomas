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
var routes = require('./routes.js');
// ...
app.use('', routes);

//3. servir arquivos estáticos
app.use(express.static('public'));

//4. iniciar o servidor em alguma porta de rede
app.listen(8080, ()=>{
    console.log("servidor iniciado");
})

