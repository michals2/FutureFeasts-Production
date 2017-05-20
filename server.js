const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/login', userController.verifyUser);
app.post('/signup', userController.checkIfUsernameExists, 
                    userController.addToUsersTable, 
                    userController.createUserTable);
app.post('/recipeDisplay', recipeController.saveRecipe);

app.listen(3000);