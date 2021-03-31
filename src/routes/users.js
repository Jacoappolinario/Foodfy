const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controller/admin/SessionController')
const UserController = require('../app/controller/admin/UserController')
const ProfileController = require('../app/controller/admin/ProfileController')

const UserValidator = require('../app/validators/UserValidator')
const SessionValidator = require('../app/validators/SessionValidator')
const ProfileValidator = require('../app/validators/ProfileValidator')

const { onlyUsers, isAdmin } = require('../app/middlewares/session')

// Login/logout
routes.get('/users/login', SessionController.loginForm)
routes.post('/users/login', SessionValidator.login, SessionController.login)
routes.post('/users/logout', SessionController.logout)

// Reset password /forgot
routes.get('/users/forgot-password', SessionController.forgotForm)
routes.get('/users/password-reset', SessionController.resetForm)
routes.post('/users/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/users/password-reset', SessionValidator.reset, SessionController.reset)

// Profile
routes.get('/profile', onlyUsers, ProfileController.index) 
routes.put('/profile', ProfileValidator.put, ProfileController.put)

// Users register
routes.get('/users/create', onlyUsers, isAdmin, UserController.create)
routes.post('/users', onlyUsers, isAdmin, UserValidator.post, UserController.post) 
routes.get('/users', onlyUsers, isAdmin, UserController.list)

routes.get('/users/:id/edit', onlyUsers, isAdmin, UserController.edit) 
routes.put('/users', onlyUsers, isAdmin, UserValidator.put, UserController.put) 
routes.delete('/users', onlyUsers, isAdmin, UserController.delete)


module.exports = routes