// incluindo um moddulo express
const express = require("express");

// instanciando e atribundo a uma variavel 
 const app = express();


const mysql = require('mysql'); // instanciando  mysql

// conexao com o banco de dados 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'picorest'
  });

  
  /*
// tratamento de erro caso nao conecte 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  // deletando um registro no banco de dados 
  connection.query("DELETE FROM funcionario WHERE id = 1", function(err, result){
    if(!err){  
    console.log("USUARIO EXCLUIDO COM SUCESSO ");
    }else{
        console;log("ERRO AO EXCLUIR O USUARIO");
    }
  });*/

  /*
  // ALTERANDO A TABELA NO BANCO DE DADOS 
  connection.query("UPDATE funcionario SET nome = 'Francinete' WHERE id = 1", function(err,result){
      if(!err){
          console.log("USUARIO ALTERADO COM SUCESSO");
      }else{
          console.log("USUARIO NAO ALTERADO");
      }
  });*/




  /*
// tratamento de erro caso nao conecte 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
  // inserindo no bando de dados 
  connection.query("INSERT INTO funcionario(nome,sobrenome,sexo,email,cidade,estado,menssagem) VALUES('JOHN WANDERSON','VIANA DA LUZ','M','JOHNVAINALUZ@GMAIL.COM','RECIFE','PE','OI TUDO BEM')",
   
  function(err, rows, fields){
        if(!err){
            console.log("usuario cadastrado com sucesso");
        }else{
            console.log("Erro ao cadastrar no banco de dados");
        }
  });

*/

/*
  // tratamento de erro caso nao conecte 
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
// execultar uma query para buscar no banco de dados
connection.query('SELECT * FROM funcionario', function(err, rows, fields){
    if(!err){
        console.log('Resultado: ', rows); // acessando o resultado que esta na variavel linha
    }else{
        console.log('Erro ao Relizar a Consulta ');
    }

});*/

 // pagina qual pagina quero abrir
 // obs: __dirname - executa o diretorio da pasta
 app.get("/", function(req, res){
     res.sendFile(__dirname +"/src/index.html");
 });  
 app.get("/funcionario", function(req, res){
     res.sendFile(__dirname +"/src/funcionario.html");
 });
app.get("/setor", function(req, res){
     res.send("Setor da Empresa");
});
app.get("/funcao", function(req, res){
     res.send('Funcao da Empresa');
});
app.get("/curso", function(req, res){
    res.send("Cursos");
});
app.get("/ajuda", function(req, res){
    res.send("Contato");
});
app.get("/sobre", function(req,res){
    res.send("Sobre a Empresa");
})
 
 // iniciando um servidor 
 app.listen(8080);