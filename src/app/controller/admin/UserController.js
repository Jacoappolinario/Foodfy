const User = require('../../models/admin/user')

module.exports = {
    create(req, res) {
        return res.render("admin/user/create")
    },
    async post(req, res) {

        await User.create(req.body)

        return res.render("admin/user/create", {
            user: req.body,
            success: "Usuário criado com sucesso!"
        })

    },
    async list(req, res) {
        let users = await User.all()
        const filteredUsers = users.filter((users) => {
            return users.id != req.session.userId
        })

        return res.render("admin/user/list", { users: filteredUsers })
    },
    async edit(req, res) {
        const { id } = req.params
         try {
            let user = await User.findOne({ where: {id} })

            return res.render("admin/user/edit", { user })
             
         } catch(err) {
             console.error(err)
             return res.render("admin/user/edit")
         }
    },
    async put(req, res) {
        try {
            await User.update(req.body.id, {
                name: req.body.name,
                email: req.body.email,
                is_admin: req.body.is_admin || false
            })

            return res.render("admin/user/edit", {
                user: req.body,
                success: "Usuário atualizado com sucesso!"
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

            return res.redirect("/admin/users")

            
        } catch(err) {
            console.error(err)
            return res.render("admin/user/edit", {
                user: req.body,
                error: "Error ao tentar deletar usuário!"
            })
        }
    }
}