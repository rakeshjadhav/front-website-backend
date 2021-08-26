'use strict';
const User = require('../models/user.model');
const validator = require('../helpers/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.regsiter = async function(req, res) {

const new_user = new User(req.body);
const salt = await bcrypt.genSalt(10);
const hashPassword  = await bcrypt.hash(new_user.password, salt)
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.send({ error:true, message: 'Please provide all required field' });
}else{
    
  const validationRule = {
      "user_firstname": "required",
      "user_lastname": "required|string",
      "user_email": "required|email", //exist:Users,user_email
      "username" : "required|string",
      "password": "required|string|min:6",
      "gender": "required|string", 
  }
  
  validator(req.body, validationRule, {}, (err, status) => {
  
    if (!status) {
      
       res.send({ error:false, message: "Validation failed",data:err});
  } else {
      
      

      const rdata = new User (
        {
          user_firstname : new_user.password,
          user_lastname : new_user.user_lastname,
          user_email : new_user.user_email,
          username : new_user.username,
          ori_password :  new_user.password,
          password : hashPassword,
          gender : new_user.gender,
        }
      )
    User.regsiter(rdata,function(err, user) {

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


exports.login = async function(req, res) {

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
       
        const hashPassword = "";
        const findu = new User ({
          username : login_user.username,
        })

    //   const UserI = User.findOne(findu,function(err, user) {
    //   if(UserI) {
    //     const hashPassword = UserI.username; 
    //   }else{

    //   }
    // });
      const loginrdata = new User (
        {
          username : login_user.username,
          ori_password : login_user.password,
        }
      )
      User.login(loginrdata,function(err, user) {
        if (err){
           res.send({err:err});
        }else{
           if(user.length > 0){
            // const insert_dt     = new Date();
            // const update_dt     = new Date();
            // const login_details = [[1, 'crome',insert_dt,update_dt]];
            // User.lastLogin(login_details,function(err, user) {
            //   if (err){
            //     res.send({err:err});
            //  }else{
            //   res.send({ error:true, message: "data",data:user});
                
            //  }  
            // });
            const token  = jwt.sign({id:user._user_id},'secret');
            res.cookie('jwt',token,  {
                httpOnly : true,
                maxAge:24*60*60*1000 // 1 day
            })

            res.send({ error:true,token :token, message: "You Have Successfully Logged in!!!",data:user});
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
    res.send({ error:true, message: 'Please provide all required field' });
  }else{

    const validationRule = {
      "user_firstname": "required",
      "user_lastname": "required|string",
      "user_email": "required|email", //exist:Users,user_email
      "gender": "string", 
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {    
      res.send({ error:false, message: "Validation failed",data:err});
      } else {
        User.update(req.params.id, new User(req.body), function(err, user) {
          if (err){
            res.send({err:err});
          }else{
          res.send({ error:true, message: "Update successfully !!!",data:req.body});
            
          }
   });
 }
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