/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

// Start express app
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving Static files
app.use(express.static(path.join(__dirname, 'public')));

// this allows simple get post
app.use(cors());

// this one allows rest
app.options('*', cors());

//1. Global MIDDLEWARES

// Set Security HTTP Headers
// FOR MAP

// const scriptSrcUrls = [
//   'https://api.tiles.mapbox.com/',
//   'https://api.mapbox.com/',
//   'https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/axios.min.js',
//   'https://*.js.stripe.com',
// ];
// const styleSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://api.tiles.mapbox.com/',
//   'https://fonts.googleapis.com/',
//   'https://events.mapbox.com/',
// ];
// const connectSrcUrls = [
//   'https://api.mapbox.com/',
//   'https://a.tiles.mapbox.com/',
//   'https://b.tiles.mapbox.com/',
//   'https://events.mapbox.com/',
// ];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com', 'https://events.mapbox.com/'];
// const frameSrcUrls = ['http://*.stripe.com'];
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: [],
//       frameSrc: ["'self'", ...frameSrcUrls],
//       connectSrc: ["'self'", ...connectSrcUrls],
//       scriptSrc: ["'self'", ...scriptSrcUrls],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:'],
//       objectSrc: [],
//       imgSrc: ["'self'", 'blob:', 'data:'],
//       fontSrc: ["'self'", ...fontSrcUrls],
//     },
//   })
// );

// app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ['https://*.stripe.com', "'self'"],
      'connect-src': ["'self'", '*'],
      'frame-src': ["'self'", 'https://*.stripe.com'],
      'img-src': ["'self'", 'data', 'https://*.stripe.com'],
    },
  })
);

// Development Login
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requiest from same IP Adderss
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this ip, plese try again in an hour',
});
app.use('/api', limiter);
// Body Perser, reading data from body into request object(req.body)
app.use(express.json({ limit: '10kb' }));
// Parse the data that comming from urlencoded form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());
// Data Sanitization against NoSql query Injection
app.use(mongoSanitize());
// Data Sanitization against XSS
app.use(xss());
// Prevent Prameter Polution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsQuantity', 'difficulty', 'ratingsAverage', 'maxGroupSize', 'price'],
  })
);

// Test midleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3. ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// if can't find any of the route above
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
