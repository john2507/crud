const express = require ('express');
const sequelize = require('sequelize');
const router = express.Router();
// const Cadastrar = require("./src/models/funcionario");


const Categoria = require("../models/categoria");

router.get('/', (req,res)=>{
    res.render("admin/index")
});

// rota para listaR as categorias 
router.get('/categorias', function(req, res){
    Categoria.findAll({order:[['id', 'ASC']]}).then(function(listar){
        res.render('admin/categorias',{listar:listar});
    })
   
});

// router.get('/categorias', function(req,res){
//     res.render("admin/categorias");
// });

router.get('/categorias/add', function(req,res){
    res.render('admin/addcategorias')
});

// criando no banco de dados create 
router.post('/categoria/nova', function(req,res){
  // criando uma msnsagem de erro 
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null ){
      erros.push({texto: "Nome Invalido"})
  }
  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
      erros.push({texto: "Slug Invalido"});
  }
  if(req.body.nome.length < 2){
      erros.push({texto: "nome pequeno"});
  }
  if(erros.length > 0){
      res.render("admin/addcategorias", {erros : erros});
}else {
    Categoria.create({
        nome: req.body.nome,
        slug: req.body.slug,
        
    }).then(function(){
      //  res.send("funcionario cadastrado com sucesso")
            req.flash("success_msg", "Categoria Criada com Sucesso")
            res.redirect('/admin/categorias')
        }).catch(function(erro){
            req.flash("error_msg","Houve um erro ao salvar a categoria")
            res.redirect('/admin')
        // res.send("Erro: Funcionario nao foi cadastrado" + erro);

        }); 

    }
       
});
        router.get('/del-categoria/:id', function(req, res){
            Categoria.destroy({
                where: {'id': req.params.id}
            }).then(function(){
                //res.redirect('/funcionario')
                req.flash("error_msg", "Categoria Excluido com sucesso")
                res.redirect('/admin/categorias')
               // res.send("Categoria Excluida com Sucesso");
                }).catch(function(erro){
                res.send("erro ao deletar");
            })
        }); 
        router.get("/categorias/edit/:id",(req, res) => {
           Categoria.findOne({
            where: {'id': req.params.id}
            }).then((categoria) => {
               res.render("admin/editcategorias", {categoria : categoria})
           }).catch((err) => {
               req.flash("error_msg", "Esta categoria Nao existe");
               res.redirect("/admin/categorias");
           });
            
            // res.send('PAGINA DE EDIÇÃO DE CATEGORIA');
        });

    router.post("/categorias/edit", function(req, res){
        Categoria.findOne({
        where: {'id': req.body.id}
    }).then((categoria)=>{

        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() =>{
          req.flash("success_msg", "Categoria editada com sucesso");
          res.redirect("/admin/categorias");  
        }).catch((err)=>{
            req.flash("error_msg", "Houver um Erro interno ao editar categoria")
            res.redirect("/admin/categorias");  
        })
    }).catch((err)=> {
        req.flash("error_msg", "houve um erro ao editar");
        res.redirect("/admin/categorias");
    });
    });

// router.get('/app', function(req, res){
//     res.send('paa inicial');
// })

// router.get('/cad-funcionario', function(req, res){
//     res.render('cad-funcionario');   
// });


// router.post('/add-funcionario', function(req, res){
//    // res.send("Nome: " + req.body.nome +"<br> valor : " + req.body.email + "<br> Senha: " + req.body.senha ); 
//     Cadastrar.create({
//         nome: req.body.nome,
//         email: req.body.email,
//         senha: req.body.senha
//     }).then(function(){
//         //res.send("funcionario cadastrado com sucesso")
//         res.redirect('/funcionario')
//     }).catch(function(erro){
//         res.send("Erro: Funcionario nao foi cadastrado" + erro);

//     });  
// });
// //listar ps funcionario
// router.get('/funcionario', function(req, res){
//     Cadastrar.findAll({order:[['id', 'DESC']]
//     }).then(function(funcionarios){
//         res.render('funcionario',{funcionarios:funcionarios});
//     });
   
// });

// router.get('/del-funcionario/:id', function(req, res){
//     Cadastrar.destroy({
//         where: {'id': req.params.id}
//     }).then(function(){
//         res.redirect('/funcionario')

//         //res.redirect('/funcionario')
//         // res.send("Funcionario apagado com sucesso");
//         }).catch(function(erro){
//         res.send("erro ao deletar");
//     });
// });

module.exports = router;