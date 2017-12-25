
const Koa = require('koa')
const port = process.env.PORT || 2333

const app = new Koa()

app.use( ctx => {
    ctx.body = `<h1>我在内农大</h1>`
})

app.listen(port)
console.log('内农大商层项目已经运行在了：<' + port + '> 端口')