const express = require('express')
const routes = express.Router()

const HomeController = require("../app/controller/site/HomeController")

const site = require('./site')
const recipes = require('./recipes')
const users = require('./users')
const chefs = require('./chefs')


routes.get('/', HomeController.index)

routes.use('/site', site)
routes.use('/admin', recipes)
routes.use('/admin', chefs)
routes.use('/admin', users)


module.exports = routes