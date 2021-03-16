const express = require('express')
const routes = express.Router()
const UserController = require('../app/controller/admin/UserController')

const UserValidator = require('../app/validators/user')


// Profile
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado


// Users register
routes.get('/users/create', UserController.create)
routes.post('/users', UserValidator.post, UserController.post) 
// routes.get('/admin/users', UserController.list) // Mostrar a lista de usuários cadastrados

routes.get('/users/:id/edit', UserController.edit) 
routes.put('/users', UserValidator.put, UserController.put) 
routes.delete('/users', UserController.delete)


module.exports = routes