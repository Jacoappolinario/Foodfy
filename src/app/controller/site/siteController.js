const Site = require('../../models/site/Site')

module.exports = {
    home(req, res) {
        Site.all(function(recipes) {
            return res.render("site/recipes/home", { recipes })
        })
    },
    about(req, res) {
        return res.render("site/recipes/about")
    },
    recipes(req, res) {
        Site.all(function(recipes) {
            return res.render("site/recipes/recipes", { recipes })
        })
    },
    details(req, res) {
        Site.find(req.params.id, function(recipe) {
            return res.render("site/recipes/details", { recipe })
        })
    },
    search(req, res) {
        const { filter } = req.query

        if (filter) {
            Site.findBy(filter, function(recipes) {
                return res.render("site/recipes/search", { filter, recipes })
            })
        } 
        
    }
}
