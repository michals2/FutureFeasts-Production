const pg = require('pg');

const db = {};
<<<<<<< HEAD
const uri = 'postgres://@localhost/futuremeals';
=======
const uri = 'postgres://localhost/futuremeals';
>>>>>>> d532898574575a5ff295b736eda95c341bc2c4a9

pg.connect(uri, (error, db_) => {
    console.log('database connected');
    if(error) console.log(error);
    db.conn = db_;
})

module.exports = db;