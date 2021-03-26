const express = require('express')
const routes = express.Router()
const SessionController = require('../app/controller/admin/SessionController')
const UserController = require('../app/controller/admin/UserController')
const ProfileController = require('../app/controller/admin/ProfileController')

const UserValidator = require('../app/validators/UserValidator')
const SessionValidator = require('../app/validators/SessionValidator')
const ProfileValidator = require('../app/validators/ProfileValidator')

const { onlyUsers } = require('../app/middlewares/session')

// Login/logout
routes.get('/users/login', SessionController.loginForm)
routes.post('/users/login', SessionValidator.login, SessionController.login)
routes.post('/users/logout', SessionController.logout)

// Reset password /forgot
routes.get('/users/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)
// routes.post('/forgot-password', SessionController.forgot)
// rorutes.post('/password-reset', SessionController.reset)

// Profile
routes.get('/profile', onlyUsers, ProfileController.index) 
routes.put('/profile', ProfileValidator.put, ProfileController.put)

// Users register
routes.get('/users/create', onlyUsers, UserController.create)
routes.post('/users', onlyUsers, UserValidator.post, UserController.post) 
routes.get('/users', onlyUsers, UserController.list)

routes.get('/users/:id/edit', onlyUsers, UserController.edit) 
routes.put('/users', onlyUsers, UserValidator.put, UserController.put) 
routes.delete('/users', onlyUsers, UserController.delete)


module.exports = routes