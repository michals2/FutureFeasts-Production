const db = require('../models/database');

const recipeController = {};
//FUCKING USE THIS ONE
//POST REQUEST FROM RECIPE:
//parse req.body 
//req.body should have: recipe, username, day
//req.body.recipe has shit we dont like. must parse.
recipeController.saveRecipe = (req, res, next) => {
    let day = req.body.day;
    let username = req.body.username;
    let recipe = req.body.recipe.recipe;
    // console.log(recipe)
    if(!day || !username || !recipe) res.status(400).send('please send day username AND recipe');
    else{
        console.log('in saveRecipe have day username and recipe');
        let title = recipe.label;
        let ingredients = recipe.ingredientLines;
        let url = recipe.url;
        let nutrition_info = recipe.totalNutrients;
        let health_tag = recipe.healthLabels;
        let img_url = recipe.image;
        // let _yield = recipe.yield;//yield is a reserved word in javascript
        // console.log(label)






        db.conn.query(`INSERT INTO recipes ("title", "ingredients", "url", "health_tag", "img_url")
                       VALUES ('${title}', ARRAY['${ingredients}'], '${url}', ARRAY['${health_tag}'], '${img_url}');`,
                   function (error, result) {
                       console.log('result -->', result)
                       if(error) res.status(400).send(error);
                       else {
                        //    console.log('result -->', result)
                        //    db.conn.query(`SELECT r_id FROM recipes WHERE url = ${url}`, (error, result) => {
                        //        console.log("r_id", result);
                        //    });
                            
                           res.status(200).send(`saved to table recipes`);
                       }
                   });
    }
}

module.exports = recipeController;