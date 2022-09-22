const Profile = require('../../models/admin/Profile')

module.exports = {
    async index(req, res) {
        try {
            const { userId: id } = req.session

            const user = await Profile.findOne({ where: {id} })
    
            if (!user) return res.render("admin/session/login", {
                error: "Usuário não encontrado!"
            })
    
            return res.render("admin/profile/index", { user })
            
        } catch (error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            const { user } = req

            let { name, email } = req.body

            await Profile.update(user.id, {
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