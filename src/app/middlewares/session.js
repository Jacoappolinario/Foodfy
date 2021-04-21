const User = require('../models/admin/User')

function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/admin/users/login')

    next()
}

function isAdmin(req, res, next) {
    if (!req.session.isAdmin) {
        return res.redirect("/admin/recipes")
    }

    next()
}

async function blockAcess(req, res, next) {
    const { id } = req.params

    let user = await User.findOne({ where: {id} })
    
    if (req.session.userId == user.id) {
        return res.redirect('/admin/users')
    }

    next()
}

module.exports = {
    onlyUsers,
    isAdmin,
    blockAcess
}