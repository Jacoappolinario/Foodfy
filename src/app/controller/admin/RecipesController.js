const Recipe = require('../../models/admin/Recipes')
const File = require('../../models/file/File')
const RecipeFile = require('../../models/file/RecipeFile')
const LoadRecipesService = require('../../services/LoadRecipes')
const { unlinkSync } = require('fs')
const { recipes } = require('../../services/LoadRecipes')

module.exports = {
    async index(req, res) {
        try {
            const recipes = await LoadRecipesService.load('recipes')

            return res.render("admin/recipes/index", { recipes })
            
        } catch (error) {
            console.error(error)
        }
    },
    async myRecipes(req, res) {
        try {
            const recipes = await LoadRecipesService.load('recipes', {
                where: {
                    user_id: req.session.userId
                }
            })
    
            return res.render("admin/recipes/my-recipes", { recipes })
            
        } catch (error) {
            console.error(error);
        }
    },
    async create(req, res) {
        try {
            const chefOptions = await Recipe.chefSelectOptions()

            return res.render("admin/recipes/create", { chefOptions })
            
        } catch (error) {
            console.error(error);
        }
    },
    async post(req, res) {
        try {
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
            
        } catch (error) {
            console.error(error);
        }
    },
    async show(req, res) {
        try {
            const recipe = await LoadRecipesService.load('recipe', {
                where: {
                    id: req.params.id
                }
            })

            return res.render("admin/recipes/show", { recipe })

        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const recipe = await LoadRecipesService.load('recipe', {
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
           
            return res.render("admin/recipes/edit", { recipe, chefOptions, files })
            
        } catch (error) {
            console.error(error);
        }
    },
    async put(req, res) {
        try {
            if (req.files.length != 0) {
                const newFilesPromise = req.files.map(file =>
                    File.create({ name: file.filename, path: file.path }))
    
                const files = await Promise.all(newFilesPromise)
               
                const recipesFilesPromise = files.map(fileId => RecipeFile.create({ 
                    recipe_id: req.body.id, file_id: fileId 
                }))
    
                await Promise.all(recipesFilesPromise)
               
            }

            console.log(req.body)
    
            if (req.body.removed_files) {
                // 1,2,3,
                const removedFiles = req.body.removed_files.split(",") // [1,2,3]
                const lastIndex = removedFiles.length - 1
                console.log(lastIndex)
                removedFiles.splice(lastIndex, 1) // [1,2,3]
                
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
            
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        
        const files = await Recipe.files(req.body.id)

        await Recipe.delete(req.body.id) 
     
        files.map(async file => {
            try {
                await File.delete(file.file_id)
                unlinkSync(file.path)
            } catch (err) {
                console.error(err)
            }
        })  
        
        return res.redirect(`/admin/recipes`)
        
    }
}
