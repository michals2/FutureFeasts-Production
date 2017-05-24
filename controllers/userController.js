const db = require('../models/database');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

function hashPw(password){
  
   let salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
   var pw = password;
    let hash = bcrypt.hashSync(pw, salt);
       
        return hash;
    
}
const userController = {};
// require user model here later
// ^^^ didnt actually use sequilize. did it raw6969

//POST REQUEST FROM LOGIN:
//verify that username enters username and password
//verify that username exists in users table
//verify that password matches
userController.verifyUser = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log('here')
    if (!username || !password) res.send('Please, enter username AND password');
    else {
        db.conn.query(`SELECT username, password FROM users WHERE username = '${username}';`,
            (error, result) => {
                if (error){ console.log('1st'); res.send(400);}
                else if (!result.rows.length){console.log('2nd'), res.status(400).send('no username found');}
                else {
                    console.log(bcrypt.compareSync(password, result.rows[0].password))
                    if (bcrypt.compareSync(password, result.rows[0].password)) {
                        console.log('success')
                        res.status(200).send('password matches');
                    }
                    else {
                        console.log('3rd')
                        res.status(400).send('wrong password');
                    }
            }
        });
    }
}

//POST REQUEST FROM SIGNUP:
//checks if username already exists in users table
//if username already exists, don't create new user
userController.checkIfUsernameExists = (req, res, next) => {
    let username = req.body.username;
    db.conn.query(`SELECT username FROM users WHERE username = '${username}';`,
        (error, result) => {
            if (result.rows.length) res.status(400).send('username exists already');
            else next();
        });
}

//POST REQUEST FROM SIGNUP (CONTINUED):
//adds username to users table
userController.addToUsersTable = (req, res, next) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let username = req.body.username;
    let password = hashPw(req.body.password);
    //yeah Alyssa did this. goodluck figuring out why. sorrynotsorry
    // if (req.body.healthlabel) {
    //     healthlabel = req.body.healthlabel.reduce((res, curr, i) => { 
    //         res += curr;
    //         if(i<req.body.healthlabel.length-1) res += ', ';
    //         return res;
    //     },'');
    // }
   
    db.conn.query(`INSERT INTO users ("first_name", "last_name", "username", "password")
                   VALUES ('${first_name}', '${last_name}', '${username}', '${password}');`,
                   (error, result) => {
                       if(error) res.status(400).send(error);
                       else next();
                   });
}

//POST REQUEST FROM SIGNUP (CONTINUED):
//create table for each new user when they sign up
// userController.createUserTable = (req, res, next) => {
//     let username = req.body.username;
//     db.conn.query(`CREATE TABLE ${username} (
//                     "_id" SERIAL PRIMARY KEY NOT NULL,
//                     "day" TEXT,
//                     "label" TEXT, 
//                     "image" TEXT, 
//                     "url" TEXT, 
//                     "yield" INT, 
//                     "healthLabels" TEXT[], 
//                     "ingredientLines" TEXT[]
//                  );`,
//         (error, result) => {
//             if (error) res.status(400).send(error);
//             else res.status(200).send('created new table for new user');
//         });
// }

module.exports = userController;