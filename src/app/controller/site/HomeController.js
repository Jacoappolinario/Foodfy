const Site = require('../../models/site/Site')

module.exports = {
    async index(req, res) {
        let results = await Site.all() 
        const recipes = results.rows
        
        if (!recipes) return res.send("Recipes not found")

        async function getImage(recipeId) {
            let results = await Site.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        }).filter((recipe, index) => index > 2 ? false : true)
        
        const lastAdded = await Promise.all(recipesPromise)

        return res.render("site/home/index", { recipes: lastAdded })
    }
}