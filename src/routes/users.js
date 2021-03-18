const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controller/admin/SessionController')
const UserController = require('../app/controller/admin/UserController')
const ProfileController = require('../app/controller/admin/ProfileController')

const UserValidator = require('../app/validators/user')

// Login/logout
routes.get('/users/login', SessionController.loginForm)
// routes.post('/login', SessionController.login)
// routes.post('logout', SessionController.logout)

// Profile
routes.get('/users/profile', ProfileController.index) 
routes.put('/users/profile', ProfileController.put)

// Users register
routes.get('/users/create', UserController.create)
routes.post('/users', UserValidator.post, UserController.post) 
routes.get('/users', UserController.list)

routes.get('/users/:id/edit', UserController.edit) 
routes.put('/users', UserValidator.put, UserController.put) 
routes.delete('/users', UserController.delete)


module.exports = routes