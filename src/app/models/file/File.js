const db = require('../../../config/db')
const fs = require('fs')

const Base = require('../Base')

Base.init({ table: 'files' })

module.exports = {
    ...Base,
    // create({filename, path}) {
    //     const query = `
    //                 INSERT INTO files (
    //                     name,
    //                     path
    //                 ) VALUES ($1, $2)
    //                 RETURNING id
    //                 `
    //     const values = [
    //         filename,
    //         path
    //     ]

    //     return db.query(query, values)
    // },
<<<<<<< HEAD
    async deleteImage(id) {
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]
=======
    // async deleteImage(id) {
    //     try {
    //         const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
    //         const file = result.rows[0]
>>>>>>> 66751c2b6ae4597ded878473e2daf82ce5e9c10d

    //         fs.unlinkSync(file.path)

    //         return db.query(`DELETE FROM files WHERE id = $1`, [id])

    //     } catch(err) {
    //         console.error(err)
    //     }
    // }
}