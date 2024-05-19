const express = require('express');
//const morgan = require('morgan');
//const bodyParser = require('body-parser')
const morganBody = require('morgan-body');
const path=require('path')
const rateLimit = require('express-rate-limit'); // security
const helmet = require('helmet'); // security
const mongoSanitize = require('express-mongo-sanitize'); // security
const xss = require('xss-clean'); // security
const cors =require('cors')
const AppError = require(`${__dirname}/utils/appError`);
const employeeRouter=require('./routes/employeeRouter');
const companyRouter=require('./routes/companyRouter');
const taskRouter=require('./routes/taskRouter');
const kindTaskRouter=require('./routes/kindTaskRouter')
const notificationRouter=require('./routes/notificationRouter')
const globalErrorHandler = require(`${__dirname}/controllers/errorController`);
const app = express();

// Global MiddleWares

//set security http headers
app.use(helmet()); // set el htttp headers property




app.use(cors());

app.options('*',cors())
// Poclicy for blocking images
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

//development logging
if (process.env.NODE_ENV === 'development') {
  // app.use(morgan('dev'));
  morganBody(app, {
    logAllReqHeader: true,
  });
}

//Limit requests from same API

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests please try again later',
});


app.use('/api', limiter); // (/api)=> all routes start with /api

//Body parser,reading data from body into req.body
app.use(express.json()); //middle ware for req,res json files 3and req.body

//Data sanitization against no SQL injection
app.use(mongoSanitize());

//Data sanitization against cross site scripting attacks (XSS)
app.use(xss());



//serving static files

//app.set('view engine', 'ejs'); // Change 'ejs' to your desired template engine

app.use('/api/public',express.static(path.join(__dirname, 'public')));



//request time of API
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});



app.use('/api/employee/',employeeRouter);
app.use('/api/company/',companyRouter);
app.use('/api/task/',taskRouter);
app.use('/api/typeTask/',kindTaskRouter)
app.use('/api/notification/',notificationRouter)
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find the url ${req.originalUrl} on this server`, 404)
  );
});
app.use(globalErrorHandler);

module.exports = app;
