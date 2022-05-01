const { body } = require('express-validator');

// *note* ==> this validation is just for demo, in real world project is much be more detail and depth.

const userUpdateSchema = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase(),
];


module.exports = {
    userUpdateSchema,
}