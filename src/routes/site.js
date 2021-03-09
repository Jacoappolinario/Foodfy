const express = require('express')
const routes = express.Router()

const SiteController = require('../app/controller/site/SiteController')
const SearchController = require("../app/controller/site/SearchController")

routes.get('/search', SearchController.index)
routes.get('/about', SiteController.about)
routes.get('/recipes', SiteController.recipes)
routes.get('/recipes/:id', SiteController.details)
routes.get('/chefs', SiteController.chefs)

/*=== Not Found ===*/
routes.use(function(req, res) {
    res.status(404).render("site/not-found")
})

module.exports = routes