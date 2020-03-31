const express = require('express');
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

const Pool = require('pg').Pool;
const db = new Pool({
  user: 'username',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'my_db'
});

const nunjucks = require('nunjucks');
nunjucks.configure('./', {
  express: server,
  noCache: true,
});

server.get('/', function (req, res) {

  db.query("SELECT * FROM donors ORDER BY id DESC LIMIT 8", function(err, result){
    if(err) return res.send('Oops! Houve um erro ao tentar conectare-se ao banco de dados!');

    const donors = result.rows;
    return res.render('index.html', { donors });
  });

});

server.post('/', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood.toUpperCase();

  if (name == "" || email == "" || blood == "") {
    return res.send("Todos os campos são obrigatórios.");
  }

  const query = `INSERT INTO donors ("name", "email", "blood") VALUES($1, $2, $3)`;
  const values = [name, email, blood];

  db.query(query, values, function (err) {
    if (err) return res.send("Oops! Não foi possível cadastrar em nosso banco de dados!");
    return res.redirect('/');
  });

});

server.listen(3000, function () {
  console.log("Servidor Iniciado!")
});