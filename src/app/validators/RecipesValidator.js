const Recipe = require('../models/admin/Recipes')

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

async function checksAccess(req, res, next) {
    const { id } = req.params

    let results = await Recipe.find(id)
    const recipe = results.rows[0]

    if (req.session.userId != recipe.user_id && req.session.isAdmin == false) {
        return res.redirect('/admin/recipes')
    }
    
    next()
}

module.exports = {
    checksAccess
}