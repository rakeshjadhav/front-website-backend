const express = require('express')
const router = express.Router();
const Joi = require('joi');
const userService = require('../controllers/user.service.js');
const validateRequest = require('../middlewares/validate-request');
const userController =   require('../controllers/user.controller');

// regsiter a new users
router.post('/regsiter', userController.regsiter);

// login a new users
router.post('/login', userController.login);

// Retrieve a single user with id
router.get('/get_profile/:id', userController.findById);

// Update a user with id
router.put('/update_profile/:id', userController.update);


// Retrieve all users
router.get('/products', userController.findAll);

// Delete a uses with id
router.delete('/:id', userController.delete);


// new api
router.post('/register', registerSchema, register);

module.exports = router;



function registerSchema(req, res, next) {
     console.log(req.body);
    const schema = Joi.object({
        user_firstname: Joi.string().required(),
        user_lastname: Joi.string().required(),
        user_email :Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}
