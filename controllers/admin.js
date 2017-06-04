var db = require('./database.js');
var  response = {};

exports.addAdmin = function(req, res){
    var  response = {};
    var params = req.body;

    db.insert("user", params, function(err, result){

        if(err)return res.status(500).json(response.message = err);
        return res.status(201).json(response.message = result);
    })

}


exports.authenticate = function(req, res){
    var  response = {};
    var params = req.body;
    var query = "SELECT * FROM USER WHERE USERNAME = '"+params.username+"' AND PASSWORD = '"+params.password+"'";
    db.getData(query, null, function(err, results){
        if(err)return res.status(500).json(response.message = err);
        console.log(results.length);
        if(results.length > 0){
            return res.status(201).json(response.message = results);
        }else{
            return res.status(404).json(response.message = "Invalid User ID / Password");
        }

    });
}