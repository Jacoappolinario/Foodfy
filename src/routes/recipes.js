const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const RecipesController = require('../app/controller/admin/RecipesController')

const { onlyUsers } = require('../app/middlewares/session')

/*=== Routes Admin Recipes ===*/
routes.get('/recipes', onlyUsers, RecipesController.index)
routes.get('/recipes/create', onlyUsers, RecipesController.create)
routes.get('/recipes/:id', onlyUsers, RecipesController.show)
routes.get('/recipes/:id/edit', onlyUsers, RecipesController.edit)

routes.post('/recipes', onlyUsers, multer.array("photos", 5), RecipesController.post)
routes.put('/recipes', onlyUsers, multer.array("photos", 5), RecipesController.put)
routes.delete('/recipes', onlyUsers, RecipesController.delete)

module.exports = routes