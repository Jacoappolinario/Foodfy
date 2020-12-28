const Chefs = require('../../models/admin/Chefs')
const Site = require('../../models/site/Site')

module.exports = {
    about(req, res) {
        return res.render("site/about")
    },
    async recipes(req, res) {
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

        return res.render("site/recipes", { recipes: lastAdded })
        
    },
    async details(req, res) {
        let results = await Site.find(req.params.id)
        const recipe = results.rows[0]
        
        return res.render("site/details", { recipe })
       
    },
    async chefs(req, res) {
        let results = await Site.chefs()
        const chefs = results.rows 

        if (!chefs) return res.send("Chefs not found")

        async function getImage(chefId) {
            let results = await Chefs.filesChef(chefId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const chefsPromise = chefs.map(async chef => {
            chef.img = await getImage(chef.id)
            return chef
        }).filter((chef, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(chefsPromise)
        
        return res.render("site/chefs", { chefs: lastAdded })
        
    },
    async search(req, res) {
        const { filter } = req.query

        if (filter) {
            let results = await Site.findBy(filter)
            const recipes = results.rows 
                
            return res.render("site/search", { filter, recipes })
            
        }
        
    }
}
