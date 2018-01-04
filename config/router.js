
const Router = require('koa-router')
let Good = require('../controllers/good')
let User = require('../controllers/user')
let Category = require('../controllers/category')

module.exports = function () {
    
    let router = new Router()

    // Good
    router.get('/', Good.home)
    router.get('/good/:id', Good.good)
    router.get('/admin', Good.admin)
    router.get('/admin/update/:id', Good.update)
    router.get('/daijinquan', Good.daijinquna)
    router.get('/admin/list', Good.list)
    router.post('/admin/good/new', Good.save)
    router.delete('/admin/list', Good.delete)

    // User
    router.get('/signin', User.signin)
    router.get('/signup', User.signup)
    router.get('/admin/userlist', User.userList)
    router.post('/user/signup', User.signupUser)
    router.post('/user/signin', User.signinUser)
    router.get('/logout', User.logout)

    //Category
    router.get('/admin/category/new', Category.admin)
    router.post('/admin/category/new', Category.save)
    router.get('/admin/category/list', Category.list)
    router.delete('/admin/category/list', Category.delete)

    return router
}