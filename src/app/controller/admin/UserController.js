const User = require('../../models/admin/user')

module.exports = {
    create(req, res) {
        return res.render("admin/user/create")
    },
    async post(req, res) {

        const userId = await User.create(req.body)

        return res.send("Ok, Cadastrado")
    }
}