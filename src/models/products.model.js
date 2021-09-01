'use strict';
var dbConn = require('../../config/db.config');

//object create

var Products= function(product){
  this.product_id     = product.product_id;
  this.product_name     = product.product_name;
  this.price = product.price;
  this.createdAt     = new Date();
  this.updatedAt     = new Date();
};


Products.findAll = function (result) {
    dbConn.query("Select * from products", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('users : ', res);
      result(null, res);
    }
    });
    };


// module.exports = mongoose.model('User', UserSchema);
module.exports= Products;