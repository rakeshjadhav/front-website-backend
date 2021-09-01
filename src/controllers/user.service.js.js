

﻿const config = require('../../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const db = require('../../config/db.config');
// const User = require('../models/dbuser.model')
const db = require('../../config/db');
module.exports = {
    // authenticate,
    // getAll,
    // getById,
    create,
    // update,
    // delete: _delete
};

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}