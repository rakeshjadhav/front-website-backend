'use strict';
const User = require('../models/user.model');
const validator = require('../helpers/validate');


exports.regsiter = function(req, res) {

const new_user = new User(req.body);

if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.send({ error:true, message: 'Please provide all required field' });
}else{
    
  const validationRule = {
      "user_firstname": "required",
      "user_lastname": "required|string",
      "user_email": "required|email", //exist:Users,user_email
      "username" : "required|string",
      "password": "required|string|min:6",
      "gender": "string", 
  }
  
  validator(req.body, validationRule, {}, (err, status) => {
  
    if (!status) {
      
       res.send({ error:false, message: "Validation failed",data:err});
  } else {
    User.regsiter(new_user,function(err, user) {

      if (err){
        res.send({err:err});
     }else{
      res.send({ error:true, message: "Registered successfully !!!",data:user});
        
     }
    });
  }
  }); 
}
};


exports.login = function(req, res) {

  const login_user = new User(req.body);
  
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.send({ error:true, message: 'Enter Username and Password !!!' });
  }else{
      
    const validationRule = {
        "username" : "required|string",
        "password": "required|string|min:6",
    }
    
    validator(req.body, validationRule, {}, (err, status) => {
    
      if (!status) {
        res.send({ error:false, message: "Enter Username and Password !!!",data:err});
    } else {
      User.login(login_user,function(err, user) {
        if (err){

           res.send({err:err});
        }else{
           if(user.length > 0){
            res.send({ error:true, message: "You Have Successfully Logged in!!!",data:user});
           }else{
            res.send({ error:false, message: "Invalid credentials. Please try again. !!" });
           }
        }
      });
    }
    }); 
  }
  };
  




exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
  // if (err)
  // res.send(err);
  // res.json(user);
  if (err){
    res.send({err:err});
 }else{
    if(user.length > 0){
     res.send({ error:true, message: "User Data Found",data:user});
    }else{
     res.send({ error:false, message: "Invalid  Please try again. !!" });
    }
 }
});
};

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    User.update(req.params.id, new User(req.body), function(err, user) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'User successfully updated' });
});
}
};



exports.findAll = function(req, res) {
  User.findAll(function(err, user) {
console.log('controller')
if (err)
res.send(err);
console.log('res', user);
res.send(user);
});
};


exports.delete = function(req, res) {
    User.delete( req.params.id, function(err, user) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'User successfully deleted' });
});
};