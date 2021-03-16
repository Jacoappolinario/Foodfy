const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const RecipesController = require('../app/controller/admin/RecipesController')

/*=== Routes Admin Recipes ===*/
routes.get('/recipes', RecipesController.index)
routes.get('/recipes/create', RecipesController.create)
routes.get('/recipes/:id', RecipesController.show)
routes.get('/recipes/:id/edit', RecipesController.edit)

routes.post('/recipes', multer.array("photos", 5), RecipesController.post)
routes.put('/recipes', multer.array("photos", 5), RecipesController.put)
routes.delete('/recipes', RecipesController.delete)

module.exports = routes