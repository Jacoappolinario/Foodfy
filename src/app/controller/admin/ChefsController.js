const Chefs = require('../../models/admin/Chefs')
const File = require('../../models/file/File')
const Recipe = require('../../models/admin/Recipes')

module.exports = {
    async index(req, res) {
        let results = await Chefs.all()
        const chefs = results.rows

        if (!chefs) return res.send("Chefs not found")

        async function getImage(chefId) {
            let results = await Chefs.files(chefId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
            return files[0]
        }

        const chefsPromise = chefs.map(async chef => {
            chef.img = await getImage(chef.id)
            return chef
        }).filter((chef, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(chefsPromise)
        
        return res.render("admin/chefs/index", { chefs: lastAdded })
        
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
        let results = await Chefs.find(req.params.id) 
        const chef = results.rows[0]

        results = await Chefs.files(chef.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        // Get recipe images
        results = await Chefs.findRecipe(chef.id)
        const recipes = results.rows 

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
            return files[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        }).filter((recipe, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(recipesPromise)
        
        return res.render("admin/chefs/show", { chef, recipes: lastAdded, files })
        
    },
    async edit(req, res) {
        let results = await Chefs.find(req.params.id) 
        const chef = results.rows[0]

        //get image
        results = await Chefs.files(chef.id)
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

        let results = await Chefs.files(req.body.id)
        const fileId = results.rows[0].file_id

        const filePromise = req.files.map(file => Chefs.updateAvatar({...file, fileId}))
        await Promise.all(filePromise)

        await Chefs.update(req.body) 
        
        return res.redirect(`/admin/chefs/${req.body.id}`)
    
    },
    async delete(req, res) {
        
        await Chefs.delete(req.body.id) 

        return res.redirect(`/admin/chefs`)
       
    }
}