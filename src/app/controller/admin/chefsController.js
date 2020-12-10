const Chefs = require('../../models/admin/Chefs')
const File = require('../../models/file/File')

module.exports = {
    async index(req, res) {
        let results = await Chefs.all()
        const chefs = results.rows
        
        return res.render("admin/chefs/index", {chefs})
        
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "avatar_photo") {
                return res.send("Please, fill all fields")
            }
        }

        if (req.files.length == 0) 
            return res.send('Please, send at last one image')


        const filePromise = req.files.map(file => File.create({...file}))
        let results = await filePromise[0]
        const fileId = results.rows[0].id

        results = await Chefs.create(req.body, fileId)
        const chefId = results.rows[0].id
        
        return res.redirect(`/admin/chefs/${chefId}`)
       
    },
    async show(req, res) {
        let results = await Chefs.findChef(req.params.id) 
        const chef = results.rows[0]

        results = await Chefs.findRecipe(chef.id)
        const recipes = results.rows 

        results = await Chefs.filesChef(chef.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        return res.render("admin/chefs/show", { chef, recipes, files })
        
    },
    async edit(req, res) {
        let results = await Chefs.findChef(req.params.id) 
        const chef = results.rows[0]

        // results = await Chefs.findRecipe(chef.id)
        // const chefRecipes = results.rows

        //get image
        results = await Chefs.filesChef(chef.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        return res.render("admin/chefs/edit", { chef, files })
        
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "avatar_photo") {
                return res.send("Please, fill all fields")
            }
        }

        let results = await Chefs.filesChef(req.body.id)
        const fileId = results.rows[0].file_id

        const filePromise = req.files.map(file => Chefs.avatarUpdate({...file, fileId}))
        await Promise.all(filePromise)

        await Chefs.update(req.body) 
        
        return res.redirect(`/admin/chefs/${req.body.id}`)
    
    },
    async delete(req, res) {
        await Chefs.delete(req.body.id) 
        
        return res.redirect(`/admin/chefs`)
       
    }
}