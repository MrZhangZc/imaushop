
let Good = require('../models/good')
let Category = require('../models/catetory')
const _ = require('underscore')

exports.home = async ctx => {
    console.log('user in session')
    console.log(ctx.session.user)

    let _user = ctx.session.user
    ctx.state.user = _user

    console.log(ctx.state.user)
        
    let categories = await Category.find({}).populate({ path: 'goods' })
    console.log(categories)

    //let goods = await Good.fetch()

    await ctx.render('index', {
        title : '欢迎来到农大商层',
        categories: categories
    })
}

exports.daijinquna = async ctx => {
    let _user = ctx.session.user
    ctx.state.user = _user
    await ctx.render('quan')
}

exports.good = async ctx => {

    let _user = ctx.session.user
    ctx.state.user = _user
    
    let id = ctx.params.id
    let good = await Good.findById(id)
    let categories = await Category.find({}).populate({ path: 'goods' })

    await ctx.render('specific',{
        title : '商品详情',
        categories: categories,
        good : good
    })
}

exports.admin = async ctx => {
    let categories = await Category.fetch()
    console.log('11111111111111',categories)
    await ctx.render('admin/admin', {
        title: '后台录入',
        categories: categories,
        good: {}
    })
}

exports.update = async ctx => {
    let id = ctx.params.id
    if(id){
        let good = await Good.findById(id)

        await ctx.render('admin/admin', {
            title : '后台更新页',
            good : good
        })
    }
}

exports.list = async ctx => {
    let categories = await Category.find({}).populate({ path: 'goods' })

    await ctx.render('admin/list', {
        title : '商品列表',
        categories : categories
    })
}

exports.save = async ctx => {
    let id = ctx.request.body.good._id
    let goodObj = ctx.request.body.good
    let _good

    if(id){
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
            summary: goodObj.summary,
            category: goodObj.category
        })

        _good.save()

        let goodid = _good._id
        let categoryid = _good.category
        let category = await Category.findById(categoryid)
        console.log('11111111', category)
        category.goods.push(goodid)

        category.save()

        ctx.response.redirect('/good/' + goodid)
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