const express = require('express')
const routes = express.Router()
const UserController = require('../app/controller/admin/UserController')
const ProfileController = require('../app/controller/admin/ProfileController')

const UserValidator = require('../app/validators/user')


// Profile
routes.get('/admin/profile', ProfileController.index) 
routes.put('/admin/profile', ProfileController.put)


// Users register
routes.get('/users/create', UserController.create)
routes.post('/users', UserValidator.post, UserController.post) 
routes.get('/users', UserController.list)

routes.get('/users/:id/edit', UserController.edit) 
routes.put('/users', UserValidator.put, UserController.put) 
routes.delete('/users', UserController.delete)


module.exports = routes