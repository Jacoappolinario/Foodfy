const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ChefsController = require('../app/controller/admin/ChefsController')

const ChefsValidator = require('../app/validators/ChefsValidators')

const { onlyUsers, isAdmin } = require('../app/middlewares/session')

/*=== Routes Admin chefs ===*/
routes.get('/chefs', onlyUsers, ChefsController.index)
routes.get('/chefs/create', onlyUsers, isAdmin, ChefsController.create)
routes.get('/chefs/:id', onlyUsers, ChefsController.show)
routes.get('/chefs/:id/edit', onlyUsers, isAdmin, ChefsController.edit)

routes.post('/chefs', onlyUsers, isAdmin, multer.array("photos", 1), ChefsValidator.post, ChefsController.post)
routes.put('/chefs', onlyUsers, isAdmin, multer.array("photos", 1), ChefsValidator.put, ChefsController.put)
// routes.delete('/chefs', onlyUsers, isAdmin, ChefsController.delete)

module.exports = routes