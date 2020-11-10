const Recipe = require('../../models/admin/Recipes')
const File = require('../../models/file/File')
const RecipeFile = require('../../models/file/RecipeFile')

module.exports = {
    async index(req, res) {
        let results = await Recipe.all()
        const recipes = results.rows
        
        return res.render("admin/recipes/index", { recipes })
    },
    async create(req, res) {
        let results = await Recipe.chefSelectOptions()
        const chefOptions = results.rows
        
            return res.render("admin/recipes/create", { chefOptions })
        
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        if (req.files.length == 0) 
            return res.send('Please, send at last one image')



        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id 

        const filesPromise = req.files.map(file => File.create({...file}))

        const filesResults = await Promise.all(filesPromise)
        const recipeFile = filesResults.map(file => {
            const fileId = file.rows[0].id
            RecipeFile.create(recipeId, fileId)
        }) 

        await Promise.all(recipeFile)
        
        return res.redirect(`/admin/recipes/${recipeId}`)
       

    },
    async show(req, res) {
        let results = await Recipe.find(req.params.id) 
        const recipe = results.rows[0]

        return res.render("admin/recipes/show", { recipe })
    
    },
    async edit(req, res) {
        let results = await Recipe.find(req.params.id) 
        const recipe = results.rows[0]

        //get chefs options
        results = await Recipe.chefSelectOptions()
        const chefOptions = results.rows 

        //get imagens
        results = await Recipe.files(recipe.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        return res.render("admin/recipes/edit", { recipe, chefOptions, files})
    },
    async put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields")
            }
        }

        await Recipe.update(req.body)
        
        return res.redirect(`/admin/recipes/${req.body.id}`)
        
    },
    async delete(req, res) {
        await Recipe.delete(req.body.id) 
        
        return res.redirect(`/admin/recipes`)
        
    }
}
