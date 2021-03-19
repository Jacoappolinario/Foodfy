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
    async put(req, res) {
        try {
            const { user } = req

            let { name, email } = req.body

            await User.update(user.id, {
                name,
                email
            })

            return res.render("admin/profile/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })


        } catch(err) {
            console.error(err)
            return res.render("admin/profile/index", {
                error: "Algum erro aconteceu!"
            })
        }
    }
}