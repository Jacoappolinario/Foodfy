const db = require('../../../config/db')
const fs = require('fs')

const Base = require('../Base')

Base.init({ table: 'recipes' })

module.exports = {
    ...Base,
    allRecipes(){
        try {
            return db.query(`
            SELECT recipes.*, chefs.name AS author
            From recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY updated_at DESC`)
        } catch(err) {
            console.error(err)
        }
    },
    // create(data) {
    //     try {
    //         const query = `
    //                 INSERT INTO recipes (
    //                     chef_id,
    //                     user_id,
    //                     title,
    //                     ingredients,
    //                     preparation,
    //                     information
    //                 ) VALUES ($1, $2, $3, $4, $5, $6)
    //                 RETURNING id
    //                 `
    //         const values = [
    //             data.chef_id,
    //             data.user_id,
    //             data.title,
    //             data.ingredients,
    //             data.preparation,
    //             data.information
    //         ]

    //         return db.query(query, values)
    //     } catch(err) {
    //         console.error(err)
    //     }
    // },
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
    findMyRecipes(id) {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.user_id = $1`, [id])
    },
    async files(id) {
        const results = await db.query(`
            SELECT files.*, recipe_id, file_id 
            FROM files
            LEFT JOIN recipes_files
            ON (files.id = recipes_files.file_id)
            WHERE recipes_files.recipe_id = $1`, [id])

        return results.rows
    },
    chefSelectOptions() {
        try {
            return db.query(`SELECT id,name FROM chefs`)
        } catch(err) {
            console.error(err)
        }
    },
    // update(data) {
    //     try {
    //         const query = `
    //         UPDATE recipes SET
    //             chef_id=($1),
    //             title=($2),
    //             ingredients=($3),
    //             preparation=($4),
    //             information=($5)
    //             WHERE id = $6  
    //         `
        
    //         const values = [
    //             data.chef_id,
    //             data.title,
    //             data.ingredients,
    //             data.preparation,
    //             data.information,
    //             data.id
    //         ]

    //         return db.query(query, values) 
    //     } catch(err) {
    //         console.error(err)
    //     }
    // },
    async delete(id) {
        try {
            const result = await db.query(`
                SELECT files.*, recipe_id, file_id 
                FROM files
                LEFT JOIN recipes_files
                ON (files.id = recipes_files.file_id)
                WHERE recipes_files.recipe_id = $1`, [id])

            const file = result.rows[0]

            fs.unlinkSync(file.path)

            await db.query(`DELETE FROM recipes WHERE id = $1`, [id])
            await db.query(`DELETE FROM files WHERE id = $1`, [file.id])

        } catch(err) {
            console.error(err)
        }
    }
}