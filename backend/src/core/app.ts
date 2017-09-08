import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as exphbs from 'express-handlebars';
import routeRegister from './route-register';

var app = express();

// view engine setup
let viewsDir = path.join(__dirname, '../../www/views');
console.log('viewsDir: '+viewsDir);
app.set('views', viewsDir);
// app.set('view engine', 'jade');
app.engine('.html',exphbs({defaultLayout:viewsDir+'/layouts/layout-1',extname:'.html'}));
app.set('view engine','.html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../www/public')));

routeRegister(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
