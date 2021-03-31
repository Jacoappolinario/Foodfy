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

module.exports = {
    onlyUsers,
    isAdmin
}