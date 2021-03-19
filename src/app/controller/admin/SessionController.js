module.exports = {
    loginForm(req, res) {
        return res.render("admin/session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/users/profile")
    }
}