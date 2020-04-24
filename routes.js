const express = require('express')
const routes = express.Router()
const recipes = require('./controller/recipes')

routes.get('/', function(req, res) {
    return res.redirect("/home")
})
routes.get('/home', recipes.home)
routes.get('/about', recipes.about)
routes.get('/recipes/', recipes.recipes)
routes.get('/recipes/:index', recipes.details)


routes.get('/admin/recipes', recipes.index)


routes.use(function(req, res) {
    res.status(404).render("recipes/not-found")
})

module.exports = routes