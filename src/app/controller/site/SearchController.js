const Site = require('../../models/site/Site')

module.exports = {
    async index(req, res) {

        let results

        const { filter } = req.query

        if (!filter) return res.redirect("/")

        results = await Site.findBy(filter)
    
        async function getImage(recipeId) {
            let results = await Site.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const recipesPromise = results.rows.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })

        const recipes = await Promise.all(recipesPromise)

        const search = {
            term: req.query.filter,
            total: recipes.length
        }
            
        return res.render("site/search/index.njk", { recipes, search })
        
        
    }
}