const Recipe = require('../../models/admin/Recipes')
const Chef = require('../../models/admin/Chefs')
const File = require('../../models/file/File')
const RecipeFile = require('../../models/file/RecipeFile')
const LoadService = require('../../services/LoadRecipes')
const fs = require('fs')

module.exports = {
    async index(req, res) {
        // let results = await Recipe.allRecipes()
        // const recipes = results.rows

        const recipes = await LoadService.load('recipes')


        // if (!recipes) return res.send("Recipes not found")

        // async function getImage(recipeId) {
        //     let files = await Recipe.files(recipeId)
        //     files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
        //     return files[0]
        // }

        // const recipesPromise = recipes.map(async recipe => {
        //     recipe.img = await getImage(recipe.id)
        //     return recipe
        // })
        // .filter((recipe, index) => index > 2 ? false : true)

        // const lastAdded = await Promise.all(recipesPromise)
        
        return res.render("admin/recipes/index", { recipes })
    },
    async myRecipes(req, res) {

        const recipes = await LoadService.load('recipes', {
            where: {
                user_id: req.session.userId
            }
        })

        // const { userId: id } = req.session

        // let results = await Recipe.findMyRecipes(id)
        // const recipes = results.rows

        // const recipes = await Recipe.findAll({ where: {user_id: req.session.userId} })

        // if (!recipes) return res.send("Recipes not found")

        // async function getImage(recipeId) {
        //     let files = await Recipe.files(recipeId)
        //     files = files.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
        //     return files[0]
        // }

        // const recipesPromise = recipes.map(async recipe => {
        //     recipe.img = await getImage(recipe.id)
        //     return recipe
        // })
        // // .filter((recipe, index) => index > 2 ? false : true)

        // const lastAdded = await Promise.all(recipesPromise)
        
        return res.render("admin/recipes/my-recipes", { recipes })
    },
    async create(req, res) {
        const chefOptions = await Recipe.chefSelectOptions()

        return res.render("admin/recipes/create", { chefOptions })
        
    },
    async post(req, res) {
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

        const filesPromise = req.files.map(file => File.create({ 
            name: file.filename, path: file.path 
        }))
        const files = await Promise.all(filesPromise)

        const recipesFilesPromise = files.map(fileId => RecipeFile.create({ 
            recipe_id: recipeId, file_id: fileId 
        }))
        await Promise.all(recipesFilesPromise)
        
        return res.redirect(`/admin/recipes/${recipeId}`)
    },
    async show(req, res) {
        // const recipe = await Recipe.findOne({ where: {id: req.params.id} })

        // const chef = await Chef.findOne({ where: {id: recipe.chef_id} })
        // recipe.author = chef.name
        try {
            const recipe = await LoadService.load('recipe', {
                where: {
                    id: req.params.id
                }
            })


            // let files  = await Recipe.files(recipe.id)
            // files = files.map(file => ({
            //     ...file,
            //     src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            // }))

            // return res.render("admin/recipes/show", { recipe, files })
            return res.render("admin/recipes/show", { recipe })

        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        const recipe = await LoadService.load('recipe', {
            where: {
                id: req.params.id
            }
        })
      
        const chefOptions = await Recipe.chefSelectOptions()
   
        let files = await Recipe.files(recipe.id)
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/edit", { recipe, chefOptions, files})
    },
    async put(req, res) {
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
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) 
            
            const removedFilesPromise = removedFiles.map(id => File.deleteImage(id))

            await Promise.all(removedFilesPromise)
        }

        let { chef_id, title, ingredients,
            preparation, information, id } = req.body

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
        
    //     const files = await Recipe.files(req.body.id)

    //     await Recipe.delete(req.body.id) 
       
    //     files.map(file => {
    //         try {
    //             fs.unlinkSync(file.path)
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     })  
        
    //     return res.redirect(`/admin/recipes`)
        
    // }
}
