const db = require('../../../config/db')

module.exports = {
    all() {
        try {
            return db.query(`
            SELECT recipes.*, chefs.name AS author
            From recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY recipes.id ASC`)
        } catch(err) {
            console.error(err)
        }
    },
    find(id) {
        try {
            return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
        } catch(err) {
            console.error(err)
        }
    },
    findBy(filter) {
        try {
            return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            ORDER BY recipes.id ASC`)
        } catch(err) {
            console.error(err)
        }
    },
    chefs() {
        try {
            return db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC`) 
        } catch(err) {
            console.error(err)
        }
    }
}