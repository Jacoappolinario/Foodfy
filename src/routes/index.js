const express = require('express')
const routes = express.Router()

const site = require('./site')
const admin = require('./admin')

const HomeController = require("../app/controller/site/HomeController")

routes.get('/', HomeController.index)

routes.use('/site', site)
routes.use('/admin', admin)


module.exports = routes