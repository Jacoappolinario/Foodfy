const Chefs = require('../../models/admin/Chefs')

module.exports = {
    async index(req, res) {
        let results = await Chefs.all()
        const chefs = results.rows
        
        return res.render("admin/chefs/index", {chefs})
        
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        let results = await Chefs.create(req.body) 
        const chef = results.rows[0].id
        
        return res.redirect(`/admin/chefs/${chef}`)
       
    },
    async show(req, res) {
        let results = await Chefs.findChef(req.params.id) 
        const chef = results.rows[0]

        results = await Chefs.findRecipe(req.params.id)
        const recipes = results.rows 
        
        return res.render("admin/chefs/show", { chef, recipes })
        
    },
    async edit(req, res) {
        let results = await Chefs.findChef(req.params.id) 
        const chef = results.rows[0]
        
        return res.render("admin/chefs/edit", { chef })
        
    },
    async put(req, res) {
        await Chefs.update(req.body) 
        
        return res.redirect(`/admin/chefs/${req.body.id}`)
    
    },
    async delete(req, res) {
        await Chefs.delete(req.body.id) 
        
        return res.redirect(`/admin/chefs`)
       
    }
}