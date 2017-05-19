const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));

app.post('/login', userController.verifyUser);
app.post('/signup', userController.createUser);

app.listen(3000);