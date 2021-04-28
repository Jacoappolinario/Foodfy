const { hash } = require('bcryptjs')
const User = require('../../models/admin/User')
const mailer = require('../../../lib/mailer')
const crypto = require('crypto')


const userEmail = (name, password) => `
<h2>Olá ${name}</h2>
<p>Seu cadastro foi realizado com sucesso no Foodfy</p>
<p>Sua senha: ${password}</p>
<p>Guarde-a em local seguro.</p>
`

module.exports = {
    create(req, res) {
        return res.render("admin/user/create")
    },
    async post(req, res) {
        try {
            let { name, email, is_admin } = req.body
        
            let password = crypto.randomBytes(8).toString("hex")

            await mailer.sendMail({
                to: email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Foodfy - Seja bem-vindo',
                html: userEmail(name, password)
            })

            password = await hash(password, 8)
    
            await User.create({
                name, 
                email, 
                password, 
                is_admin: is_admin || false 
            })

            return res.render("admin/user/create", {
                user: req.body,
                success: "Usuário criado com sucesso!"
            })
            
        } catch (error) {
            console.error(error)
        }
    },
    async list(req, res) {
        let users = await User.findAll()
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