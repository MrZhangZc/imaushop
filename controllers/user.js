
let User = require('../models/user')

exports.signin = async ctx => {
    await ctx.render('signin')
}

exports.signup = async ctx => {
    await ctx.render('signup')
}

exports.userList = async ctx => {
    let users = await User.fetch()

    await ctx.render('admin/userlist', {
        title: '会员列表',
        users: users
    })
}
// 
exports.signupUser = async ctx => {
    let _user = ctx.request.body.user
    let zza = ctx.request.body
    console.log('张智超', zza)

    let zzc = await User.findOne({name : _user.name})
    console.log(zzc)

    if(zzc){
        ctx.response.redirect('/signup')
    }else{
        let user = new User(_user)
        user.save()
        console.log(user)
        ctx.response.redirect('/signin')
    }
}

exports.signinUser = async ctx => {
    let _user = ctx.request.body.user
    let name  = _user.name
    let password = _user.password
    console.log(_user)

    let zzc = await User.findOne({name : name})

    if (!zzc){
        //ctx.flash('error', '该用户名不存在,请核对后再登录')
        console.log('该用户名不存在,请核对后再登录')
        ctx.response.redirect('/signin')
    }else{
        let bool = await zzc.conparePassword(password)
        console.log(bool)

        if (bool) {
            ctx.session.user = {
                _id : zzc._id,
                name : zzc.name,
                role : zzc.role
            }
            console.log('zzc: ',ctx.session)
            console.log(zzc)
            ctx.response.redirect('/')
        } else {
            console.log('出错辣')
            ctx.response.redirect('/signin')
        }
    }
}

exports.logout = async ctx => {
    delete ctx.session.user
    delete ctx.state.user

    ctx.response.redirect('/')
}