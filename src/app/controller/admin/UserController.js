const User = require('../../models/admin/user')


module.exports = {
    create(req, res) {
        return res.render("admin/user/create")
    },
    async post(req, res) {

        const userId = await User.create(req.body)

        return res.render("admin/user/create", {
            success: "Usuário Cadastrado!"
        })
    },
    async edit(req, res) {
        const { id } = req.params
         try {
            let user = await User.findOne({ where: {id} })

            return res.render("admin/user/edit", { user })
             
         } catch(err) {
             console.error(err)
         }
    }
}