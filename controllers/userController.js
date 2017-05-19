const db = require('../models/database');

const userController = {};
//require user model here later 

userController.verifyUser = (req, res, next) => {
    //get body from req
    //check in database for username
    //verify that password matches
    //???make react render the main page.
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        res.send('Please, enter username AND password');
    }
    else {
        db.conn.query(`SELECT username, password FROM users WHERE username = '${username}';`, (error, result) =>{
            if(error) console.log(error);
            else {
                res.send('found user');
           }
        });

    }
}

userController.createUser = (req, res, next) => {
    //get body from req
    //add that user to the users table
    //create a new table for that user. will have to use query with a string
    let username = req.body.username;
    let password = req.body.password;
    //yeah Alyssa did this. goodluck figuring out why. sorrynotsorry
    let healthlabel = req.body.healthlabel.reduce((res, curr, i) => { 
        res += curr;
        if(i<req.body.healthlabel.length-1) res += ', ';
        return res;
    },'');
    db.conn.query(`INSERT INTO users ("username", "password", "healthlabel") VALUES ('${username}', '${password}', ARRAY['${healthlabel}']);`, (error, result) => {
                       if(error) console.log(error);
                       else res.send('saved to database')
                   });
}

module.exports = userController;