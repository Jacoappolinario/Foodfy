const db = require('../../../config/db')
const crypto = require('crypto')
const { hash } = require('bcryptjs')
const mailer = require('../../../lib/mailer')

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
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id
            `
            // Generate password
            const password = crypto.randomBytes(8).toString("hex")

           // Send email password
            await mailer.sendMail({
                to: data.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Foodfy - Seja bem-vindo',
                html: `<h2>Cadastro realizado com sucesso no Foodfy</h2>
                <p>
                Sua senha: ${password}<br>
                Guarde-a em local seguro.
                </p>`
            })


            // hash of password
            const passwordHash = await hash(password, 8)

            const values = [
                data.name,
                data.email,
                passwordHash,
                data.is_admin || "false"
            ]


            const results = await db.query(query, values)
            return results.rows[0].id


        } catch(err) {
            console.error(err)
        }
    }
}