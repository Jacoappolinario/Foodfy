const Recipe = require('../../models/admin/Recipes')
const File = require('../../models/file/File')
const RecipeFile = require('../../models/file/RecipeFile')

module.exports = {
    async index(req, res) {
        let results = await Recipe.all()
        const recipes = results.rows

        if (!recipes) return res.send("Recipes not found")

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
        
        return res.render("admin/recipes/index", { recipes: lastAdded })
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

        results = await Recipe.files(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/show", { recipe, files })
    
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
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file =>
                File.create({...file}))

            const filesResults = await Promise.all(newFilesPromise)
            const recipeFile = filesResults.map(file => {
                const fileId = file.rows[0].id
                RecipeFile.create(req.body.id, fileId)
            }) 

            await Promise.all(recipeFile)
        }

        if (req.body.removed_files) {
            // 1,2,3,
            const removedFiles = req.body.removed_files.split(",") // [1,2,3]
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) // [1,2,3]
            
            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Recipe.update(req.body)
        
        return res.redirect(`/admin/recipes/${req.body.id}`)
        
    },
    async delete(req, res) {

        await Recipe.delete(req.body.id) 
        
        return res.redirect(`/admin/recipes`)
        
    }
}
