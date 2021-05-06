const Chefs = require('../../models/admin/Chefs')
const File = require('../../models/file/File')
const LoadRecipesService = require('../../services/LoadRecipes')
const { unlinkSync } = require('fs')


module.exports = {
    async index(req, res) {
        try {
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

            const lastAdded = await Promise.all(chefsPromise)
            
            return res.render("admin/chefs/index", { chefs: lastAdded })
            
        } catch (error) {
            console.error(error);
        }
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    async post(req, res) {
        try {
            let file = req.files.map(file => File.create({ name: file.filename, path: file.path}))
            const file_id = await Promise.all(file)

            const chefId = await Chefs.create({
                    name: req.body.name,
                    file_id
            })
            
            return res.redirect(`/admin/chefs/${chefId}`)
            
        } catch (error) {
            console.error(error);
        }
    },
    async show(req, res) {
        try {
            const chef = await Chefs.findOne({ where: {id: req.params.id} })
    
            let files = await Chefs.files(chef.id)
            files = {
                ...files,
                src: `${req.protocol}://${req.headers.host}${files[0].path.replace("public", "")}`
            }
    
            const recipes = await LoadRecipesService.load('recipes', {
                where: {
                    chef_id: chef.id
                }
            })
    
            chef.total_recipes = recipes.length
    
            return res.render("admin/chefs/show", { chef, recipes, files })
            
        } catch (error) {
            console.error(error);
        }
    },
    async edit(req, res) {
        try {
            const chef = await Chefs.findOne({ where: {id: req.params.id} }) 
        
            let files = await Chefs.files(chef.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            const recipes = await LoadRecipesService.load('recipes', {
                where: {
                    chef_id: chef.id
                }
            })
    
            chef.total_recipes = recipes.length

            return res.render("admin/chefs/edit", { chef, files })
            
        } catch (error) {
            console.error(error);
        }  
    },
    async put(req, res) {
        try {
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
            
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        try {
            const avatar = await Chefs.files(req.body.id)

            unlinkSync(avatar[0].path)
              
            await Chefs.delete(req.body.id)
            await File.delete(avatar[0].file_id)
            
            return res.redirect(`/admin/chefs`)
            
        } catch (error) {
            console.error(error);
        }       
    }
}