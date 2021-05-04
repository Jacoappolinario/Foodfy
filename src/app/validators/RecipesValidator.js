const Recipe = require('../models/admin/Recipes')

async function post(req, res, next) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Por favor, volte e preencha todos os campos.')
        }
    }

    if (!req.files || req.files.length == 0)
        return res.send('Por favor, envie pelo menos uma imagem.')
    
    next()
    
}

async function put(req, res, next) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "" && key != "removed_files") {
            return res.send('Please, fill all fields!')
        }
    }
    
    next()
    
}

async function checksAccess(req, res, next) {
    const { id } = req.params

    const recipe = await Recipe.findOne({ where: {id} })

    if (req.session.userId != recipe.user_id && req.session.isAdmin == false) {
        return res.redirect('/admin/recipes')
    }
    
    next()
}

module.exports = {
    post,
    put,
    checksAccess
}