const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const RecipesController = require('../app/controller/admin/RecipesController')
const ChefsController = require('../app/controller/admin/ChefsController')

const UserController = require('../app/controller/admin/UserController')

const UserValidator = require('../app/validators/user')

/*=== Routes Admin Recipes ===*/
routes.get('/recipes', RecipesController.index)
routes.get('/recipes/create', RecipesController.create)
routes.get('/recipes/:id', RecipesController.show)
routes.get('/recipes/:id/edit', RecipesController.edit)

routes.post('/recipes', multer.array("photos", 5), RecipesController.post)
routes.put('/recipes', multer.array("photos", 5), RecipesController.put)
routes.delete('/recipes', RecipesController.delete)

/*=== Routes Admin chefs ===*/
routes.get('/chefs', ChefsController.index)
routes.get('/chefs/create', ChefsController.create)
routes.get('/chefs/:id', ChefsController.show)
routes.get('/chefs/:id/edit', ChefsController.edit)

routes.post('/chefs', multer.array("photos", 1), ChefsController.post)
routes.put('/chefs', multer.array("photos", 1), ChefsController.put)
routes.delete('/chefs', ChefsController.delete)

// /*=== Rotas de perfil de um usuário logado ===*/
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// /*=== Rotas que o administrador irá acessar para gerenciar usuários ===*/
// routes.get('/admin/users', UserController.list) // Mostrar a lista de usuários cadastrados
routes.get('/users/create', UserController.create) // Mostrar o formulário de criação de um usuário
routes.get('/users/:id/edit', UserController.edit) // Mostrar o formulário de edição de um usuário
routes.post('/users', UserValidator.post, UserController.post) // Cadastrar um usuário
routes.put('/users', UserValidator.put, UserController.put) // Editar um usuário
// routes.delete('/users', UserController.delete) // Deletar um usuário

module.exports = routes