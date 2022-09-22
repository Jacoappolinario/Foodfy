const Chefs = require('../models/admin/Chefs')
const Recipe = require('../models/admin/Recipes')


async function getImages(recipeId) {
    let files = await Recipe.files(recipeId)
    files = files.map(file => ({
        ...files,
        src: `${file.path.replace("public", "")}`
    }))

    return files
}

async function getChef(chefId) {
    let chef = await Chefs.find(chefId)
    return chef
}

async function format(recipe) {
    const chef = await getChef(recipe.chef_id)
    recipe.author = chef.name

    const files = await getImages(recipe.id)
    recipe.img = files[0].src
    recipe.files = files
    recipe.file_id = files.id

    return recipe
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async recipe() {
        try {
            const recipe = await Recipe.findOne(this.filter)
            return format(recipe)

        } catch (error) {
            console.error(error)
        }
    },
    async recipes() {
        try {
            const recipes = await Recipe.findAll(this.filter)
            const recipesPromise = recipes.map(format)
            return Promise.all(recipesPromise)

        } catch (error) {
            console.error(error)
        }
    },
    format,
}

module.exports = LoadService

