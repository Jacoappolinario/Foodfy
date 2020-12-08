const Site = require('../../models/site/Site')

module.exports = {
    async home(req, res) {
        let results = await Site.all() 
        const recipes = results.rows
        
        return res.render("site/home", { recipes })
    },
    about(req, res) {
        return res.render("site/about")
    },
    async recipes(req, res) {
        let results = await Site.all()
        const recipes = results.rows 
        
        return res.render("site/recipes", { recipes })
        
    },
    async details(req, res) {
        let results = await Site.find(req.params.id)
        const recipe = results.rows[0]
        
        return res.render("site/details", { recipe })
       
    },
    async chefs(req, res) {
        let results = await Site.chefs()
        const chefs = results.rows 
        
        return res.render("site/chefs", { chefs })
        
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
