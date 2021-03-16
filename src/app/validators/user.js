const User = require("../models/admin/user")

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos'
            }
        }
    }
}

async function post(req, res, next) {
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
        return res.render("admin/user/create", fillAllFields)
    }

    //check if user exists [Email]]
    const { email } = req.body
    const user = await User.findOne({ 
        where: {email} 
    })

    if (user) return res.render('admin/user/create', {
        user: req.body,
        error: 'Usuário já cadastrado'
    })

    next()
}

async function put(req, res, next) {
    
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
        return res.render("admin/user/edit", fillAllFields)
    }

    next()
}

module.exports = {
    post,
    put
}