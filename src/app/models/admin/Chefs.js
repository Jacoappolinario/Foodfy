const db = require("../../../config/db")
const { date } = require('../../../lib/utils')

module.exports = {
    all() {
        return db.query(`
                SELECT * 
                FROM chefs 
                ORDER BY id ASC`) 
    },
    create(data) {
        const query = `
                INSERT INTO chefs (
                    name,
                    avatar_url,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id
                `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    findChef(id) {
        return db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id]) 
    },
    findRecipe(id) {
        return db.query(`
            SELECT 
            recipes.id, recipes.image, recipes.title,
            chefs.name AS author
            From recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            ORDER BY recipes.id ASC`, [id])
    },
    update(data) {
        const query = `
            UPDATE chefs SET
                name=($1),
                avatar_url=($2)
                WHERE id = $3
            `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    }
}