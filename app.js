
const Koa = require('koa')
const path  = require('path')
const static = require('koa-static')
const views  = require('koa-views')
const Router = require('koa-router')
const convert = require('koa-convert')
const koaLogger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const mongoose = require('mongoose')
const _        = require('underscore')
const app = new Koa()
const port = process.env.PORT || 2333
const dbUrl = 'mongodb://localhost/imaushop'
let Good = require('./models/good')

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })
mongoose.connection.on('connected', function () {
    console.log('Connection success!');
});
mongoose.connection.on('error', function (err) {
    console.log('Connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Connection disconnected');
});

app.use(bodyParser())
//app.use(koaBody({}))

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
const router = new Router()

// 商层主页
router.get('/', async ctx => {
    let goods = await Good.fetch()
    await ctx.render('index', {
        title: '我是首页',
        goods: goods
    })
    console.log(goods)
})

// 具体页
router.get('/good/:id', async ctx => {
    let id = ctx.params.id
    let good = await Good.findById(id)
    console.log('张智超',id, good)
    await ctx.render('specific', {
        title: '商品详情',
        good: good
    })

})

// 后台录入
router.get('/admin/good/new', async ctx => {
    await ctx.render('admin', {
        title: '后台录入',
        good: {
            name    : '',
            price   : '',
            from    : '',
            stock   : '',
            image   : '',
            summary : ''
        }
    })
})

// 更新

router.get('/admin/update/:id', async ctx => {
    let id = ctx.params.id
    if(id){
        let good = await Good.findById(id)
        console.log('zzc',good)

        await ctx.render('admin', {
            title: '更新页',
            good : good
        })
    }
})


// 存储商品

router.post('/admin/good/new', async ctx => {
    let id = ctx.request.body.good._id
    let goodObj = ctx.request.body.good
    let _good

    console.log(goodObj)
    //ctx.response.redirect('/')

    if(id !== ''){
        let good = await Good.findById(id)

        _good = _.extend(good, goodObj)
        _good.save()

        ctx.response.redirect('/')
    }else{
        _good = new Good({
            name : goodObj.name,
            price: goodObj.price,
            from: goodObj.from,
            stock: goodObj.stock,
            image: goodObj.image,
            summary: goodObj.summary
        })
        _good.save()

        ctx.response.redirect('/')
    }
})

// 列表页
router.get('/admin/list', async ctx => {
    let goods = await Good.fetch()
    await ctx.render('list', {
        title: '列表页',
        goods: goods
    })
})

app.use(router.routes())
app.use(router.allowedMethods())

// 打印日志
app.use(convert(koaLogger()))

app.listen(port , () => {
    console.log('内农大商层项目已经运行在了：<' + port + '> 端口')
})