const db = require('../models/database');

const recipeController = {};

//POST REQUEST FROM RECIPE:
//parse req.body 
//req.body should have: recipe, username, day
//req.body.recipe has shit we dont like. must parse.
recipeController.saveRecipe = (req, res, next) => {
    let day = req.body.day;
    let username = req.body.username;
    let recipe = req.body.recipe;
    if(!day || !username || !recipe) res.status(400).send('please send day username AND recipe');
    else{
        console.log('in saveRecipe have day username and recipe');
        let label = req.body.recipe.label;
        let image = req.body.recipe.image;
        let url = req.body.recipe.url;
        let _yield = req.body.recipe.yield;//yield is a reserved word in javascript
        let healthLabels = req.body.recipe.healthLabels;
        let ingredientLines = req.body.recipe.ingredientLines;
        db.conn.query(`INSERT INTO ${username} ("day", "label", "image", "url", "yield", "healthLabels", "ingredientLines")
                       VALUES ('${day}', '${label}', '${image}', '${url}', '${_yield}', ARRAY['${healthLabels}'], ARRAY['${ingredientLines}']);`,
                   (error, result) => {
                       if(error) res.status(400).send(error);
                       else res.status(200).send(`saved to table ${username}`);
                   });
    }
}

module.exports = recipeController;