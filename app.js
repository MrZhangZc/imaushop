
const Koa        = require('koa')
const path       = require('path')
const mongoose   = require('mongoose')
const views      = require('koa-views')
const static     = require('koa-static')
const koaLogger  = require('koa-logger')
const convert    = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const config     = require('./config/config')
const app        = new Koa()

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, { useMongoClient: true })
mongoose.connection.on('connected', function () {
    console.log('数据库连接成功！')
})
mongoose.connection.on('error', function (err) {
    console.log('数据库连接失败: ' + err)
});
mongoose.connection.on('disconnected', function () {
    mongoose.connect(config.dbUrl, { useMongoClient: true })
})

app.use(bodyParser())

// 静态文件
const staticPath = './static'
app.use(static(
    path.join(__dirname, staticPath)
))

// 模板文件
app.use(views(path.join(__dirname, './views'), {
    extension: 'pug'
}))

// 路由 
const router = require('./config/router')()

app.use(router.routes())
app.use(router.allowedMethods())

// 打印日志
app.use(convert(koaLogger()))

app.listen(config.port , () => {
    console.log('内农大商层项目已经运行在了：<' + config.port + '> 端口')
})