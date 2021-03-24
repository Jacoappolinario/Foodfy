const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controller/admin/SessionController')
const UserController = require('../app/controller/admin/UserController')
const ProfileController = require('../app/controller/admin/ProfileController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const ProfileValidator = require('../app/validators/ProfileValidators')

const { onlyUsers } = require('../app/middlewares/session')

// Login/logout
routes.get('/users/login', SessionController.loginForm)
routes.post('/users/login', SessionValidator.login, SessionController.login)
routes.post('/users/logout', SessionController.logout)

// Profile
routes.get('/users/profile', onlyUsers, ProfileController.index) 
routes.put('/users/profile', ProfileValidator.put, ProfileController.put)

// Users register
routes.get('/users/create', onlyUsers, UserController.create)
routes.post('/users', onlyUsers, UserValidator.post, UserController.post) 
routes.get('/users', onlyUsers, UserController.list)

routes.get('/users/:id/edit', onlyUsers, UserController.edit) 
routes.put('/users', onlyUsers, UserValidator.put, UserController.put) 
routes.delete('/users', onlyUsers, UserController.delete)


module.exports = routes