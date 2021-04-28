const Chefs = require('../../models/admin/Chefs')
const File = require('../../models/file/File')
const Recipe = require('../../models/admin/Recipes')

module.exports = {
    async index(req, res) {
        const chefs = await Chefs.findAll()
        
        if (!chefs) return res.send("Chefs not found")

        async function getImage(chefId) {
            let files = await Chefs.files(chefId)
            files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
            return files[0]
        }

        const chefsPromise = chefs.map(async chef => {
            chef.img = await getImage(chef.id)
            return chef
        })
        // .filter((chef, index) => index > 2 ? false : true)

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


        let file = req.files.map(file => File.create({ name: file.filename, path: file.path}))
        const file_id = await Promise.all(file)

       const chefId = await Chefs.create({
            name: req.body.name,
            file_id
        })
        
        return res.redirect(`/admin/chefs/${chefId}`)
       
    },
    async show(req, res) {
        const chef = await Chefs.findOne({ where: {id: req.params.id} })
    
        let files = await Chefs.files(chef.id)
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        const recipes = await Recipe.findAll({ where: {chef_id: chef.id} })

        async function getImage(recipeId) {
            let files = await Recipe.files(recipeId)
            files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
            return files[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id)
            return recipe
        })
        // .filter((recipe, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(recipesPromise)
        
        return res.render("admin/chefs/show", { chef, recipes: lastAdded, files })
        
    },
    async edit(req, res) {
        const chef = await Chefs.findOne({ where: {id: req.params.id} }) 
        // const chef = results.rows[0]

        //get image
        let files = await Chefs.files(chef.id)
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

        let files = await Chefs.files(req.body.id)
        const fileId = files[0].file_id

        const avatarUpdate = req.files.map(file => File.update(fileId, {
            name: file.filename, 
            path: file.path
        }))

        await Promise.all(avatarUpdate)

        await Chefs.update(req.body.id, {
            name: req.body.name
        }) 
        
        return res.redirect(`/admin/chefs/${req.body.id}`)
    
    },
    async delete(req, res) {
    
        await Chefs.delete(req.body.id) 

        return res.redirect(`/admin/chefs`)
       
    }
}