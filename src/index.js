//IMPORTAÇÃO DE TODAS AS DEPENDENCIAS
require (`dotenv`).config();//Carrega variaveis de ambiente de um arquivo .env
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db/db')
const routes = require('./routers/routes');//Importa as rotas
const clienteRoutes = require('./routers/clientesroutes');
const corsOptions = {
    origen: ['http://localhost:3333','https://meudominio.com'],//Lista de origens permitidas
    methods: 'GET,POST,PUT,PATH,DELETE',//metodos HTTP permitidas
    credentials: true, //Permite o envio de cookies
};
const app = express();
//O APP IRÁ RECEBER O EXPRESS E TODAS SUAS DEPENDENCIAS
//Middlewares de segurança e utilidades
app.use(helmet()); //Protege a aplicação com headers de segurança
app.use(cors(corsOptions));;//Habilita o CORS
app.use(morgan('dev')); //Loga as requisiçoes no console
app.use(express.json());//Converta os dados recebidos para JSON
//Servindo arquivos estáticos
app.use(express.static(path.join(__dirname,'public'))); //Pasta de arquivos estáticos
//O path retorna o caminho de forma dinamica
//Rota para servir o home.html como sendo nossa página principal
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'pages', 'home.html'));
})
//configuração de rotas
//APÓS DECLARAR NOSSAS ROTAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERENCIA
app.use('/',routes);
app.use('/',clienteRoutes);
//Middleware de tratamento de erros
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('algo deu errado');
});
//Inicialização do servidor
//Aqui definimos quem irá escutar nosso chamado e nos responder
const PORT = process.env.PORT || 3333;
app.listen(PORT,() => {
    console.log(`Servidor rolando na porta ${PORT}`)
});

