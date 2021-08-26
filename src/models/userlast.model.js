'use strict';
var dbConn = require('../../config/db.config');

//User object create

var Userlast= function(userlast){
  this.user_id     = userlast.user_id;
  this.user_access_token     = userlast.user_access_token;
  this.insert_dt     = new Date();
  this.update_dt     = new Date();
};


Userlast.lastLogin = function (login_details, result) {
    dbConn.query("INSERT INTO user_last_login set ?", login_details, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }else{
      console.log(res.insertId);
      result(null, res.insertId);
    }
    });
    };

// module.exports = mongoose.model('User', UserSchema);
module.exports= Userlast;