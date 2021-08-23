const db = require('../../../config/db')

const Base = require('../Base')

Base.init({ table: 'recipes' })

module.exports = {
    ...Base,
    async files(id) {
        const results = await db.query(`
            SELECT files.*, recipe_id, file_id 
            FROM files
            LEFT JOIN recipes_files
            ON (files.id = recipes_files.file_id)
            WHERE recipes_files.recipe_id = $1`, [id])

        return results.rows
    },
    async chefSelectOptions() {
        try {
            const results = await db.query(`SELECT id,name FROM chefs`)
            return results.rows

        } catch(err) {
            console.error(err)
        }
    }
}