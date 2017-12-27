
const Router = require('koa-router')

const router = new Router()

router.get('/zzc', async ctx => {
    let title = 'hm'
    await ctx.render('index', {
        title,
    })
})

module.exports = Router