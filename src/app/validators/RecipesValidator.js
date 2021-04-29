const Recipe = require('../models/admin/Recipes')

async function checksAccess(req, res, next) {
    const { id } = req.params

    const recipe = await Recipe.findOne({ where: {id} })

    if (req.session.userId != recipe.user_id && req.session.isAdmin == false) {
        return res.redirect('/admin/recipes')
    }
    
    next()
}

module.exports = {
    checksAccess
}