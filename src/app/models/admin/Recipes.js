const db = require('../../../config/db')
const { date } = require('../../../lib/utils')

module.exports = {
    all(){
        return db.query(`
            SELECT recipes.*, chefs.name AS author
            From recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY recipes.id ASC`)
    },
    create(data) {
        const query = `
                    INSERT INTO recipes (
                        chef_id,
                        title,
                        ingredients,
                        preparation,
                        information
                    ) VALUES ($1, $2, $3, $4, $5)
                    RETURNING id
                    `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id])
    },
    files(id) {
        return db.query(`
            SELECT files.*, recipe_id, file_id 
            FROM files
            LEFT JOIN recipes_files
            ON (files.id = recipes_files.file_id)
            WHERE recipes_files.recipe_id = $1`, [id])
    },
    chefSelectOptions() {
        return db.query(`SELECT id,name FROM chefs`)
    },
    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id=($1),
                title=($2),
                ingredients=($3),
                preparation=($4),
                information=($5)
                WHERE id = $6  
            `
        
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values) 
    },
    delete(id) {
        return db.query(`
            DELETE FROM recipes 
            WHERE id = $1`, [id])
    }
}