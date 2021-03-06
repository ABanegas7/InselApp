var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

function returnApp(db){
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

//para llamara los modulos se usa la funcion require
//la uri del modulo y debe especificar
//en el modulo la exportacion con
//module.exports = <<funcion>>
var api = require('./routes/api.js')(db);
app.use('/api/v1', api);
//http://localhost:3000/api/v1/obtenerclientes

app.get("/",function(req,res){
  res.render("login");
});

app.post("/login",function(req,res){
  res.redirect("/inicio"); //cuando se tenga base ira a validar
});

app.get("/inicio",function(req,res){
  res.render("inicio");
});

app.get("/productos",function(req,res){
  res.render("productos");
});

app.get("/compras",function(req,res){
  res.render("compras");
});

app.get("/historial",function(req,res){
  res.render("hitorial");
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

return app;
}// return app

module.exports = returnApp;
