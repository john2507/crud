
// acrecentar express e atribundo para uma variavel
const express = require ("express");
// instanciando express
const app = express();

const session = require("express-session");
const flash = require ("connect-flash");

//configurando session
app.use(session({
    secret: "cursodenode",
    resave:true,
    saveUninitialized: true
}));

// configurando flash
app.use(flash());

//configurando middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})


// incluindo handlebars e criando uma variavel
const handlebars = require ("express-handlebars");
//incluindo o arquivo main.handlebars

//  incluindo o body-parser e instanciando 
const bodyParser = require ("body-parser");

const path = require("path");

const moment = require('moment');
// funçoes para confuiguraçoes do bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//modulos na pasta de rotas importando
const admin = require("./src/routes/admin");

// importando modulo cadastrar 
const Categoria = require("./src/models/categoria");

app.use(express.static(path.join(__dirname,"public")))

// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate: (date) =>{
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars')

// rotas
app.use('/admin', admin);

app.listen(8080);


/*
//sequelize configuração 
const Sequelize = require('sequelize');

// criando a conexao com o banco
const sequelize = new Sequelize('picorest','root','123456',{
    host: 'localhost',
    dialect: 'mysql' 

});
//validando se foi conectado ou nao
sequelize.authenticate().then(function(){
    console.log('CONEXAO REALIZADA COM SUCESSO');
}).catch(function(err){
    console.log('erro ao realizar a conexao com o banco' + err)
});

// criando uma tabela com sequelize 
const Testeusuario = sequelize.define('testeusuario',{

    //os atributos da tabela
    nome : {
        type : Sequelize.STRING,
    },
    email : {
        type : Sequelize.STRING,
    },
    senha: {
    type : Sequelize.INTEGER,
    }   
});

// cria a tabela com sequelize
Testeusuario.sync({force: true});

// inserindo um registro na tabela 

Usuario.create({
    usuario : 'john',
    senha: 123456
});
*/
