const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ChefsController = require('../app/controller/admin/ChefsController')

const { onlyUsers } = require('../app/middlewares/session')
// const ChefsValidator = require('../app/validators/ChefsValidators')

/*=== Routes Admin chefs ===*/
routes.get('/chefs', onlyUsers, ChefsController.index)
routes.get('/chefs/create', onlyUsers, ChefsController.create)
routes.get('/chefs/:id', onlyUsers, ChefsController.show)
routes.get('/chefs/:id/edit', onlyUsers, ChefsController.edit)

routes.post('/chefs', onlyUsers, multer.array("photos", 1), ChefsController.post)
routes.put('/chefs', onlyUsers, multer.array("photos", 1), ChefsController.put)
routes.delete('/chefs', onlyUsers, ChefsController.delete)

module.exports = routes