// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed, entered data is incorrect');

        error.statusCode = 422;

        throw error;
    }
    const { email, name, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                email,
                password: hashedPw,
                name,
            });
            return user.save();
        })
        .then(result => {
            res
                .status(201)
                .json({
                    message: 'User created',
                    userId: result._id,
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        });
};