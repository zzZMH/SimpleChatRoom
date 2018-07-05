var createError = require('http-errors');
var express = require('express');//加载express模块
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');//设置默认首页的路由
var fileLoadRouter = require('./routes/fileLoad');//文件上传的路由
var testSpiderRouter = require('./routes/testSpider');
var spiderRouter = require('./routes/spider');//爬虫的路由
var testEjsRouter = require('./routes/testEjs');//ejs模版
var queryRouter = require('./routes/queryData');

var app = express();//express实例变量

//设置views文件夹为存刚视图文件的目录，即存放模板文件的目录
//_dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');//设置视图引擎为pug

//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(express.json());
//解析urlencoded请求的中间件
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//拦截的请求
app.use('/view', express.static('views'));//开放静态页面访问接口
app.use('/public', express.static('public'));//开放静态页面访问接口
app.use('/route', express.static('routes'));//开放静态页面访问接口
app.use('/index', indexRouter);//默认首页请求走indexRouter路由
app.use('/fileLoad', fileLoadRouter);//fileLoad请求走fileLoadRouter路由
app.use('/testSpider', testSpiderRouter);
app.use('/spider', spiderRouter);//爬虫请求走spiderRouter路由
app.use('/testEjs', testEjsRouter);//引用ejs模版的路由
app.use('/query', queryRouter);//数据库操作-查询

//记载错误处理解决方法
//捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

//开发环境下的错误处理器，将错误信息渲染error模板并显示浏览器中
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

//导出app对象供其他模板调用
module.exports = app;
