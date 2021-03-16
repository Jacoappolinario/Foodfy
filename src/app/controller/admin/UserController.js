const User = require('../../models/admin/user')

module.exports = {
    create(req, res) {
        return res.render("admin/user/create")
    },
    async post(req, res) {

        const userId = await User.create(req.body)

        return res.redirect(`/admin/users/${userId}/edit`)
    },
    async edit(req, res) {
        const { id } = req.params
         try {
            let user = await User.findOne({ where: {id} })

            return res.render("admin/user/edit", { user })
             
         } catch(err) {
             console.error(err)
         }
    },
    async put(req, res) {
        try {

            await User.update(req.body)

            return res.render("admin/user/edit", {
                user: req.body,
                success: "Usuaŕio atualizado com sucesso!"
            })
            
        } catch(err) {
            console.error(err);
            return res.render("admin/user/edit", {
                error: "Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res) {
        try {

            await User.delete(req.body.id)

            return res.render("admin/user/create", {
                success: "Usuário deletado com sucesso!"
            })

            
        } catch(err) {
            console.error(err)
            return res.render("admin/user/edit", {
                user: req.body,
                error: "Error ao tentar deletar usuário!"
            })
        }
    }
}