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
  // this.salary         = user.salary;
  // this.status         = user.status ? user.status : 1;
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
  const password = newEmp.password;

  dbConn.query("Select * from users where username = ? and password ", [username,password], function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }else{
     console.log(res);
    result(null, res);
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
dbConn.query("UPDATE users SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
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


User.statics = {
  valueExists(query) {
    console.log(query);
      return this.findOne(query).then(result => result);
  }
};



// module.exports = mongoose.model('User', UserSchema);
module.exports= User;