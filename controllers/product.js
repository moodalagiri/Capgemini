var db = require('./database.js');
var  response = {};
exports.addProduct = function(req, res){
    var  response = {};
    var params = req.body;
    var findProduct = "SELECT * FROM PRODUCTS WHERE SKU=?";
    db.getData(findProduct, params.sku, function(err, result){
        if(err) return res.status(500).json(response.message = err);

        if(result.length ==0){
            db.insert("products", params, function(err, result){

                if(err)return res.status(500).json(response.message = err);
                return res.status(201).json(response.message = result);
            })
        }else{
            params.quantity += result[0].quantity;
            db.update("products", params, params.sku, function(err, results){
                if(err)return res.status(500).json(response.message = err);
                return res.status(200).json(response.message = results);
            })
        }
    })

}

exports.getProducts =  function(req, res){
    var role = req.params.role_id;
    var query;
    if(role == 1){
        query = "SELECT * FROM PRODUCTS";

    }else{
        query = "SELECT * FROM PRODUCTS WHERE VALID = 'Y'";

    }

    db.getData(query, null, function(err, results){
        if(err)return res.status(500).json(response.message = err);
        return res.status(200).json(response.message = results);
    });

}

exports.updateProduct = function(req, res){
    var role = req.params.role_id, sku = req.params.sku;
    var updates = req.body;
    if(role != 1){
        res.status(500).json(response.message = "You do not have permissions to update");
    }

    db.update("products", updates, sku, function(err, results){
        if(err)return res.status(500).json(response.message = err);
        return res.status(202).json(response.message = results);
    })

}

exports.deleteProduct = function(req, res){
    var role = req.params.role_id, sku = req.params.sku;
    if(role != 1){
        res.status(500).json(response.message = "You do not have permissions to delete");
    }

    db.update("products", { "valid" : "N"}, sku, function(err, results){
        if(err)return res.status(500).json(response.message = err);
        return res.status(200).json(response.message = results);
    })
}

exports.checkOut = function(req, res){
    var  response = {};
    var params = req.body;
    var findProduct = "SELECT * FROM PRODUCTS WHERE SKU=?";
    db.getData(findProduct, params.sku, function(err, result){
        if(err) return res.status(500).json(response.message = err);

        if(!result[0].quantity > 0){
                return res.status(200).json(response.message = "Insufficient quantity");
        }else{

            if(params.quantity > result[0].quantity){
                return res.status(200).json(response.message = "Insufficient quantity");
            }
            params.quantity = result[0].quantity - params.quantity;
            db.update("products", params, params.sku, function(err, results){
                if(err)return res.status(500).json(response.message = err);
                return res.status(202).json(response.message = results);
            })
        }
    })

}

exports.addAdmin =  function(req, res){
    var  response = {};
    var params = req.body;
    var findProduct = "SELECT * FROM USER WHERE username=?";
    db.getData(findProduct, params.username, function(err, result){
        if(err) return res.status(500).json(response.message = err);

        if(result.length ==0){
            db.insert("user", params, function(err, result){

                if(err)return res.status(500).json(response.message = err);
                return res.status(200).json(response.message = result);
            })
        }else{
            return res.status(500).json(response.message = "Duplicate Username");

        }
    })

}