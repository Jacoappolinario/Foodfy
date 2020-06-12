const data = require('../../../data.json')
const fs = require('fs')

module.exports = {
    home(req, res) {
        return res.render("recipes/home", { recipes: data.recipes })
    },
    about(req, res) {
        return res.render("recipes/about")
    },
    recipes(req, res) {
        return res.render("recipes/recipes", { recipes: data.recipes })
    },
    details(req, res) {
        const { id } = req.params;
    
        const foundRecipe = data.recipes.find(function(recipes) {
            return recipes.id == id
        }) 

        if (!foundRecipe) return res.render("recipes/not-found")


        return res.render("recipes/details", { recipe: foundRecipe })
    }
}
