const pg = require('pg');

const db = {};

const uri = 'postgres://iqcfglex:QJFosUbB8ha39eYi2V8rm5v3ekSq2vQ7@stampy.db.elephantsql.com:5432/iqcfglex';


pg.connect(uri, (error, db_) => {
    console.log('database connected');
    if(error) console.log(error);
    db.conn = db_;
})

module.exports = db;