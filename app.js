var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var pool = require('./models/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// select
pool.query('SELECT * from empleados').then(function (results) {
  console.log(results)
});

//insert

var obj={
  nombre: 'Lourdes',
  apellido: 'Maniega',
  trabajo: 'Dev',
  edad: '15',
  salario: '20000',
  mail: 'lourdes@mail.com'
} // JSON

pool.query('insert into empleados set ?', [obj]).then(function (results) {
console.log(results)
});

//update
//var id=1;
//var obj={
//  nombre:
//  apellido:
//}

//pool.query('update empleados set ? where id_emp?',[obj,id]).then(function (results) {
//console.log(results)
//});

//delete
// var id = 26;
// pool.query('delete from empleados where id_emp=?', [id]).then(function (results) {
//   console.log(results);
// });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
