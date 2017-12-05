var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test');      // open the database

var db = new sqlite3.Database('database');

db.serialize(function () {
    // db.run('CREATE TABLE lorem (info TEXT)');
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

    for (var i = 10; i < 15; i++) {
        stmt.run('Ipsum ' + i)
    }

    stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
        console.log(row.id + ': ' + row.info)
    })
});

//update
db.serialize(function(){
    var updateSQL = 'update account set flag = 2 where ac_id = “015”';
    db.run(updateSQL, function(err){
        if(err){

        }else{

        }
    })
});

//select
db.serialize(function(){
    // Database#each(sql, [param, ...], [callback], [complete])
    var selectSQL = '';
    db.each(selectSQL, function(err,row){

    }, function(err, number){
        if(number==0){

        }
    })
});

db.close();