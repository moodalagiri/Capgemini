var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../controllers/database.js');
var product = require('../controllers/product.js');
var admin = require('../controllers/admin.js');

router.use(function(req, res, next) {
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/product', product.addProduct)
      .get('/product/:role_id', product.getProducts)
      .put('/product/:role_id/:sku', product.updateProduct)
      .delete('/product/:role_id/:sku', product.deleteProduct)
      .post('/checkout', product.checkOut)
      .post('/add', admin.addAdmin)
      .post('/authenticate', admin.authenticate);



module.exports = router;