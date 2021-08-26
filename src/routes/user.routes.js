const express = require('express')
const router = express.Router()

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
router.get('/', userController.findAll);

// Delete a uses with id
router.delete('/:id', userController.delete);

module.exports = router