const express = require('express')
const routes = express.Router()
const recipes = require('./controller/recipes')
const admin = require('./controller/admin')

/*=== Routes Site ===*/
routes.get('/', function(req, res) {
    return res.redirect("/home")
})
routes.get('/home', recipes.home)
routes.get('/about', recipes.about)
routes.get('/recipes/', recipes.recipes)
routes.get('/recipes/:id', recipes.details)

/*=== Routes Admin ===*/
routes.get('/admin/recipes', admin.index)
routes.get('/admin/recipes/create', admin.create)
routes.get('/admin/recipes/:id', admin.show)
routes.get('/admin/recipes/:id/edit', admin.edit)

routes.post('/admin/recipes', admin.post)
routes.put('/admin/recipes', admin.put)
routes.delete('/admin/recipes', admin.delete)

/*=== Not Found ===*/
routes.use(function(req, res) {
    res.status(404).render("recipes/not-found")
})

module.exports = routes