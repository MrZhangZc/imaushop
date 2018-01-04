
let Category = require('../models/catetory')

exports.admin = async ctx => {
    await ctx.render('admin/category', {
        title: '分类录入',
        category: {}
    })
}

exports.save = async ctx => {
    let _category = ctx.request.body.category

    let category = new Category(_category)

    category.save()

    ctx.response.redirect('/admin/category/list')
}

exports.list = async ctx => {
    let categories = await Category.fetch()

    await ctx.render('admin/categorylist', {
        title: '分类列表',
        categories: categories
    })
}

exports.delete = async ctx => {
    let id = ctx.query.id

    console.log(id)

    if (id) {
        await Category.remove({ _id: id }, (err, category) => {
            if (err) {
                console.log(err)
            } else {
                ctx.body = { success: 1 }
            }
        })
    }
}