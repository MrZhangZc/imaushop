
const Router = require('koa-router')
let Good = require('../controllers/good')

module.exports = function () {
    let router = new Router()

    // get
    router.get('/', Good.home)
    router.get('/good/:id', Good.good)
    router.get('/admin/good/new', Good.admin)
    router.get('/admin/update/:id', Good.update)
    router.get('/admin/list', Good.list)

    // // post
    router.post('/admin/good/new', Good.save)

    // delete
    router.delete('/admin/list', Good.delete)

    return router
}