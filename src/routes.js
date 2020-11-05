const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const siteController = require('./app/controller/site/siteController')
const recipesController = require('./app/controller/admin/recipesController')
const chefsController = require('./app/controller/admin/chefsController')

/*=== Routes Site ===*/
routes.get('/', function(req, res) {
    return res.redirect("/home")
})
routes.get('/home', siteController.home)
routes.get('/about', siteController.about)
routes.get('/recipes', siteController.recipes)
routes.get('/recipes/:id', siteController.details)
routes.get('/chefs', siteController.chefs)
routes.get('/search', siteController.search)

/*=== Routes Admin Recipes ===*/
routes.get('/admin/recipes', recipesController.index)
routes.get('/admin/recipes/create', recipesController.create)
routes.get('/admin/recipes/:id', recipesController.show)
routes.get('/admin/recipes/:id/edit', recipesController.edit)

routes.post('/admin/recipes', multer.array("photos", 5), recipesController.post)
routes.put('/admin/recipes', multer.array("photos", 5), recipesController.put)
routes.delete('/admin/recipes', recipesController.delete)

/*=== Routes Admin chefs ===*/
routes.get('/admin/chefs', chefsController.index)
routes.get('/admin/chefs/create', chefsController.create)
routes.get('/admin/chefs/:id', chefsController.show)
routes.get('/admin/chefs/:id/edit', chefsController.edit)

routes.post('/admin/chefs', multer.array("photos", 1), chefsController.post)
routes.put('/admin/chefs', multer.array("photos", 1), chefsController.put)
routes.delete('/admin/chefs', chefsController.delete)

/*=== Not Found ===*/
routes.use(function(req, res) {
    res.status(404).render("site/not-found")
})

module.exports = routes