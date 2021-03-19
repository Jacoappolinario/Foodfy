const { compare } = require("bcryptjs")
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

async function put(req, res, next) {
    
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
        return res.render("admin/profile/index", fillAllFields)
    }

    const { id, password } = req.body

    if (!password) return res.render("admin/profile/index", {
        user: req.body,
        error: "Coloque sua senha para atualiazar seu cadastro."
    })

    const user = await User.findOne({ where: {id} })

    const passed = await compare(password, user.password)

    if (!passed) return res.render("admin/profile/index", {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}

module.exports = {
    put
}