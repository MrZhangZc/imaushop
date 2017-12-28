
let Good = require('../models/good')
const _ = require('underscore')

exports.home = async ctx => {
    let goods = await Good.fetch()

    await ctx.render('index', {
        title : '欢迎来到农大商层',
        goods : goods
    })
}

exports.good = async ctx => {
    let id = ctx.params.id
    let good = await Good.findById(id)

    await ctx.render('specific',{
        title : '商品详情',
        good : good
    })
}

exports.admin = async ctx => {
    await ctx.render('admin', {
        tltle : '商品后台录入',
        good: {
            name    : '',
            price   : '',
            from    : '',
            stock   : '',
            image   : '',
            summary : ''
        }
    })
}

exports.update = async ctx => {
    let id = ctx.params.id
    if(id){
        let good = await Good.findById(id)

        await ctx.render('admin', {
            title : '后台更新页',
            good : good
        })
    }
}

exports.list = async ctx => {
    let goods = await Good.fetch()

    await ctx.render('list', {
        title : '商品列表',
        goods : goods
    })
}

exports.save = async ctx => {
    let id = ctx.request.body.good._id
    let goodObj = ctx.request.body.good
    let _good

    if(id !== ''){
        let good = await Good.findById(id)

        _good = _.extend(good, goodObj)
        _good.save()

        ctx.response.redirect('/')
    }else{
        _good = new Good({
            name: goodObj.name,
            price: goodObj.price,
            from: goodObj.from,
            stock: goodObj.stock,
            image: goodObj.image,
            summary: goodObj.summary
        })

        _good.save()

        ctx.response.redirect('/')
    }
}

exports.delete = async ctx => {
    let id = ctx.query.id

    console.log(id)

    if( id ){
        await Good.remove({_id : id}, (err, good) => {
            if(err){
                console.log(err)
            }else{
                ctx.body = {success : 1}
            }
        })
    }
}