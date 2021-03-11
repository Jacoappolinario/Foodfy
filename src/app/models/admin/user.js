const db = require('../../../config/db')

module.exports = {
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            //WHERE | OR | AND
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },
    async create(data) {
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    is_admin
                ) VALUES ($1, $2, $3)
                RETURNING id
            `

            const values = [
                data.name,
                data.email,
                data.is_admin
            ]

            const results = await db.query(query, values)
            return results.rows[0].id

        } catch(err) {
            console.error(err)
        }
    }
}