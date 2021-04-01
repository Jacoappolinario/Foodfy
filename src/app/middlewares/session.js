const { renderString } = require('nunjucks')
const Recipe = require('../models/admin/Recipes')

function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/admin/users/login')

    next()
}

async function isNotAdmin(req, res, next) {
    const { id } = req.params

    let results = await Recipe.find(id)
    const recipe = results.rows[0]
    

    if (req.session.userId != recipe.user_id && req.session.isAdmin == false) {
       return res.redirect("/admin/recipes")
    }

   next()

}

function isAdmin(req, res, next) {
    if (!req.session.isAdmin) {
        return res.redirect("/admin/recipes")
    }

    next()
}

module.exports = {
    onlyUsers,
    isAdmin,
    isNotAdmin
}