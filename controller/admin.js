const data = require("../data.json")
const fs = require('fs')

// Admin Index
exports.index = function(req, res) {
    return res.render("admin/index", { recipes: data.recipes })
}
// Admin Create
exports.create = function(req, res) {
    return res.render("admin/create")
}
// Admin Show 
exports.show = function(req, res) {
    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes) {
        return recipes.id == id
    })

    if (!foundRecipes) return res.send("Recipe not found!")


    return res.render("admin/show", { recipe: foundRecipes })
}
// Edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes) {
        return recipes.id == id 
    })

    if (!foundRecipes) return res.send("Recipe not found!")

    return res.render("admin/edit", { recipe: foundRecipes })
}


// Admin Post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Fill in the fields")
        }
    }

    let { image, ingredients, preparation, information } = req.body

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]
    
    if (lastRecipe) {
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        image,
        ingredients,
        preparation,
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect(`/admin/recipes/${id}`)
    })

} 
// Put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    
    const foundRecipes = data.recipes.find(function(recipes, foundIndex) {
        if (id == recipes.id) {
            index = foundIndex
            return true
        }
    })


    if (!foundRecipes) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipes,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe
    

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect(`/admin/recipes/${id}`)
    })
}
// Edit
exports.delete = function(req, res) {
    const { id } = req.body

    const filtered = data.recipes.filter(function(recipes) {
        return recipes.id != id
    })

    data.recipes = filtered

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}