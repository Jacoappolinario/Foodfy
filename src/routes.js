const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const SiteController = require('./app/controller/site/SiteController')
const RecipesController = require('./app/controller/admin/RecipesController')
const ChefsController = require('./app/controller/admin/ChefsController')
const HomeController = require("./app/controller/site/HomeController")
const SearchController = require("./app/controller/site/SearchController")

/*=== Routes Site ===*/
routes.get('/', HomeController.index)
routes.get('/search', SearchController.index)
routes.get('/about', SiteController.about)
routes.get('/recipes', SiteController.recipes)
routes.get('/recipes/:id', SiteController.details)
routes.get('/chefs', SiteController.chefs)

/*=== Routes Admin Recipes ===*/
routes.get('/admin/recipes', RecipesController.index)
routes.get('/admin/recipes/create', RecipesController.create)
routes.get('/admin/recipes/:id', RecipesController.show)
routes.get('/admin/recipes/:id/edit', RecipesController.edit)

routes.post('/admin/recipes', multer.array("photos", 5), RecipesController.post)
routes.put('/admin/recipes', multer.array("photos", 5), RecipesController.put)
routes.delete('/admin/recipes', RecipesController.delete)

/*=== Routes Admin chefs ===*/
routes.get('/admin/chefs', ChefsController.index)
routes.get('/admin/chefs/create', ChefsController.create)
routes.get('/admin/chefs/:id', ChefsController.show)
routes.get('/admin/chefs/:id/edit', ChefsController.edit)

routes.post('/admin/chefs', multer.array("photos", 1), ChefsController.post)
routes.put('/admin/chefs', multer.array("photos", 1), ChefsController.put)
routes.delete('/admin/chefs', ChefsController.delete)

/*=== Not Found ===*/
routes.use(function(req, res) {
    res.status(404).render("site/not-found")
})

module.exports = routes