var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'manasa',
    database: 'capgemini',
    connectionLimit: 100,
    supportBigNumbers: true
});


exports.insert = function(tableName,arr, callback){
    var sql = "INSERT into "+tableName+" SET ?";
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.update = function(tableName,arr,whereParam, callback){
    var sql = "UPDATE  "+tableName+" SET ? WHERE sku='"+whereParam+"'";
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.getData = function(query,arr, callback){
    var sql = query;
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};