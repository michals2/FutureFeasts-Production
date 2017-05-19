const db = require('../models/database');

const userController = {};
//require user model here later 

userController.verifyUser = (req, res, next) => {
    //get body from req
    //check in database for username
    //verify that password matches
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        res.send('Please, enter username AND password');
    }
    else {
        db.conn.query(`SELECT username, password FROM users WHERE username = '${username}';`, (error, result) =>{
            console.log(result);
            if(error) res.send(error);
            else if (!result.rows.length) res.status(400).send('no username found');
            else {
                if (password === result.rows[0].password) {
                    console.log('password matches');
                    res.sendStatus(200);
                }
                else {
                    res.status(400).send('wrong password');
                }
           }
        });

    }
}

userController.checkIfUsernameExists = (req, res, next) => {
    let username = req.body.username;
    db.conn.query(`SELECT username FROM users WHERE username = '${username}';`, (error, result) => {
        if (result.rows.length) res.send('username exists already');
        else next();
    });
}

userController.addToUsersTable = (req, res, next) => {
    //get body from req
    //add that user to the users table
    //create a new table for that user. will have to use query with a string
    console.log('in addtouserstable');
    let username = req.body.username;
    let password = req.body.password;
    let healthlabel = '';
    //yeah Alyssa did this. goodluck figuring out why. sorrynotsorry
    if (req.body.healthlabel) {
        healthlabel = req.body.healthlabel.reduce((res, curr, i) => { 
            res += curr;
            if(i<req.body.healthlabel.length-1) res += ', ';
            return res;
        },'');
    }
    db.conn.query(`INSERT INTO users ("username", "password", "healthlabel")
                   VALUES ('${username}', '${password}', ARRAY['${healthlabel}']);`,
                   (error, result) => {
                       if(error) console.log(error);
                       else res.send('saved to database');
                   });
    next();
}

userController.createUserTable = (req, res, next) => {
    console.log('in createusertable');
    let username = req.body.username;
    //db.conn.query()
    //CREATE TABLE users ( _id SERIAL PRIMARY KEY NOT NULL, day TEXT, label TEXT, TEXT[] );
}
module.exports = userController;