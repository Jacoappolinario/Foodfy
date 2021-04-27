const Recipe = require('../../models/admin/Recipes')
const Chef = require('../../models/admin/Chefs')
const File = require('../../models/file/File')
const RecipeFile = require('../../models/file/RecipeFile')

module.exports = {
    async index(req, res) {
        let results = await Recipe.allRecipes()
        const recipes = results.rows

        if (!recipes) return res.send("Recipes not found")

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
        
        return res.render("admin/recipes/index", { recipes: lastAdded })
    },
    async myRecipes(req, res) {
        const { userId: id } = req.session

        let results = await Recipe.findMyRecipes(id)
        const recipes = results.rows

        if (!recipes) return res.send("Recipes not found")

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
        
        return res.render("admin/recipes/my-recipes", { recipes: lastAdded })
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

        let { title, chef_id, ingredients,
            preparation, information } = req.body
     
        const recipeId = await Recipe.create({
            chef_id,
            user_id: req.session.userId,
            title,
            ingredients,
            preparation,
            information
        })

        const filesPromise = req.files.map(file => File.create({ name: file.filename, path: file.path }))
        const files = await Promise.all(filesPromise)

        const recipesFilesPromise = files.map(fileId => RecipeFile.create({ recipe_id: recipeId, file_id: fileId }))
        await Promise.all(recipesFilesPromise)
        
        return res.redirect(`/admin/recipes/${recipeId}`)
    },
    async show(req, res) {
        // let results = await Recipe.find(req.params.id) 
        // const recipe = results.rows[0]

        const recipe = await Recipe.findOne({ where: {id: req.params.id} })

        const chef = await Chef.findOne({ where: {id: recipe.chef_id} })
        //Colocar o 'updated_at' para a pegar os dados da query de acordo com os ultimos adicionados
        // lembrar disso!!!

        recipe.author = chef.name

        let files  = await Recipe.files(recipe.id)
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/show", { recipe, files })
    
    },
    async edit(req, res) {
        let results = await Recipe.find(req.params.id) 
        const recipe = results.rows[0]

        console.log(recipe.ingredients)

        results = await Recipe.chefSelectOptions()
        const chefOptions = results.rows 

        let files = await Recipe.files(recipe.id)
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
                File.create({ name: file.filename, path: file.path }))

            const files = await Promise.all(newFilesPromise)
           
            const recipesFilesPromise = files.map(fileId => RecipeFile.create({ 
                recipe_id: req.body.id, file_id: fileId 
            }))

            await Promise.all(recipesFilesPromise)
        }

        if (req.body.removed_files) {
            // 1,2,3,
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) 
            
            const removedFilesPromise = removedFiles.map(id => File.deleteImage(id))

            await Promise.all(removedFilesPromise)
        }

        let { chef_id, title, ingredients,
            preparation, information, id } = req.body

        // await Recipe.updatee(req.body)
        await Recipe.update(req.body.id, {
            chef_id, 
            title, 
            ingredients,
            preparation, 
            information, 
            id
        })
        
        return res.redirect(`/admin/recipes/${req.body.id}`)
        
    },
    // async delete(req, res) {

    //     await Recipe.delete(req.body.id) 
        
    //     return res.redirect(`/admin/recipes`)
        
    // }
}
