
const Router = require('koa-router')
let Good = require('../controllers/good')
let User = require('../controllers/user')

module.exports = function () {
    
    let router = new Router()

    // Good
    router.get('/', Good.home)
    router.get('/good/:id', Good.good)
    router.get('/admin/good/new', Good.admin)
    router.get('/admin/update/:id', Good.update)
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

    return router
}