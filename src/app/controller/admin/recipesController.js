const Recipe = require('../../models/admin/Recipes')

module.exports = {
    index(req, res) {
        return
    },
    create(req, res) {
        return res.render("admin/recipes/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        Recipe.create(req.body, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })

        // return res.redirect(`/admin/recipes/${id}`)

    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        return    
    },
    delete(req, res) {
        return
    }
}
