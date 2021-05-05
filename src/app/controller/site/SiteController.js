const Site = require('../../models/site/Site')
const LoadRecipesService = require('../../services/LoadRecipes')

module.exports = {
    about(req, res) {
        return res.render("site/about")
    },
    async recipes(req, res) {
        try {
            const recipes = await LoadRecipesService.load('recipes')

            return res.render("site/recipes", { recipes })
            
        } catch (error) {
            console.error(error)
        }
    },
    async details(req, res) {
        try {
            const recipe = await LoadRecipesService.load('recipe', {
                where: {
                    id: req.params.id
                }
            })

            return res.render("site/details", { recipe })

        } catch (error) {
            console.error(error)
        }
    },
    async chefs(req, res) {
        let results = await Site.chefs()
        const chefs = results.rows 

        if (!chefs) return res.send("Chefs not found")

        async function getImage(chefId) {
            let results = await Site.filesChefs(chefId)
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
    // async search(req, res) {
    //     const { filter } = req.query

    //     if (filter) {
    //         let results = await Site.findBy(filter)
    //         const recipes = results.rows 
                
    //         return res.render("site/search", { filter, recipes })
            
    //     }
        
    // }
}
