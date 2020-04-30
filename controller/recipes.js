const data = require('../data.json')
const fs = require('fs')

// Home
exports.home = function(req, res) {
    return res.render("recipes/home", { recipes: data.recipes })
}
// About
exports.about = function(req, res) {
    return res.render("recipes/about")
}
// Recipes
exports.recipes = function (req, res) {
    return res.render("recipes/recipes", { recipes: data.recipes })
}
// Details Recipes
exports.details = function (req, res) {
    const { id } = req.params;
    
    const foundRecipe = data.recipes.find(function(recipes) {
        return recipes.id == id
    }) 

    if (!foundRecipe) return res.render("recipes/not-found")


    return res.render("recipes/details", { recipe: foundRecipe })
}