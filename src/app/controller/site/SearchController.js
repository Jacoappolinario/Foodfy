const Site = require('../../models/site/Site')

module.exports = {
    async index(req, res) {
        const { filter } = req.query

        if (filter) {
            let results = await Site.findBy(filter)
            const recipes = results.rows 
                
            return res.render("site/search/index.njk", { filter, recipes })
            
        }
    }
}