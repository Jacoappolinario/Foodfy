const Base = require('../Base')

Base.init({ table: 'recipes_files' })

module.exports = {
    ...Base,
    // create(recipe_id, file_id) {
    //     const query = `
    //                 INSERT INTO recipes_files (
    //                     recipe_id,
    //                     file_id
    //                 ) VALUES ($1, $2)
    //                 RETURNING id
    //                 `
    //     const values = [
    //         recipe_id,
    //         file_id
    //     ]

    //     return db.query(query, values)
    // }
}