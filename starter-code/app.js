require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

// MTO IMPORTANTE
// 1. Não esquecer de inserir o mesmo nome do projecto - const DB_NAME = 'celebrities-movies' na seeds.js 
// e colocar o mesmo nome na app.js - .connect("mongodb://localhost/celebrities-movies", {useNewUrlParser: true})
// 2. Não esquecer de inserir o comando - node bin/seeds.js no terminal 
// para aparecer no mongoDB a database
// 3. Não esquecer de inserir module.exports = app; no fim das paginas route etc.
// 4. Não esquecer de inserir as novas pastas de routes na app.js. 
// Por exemplo: const celebrity = require("./routes/celebrities")
// app.use("/", celebrity)
// Ou seja para a pasta routes/celebrities preciso de inserir o require na app.js
// 5. Verificar sempre as / (barras) das paths das routes pq acontece muito ser esse o problema
// 6. Verificar sempre que os route.get e route.post que não estiverem definidos, 
// ou seja os que forem à procura por ex. de um id têm sempre que ficar por baixo da pagina de codigo. 
// os que tenham o path do url definido, (ex: http://localhost:3000/celebrities/new) ficam em cima na página.


mongoose
  .connect("mongodb://localhost/celebrities-movies", {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const index = require('./routes/index');
app.use('/', index);

const celebrity = require("./routes/celebrities")
app.use("/", celebrity)

const movie = require("./routes/movies")
app.use("/", movie)


module.exports = app;
