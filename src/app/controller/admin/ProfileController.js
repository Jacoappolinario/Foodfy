const User = require('../../models/admin/user')

module.exports = {
    async index(req, res) {
        const { userId: id } = req.session

        const user = await User.findOne({ where: {id} })

        if (!user) return res.render("admin/session/login", {
            error: "Usuário não encontrado!"
        })

        return res.render("admin/profile/index", { user })
    },
    put(req, res) {
        return 
    }
}