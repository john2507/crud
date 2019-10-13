const db = require ('./db');

const Categoria = db.sequelize.define('categoria',{

    nome: {
        type: db.Sequelize.STRING,
    },
    slug: {
        type : db.Sequelize.STRING
    }
});
module.exports = Categoria
//Categoria.sync({force:true});
//Post.sync({force:true});

    

