const Chefs = require('../../models/admin/Chefs')

module.exports = {
    index(req, res) {
        Chefs.all(function(chefs) {
            return res.render("admin/chefs/index", {chefs})
        })
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        Chefs.create(req.body, function(chef) {
            return res.send("ok")
        })
    },
    show(req, res) {
        Chefs.find(req.params.id, function(chef) {
            return res.render("admin/chefs/show", { chef })
        })
    },
    edit(req, res) {
        Chefs.find(req.params.id, function(chef) {
            return res.render("admin/chefs/edit", { chef })
        })
    },
    put(req, res) {
        Chefs.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chefs.delete(req.body.id, function() {
            return res.redirect(`/admin/chefs`)
        })
    }
}