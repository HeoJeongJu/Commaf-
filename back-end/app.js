var createError = require('http-errors');   // http 오류 객체 생성 모듈
var express = require('express');
var path = require('path');                 // 파일 경로 처리 유틸리티 제공
var cookieParser = require('cookie-parser');
// 로그 관리, 로그 파일을 생성하거나 전송
// POST /recommendations/result 200 23.447 ms - 4
var logger = require('morgan');             
var cors = require('cors');                 // 교차 출처 리소스 공유
const helmet = require('helmet');           // http 헤더 보안
const MongoStore = require('connect-mongo');

require('dotenv').config();

var app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

const session = require('express-session');
// strategy에 따른 요청으로 인증하기
const passport = require('passport');
require('./passport/index.js');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_COOKIE,
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME,
    collectionName: 'sessions',
  })
}));
app.use(passport.initialize());
app.use(passport.session());


var coffeeRoutes = require('./coffee/routes.js');
var questionRoutes = require('./question/routes.js');
var recommendationsRoutes = require('./recommendations/routes.js');
var cafeRoutes = require('./cafe/routes.js');
var adminRoutes = require('./admin/routes.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // 디렉토리 위치 기준 설정
app.set('view engine', 'jade');                   // 뷰 엔진 설정

app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // formData 파싱, req.body에 포함
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // 실행 중인 스크립트 절대 경로

app.use('/coffee', coffeeRoutes);
app.use('/question', questionRoutes);
app.use('/recommendations', recommendationsRoutes);
app.use('/cafe', cafeRoutes);
app.use('/admin', adminRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
