const db = require('../../../config/db')

module.exports = {
    all() {
        return db.query(`
            SELECT recipes.id, recipes.image, recipes.title,
            chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY recipes.id ASC`)
    },
    find(id) {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id])
    },
    findBy(filter) {
        return db.query(`
            SELECT recipes.id, recipes.image, recipes.title,
            chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title ILIKE '%${filter}%'
            ORDER BY recipes.id ASC`)
    },
    chefs() {
        return db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC`) 
    }
}