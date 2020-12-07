const db = require("../../../config/db")
const { date } = require('../../../lib/utils')

module.exports = {
    all() {
        try {
            return db.query(`
                SELECT * 
                FROM chefs 
                ORDER BY id ASC`) 
        } catch(err) {
            console.error(err)
        }
    },
    create(data, fileId) {
        try {
            const query = `
                INSERT INTO chefs (
                    name,
                    file_id
                ) VALUES ($1, $2)
                RETURNING id
                `
            const values = [
                data.name,
                fileId
            ]

            return db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    findChef(id) {
        try {
            return db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`, [id]) 
        } catch(err) {
            console.error(err)
        }
    },
    findRecipe(id) {
        try {
            return db.query(`
            SELECT recipes.id, 
            recipes.title,
            chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            ORDER BY recipes.id ASC`, [id])
        } catch(err) {
            console.error(err)
        }
    },
    filesChef(id) {
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
    },
    update(data) {
        try {
            const query = `
            UPDATE chefs SET
                name=($1)
                WHERE id = $2
            `
            const values = [
                data.name,
                data.id
            ]

            return db.query(query, values)
        } catch(err) {
            console.error(err)
        }
    },
    delete(id) {
        try {
            return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
        } catch(err) {
            console.error(err)
        }
    }
}