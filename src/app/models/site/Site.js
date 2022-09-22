const db = require('../../../config/db')

const Base = require('../Base')

Base.init({ table: 'recipes' })

module.exports = {
    ...Base,
    async findBy(filter) {
        try {
            const results = await db.query(`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            ORDER BY recipes.id ASC`)

            return results
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
    },
    files(id) {
        try {
            return db.query(`
            SELECT files.*, recipe_id, file_id 
            FROM files
            LEFT JOIN recipes_files
            ON (files.id = recipes_files.file_id)
            WHERE recipes_files.recipe_id = $1`, [id])
        } catch(err) {
            console.error(err)
        }
    },
    filesChefs(id) {
        try {
            return db.query(`
            SELECT files.*, chefs.file_id
            FROM files
            LEFT JOIN chefs ON (files.id = chefs.file_id)
            WHERE chefs.id = $1
            ORDER BY files.id ASC`, [id]) 
        } catch(err) {
            console.error(err)
        }
    }
}