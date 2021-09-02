const express = require('express')
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middlewares/validate-request');
const authorize = require('../middlewares/authorize')
const userService = require('../controllers/user.service.js');

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

router.post('/authenticate', authenticateSchema, authenticate);

router.put('/userupdate/:id', updateSchema, update); // authorize(),

module.exports = router;


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}



function registerSchema(req, res, next) {

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

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}
