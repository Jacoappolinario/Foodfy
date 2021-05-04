const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const RecipesController = require('../app/controller/admin/RecipesController')

const { onlyUsers } = require('../app/middlewares/session')

const RecipesValidator = require('../app/validators/RecipesValidator')

/*=== Routes Admin Recipes ===*/
routes.get('/my-recipes', onlyUsers, RecipesController.myRecipes)
routes.get('/recipes', onlyUsers, RecipesController.index)
routes.get('/recipes/create', onlyUsers, RecipesController.create)
routes.get('/recipes/:id', onlyUsers, RecipesController.show)
routes.get('/recipes/:id/edit', onlyUsers, RecipesValidator.checksAccess, RecipesController.edit)

routes.post('/recipes', onlyUsers, multer.array("photos", 5), RecipesValidator.post, RecipesController.post)
routes.put('/recipes', onlyUsers, multer.array("photos", 5), RecipesValidator.put, RecipesController.put)
// routes.delete('/recipes', onlyUsers, RecipesController.delete)

module.exports = routes