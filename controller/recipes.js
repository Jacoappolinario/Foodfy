const data = require("../data")
// Home
exports.home = function(req, res) {
    return res.render("recipes/home", { recipes: data })
}
// About
exports.about = function(req, res) {
    return res.render("recipes/about")
}
// Recipes
exports.recipes = function (req, res) {
    return res.render("recipes/recipes", { recipes: data })
}
// Details Recipes
exports.details = function (req, res) {
    const recipeIndex = req.params.index;
    
    const recipeId = data.find(function(recipeId) {
        return recipeId == data[recipeIndex]
    }) 

    if (!recipeId) {
        return res.render("recipes/not-found")
    }


    return res.render("recipes/details", { recipe: recipeId })
}

// Admin Index
exports.index = function(req, res) {
    return res.render("admin/index", { recipes: data })
}