const LoadRecipesService = require('../../services/LoadRecipes')

module.exports = {
    async index(req, res) {
        try {
            const allRecipes = await LoadRecipesService.load('recipes')
            const recipes = allRecipes
            .filter((recipe, index) => index > 2 ? false : true)

            return res.render("site/home/index", { recipes })
            
        } catch (error) {
            console.error(error)
        }
    }
}