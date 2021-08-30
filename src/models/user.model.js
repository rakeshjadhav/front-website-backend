'use strict';
var dbConn = require('../../config/db.config');

//User object create
var User = function(user){
  this.user_firstname     = user.user_firstname;
  this.user_lastname      = user.user_lastname;
  this.user_email          = user.user_email;
  this.username          = user.username;
  this.password   = user.password;
  this.gender    = user.gender;
  this.ori_password         = user.ori_password;
  // this.status         = user.status ? user.status : 1;
  this.createdAt     = new Date();
  this.createdAt     = new Date();
};

var Lastuser = function(lastuser){
  this.user_id     = user.user_id;
  this.user_access_token     = user.user_access_token;
  this.insert_dt     = new Date();
  this.update_dt     = new Date();
};

User.regsiter = function (newEmp, result) {
dbConn.query("INSERT INTO users set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

User.login = function (newEmp, result) {

  const username = newEmp.username;
  const password = newEmp.ori_password;

  dbConn.query("Select * from users where username = ? and ori_password = ? ", [username,password], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }else{
     console.log(res);
    result(null, res);
  }
  });
  };

  

  Lastuser.lastLogin = function (login_details, result) {
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


User.findById = function (id, result) {
dbConn.query("Select * from users where user_id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};

User.findOne = function (username) {
  dbConn.query("Select * from users where username = ? ", username, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  }
  });
  };



User.findAll = function (result) {
dbConn.query("Select * from users", function (err, res) {
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
User.update = function(id, user, result){
dbConn.query("UPDATE users SET user_firstname=?,user_lastname=?,user_email=?,gender=? WHERE user_id = ?", [user.user_firstname,user.user_lastname,user.user_email,user.gender, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err,null );
}else{
  result(null, res);
}
});
};



User.delete = function(id, result){
dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};


User.valueExists = function (name, result) {
  const username = name;
  dbConn.query("Select * from users where ?",[username], function (err, res) {
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
module.exports= User;