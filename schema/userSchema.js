const { body, validationResult } = require('express-validator');

// *note* ==> this validation is just for demo, in real world project is much be more detail and depth.

const userRegSchema = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase(),
    body('password')
        .trim()
        .isLength({ min: 6, max:12 })
        .withMessage('Password length short or too long, min 6 and max 12 char required'),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password do not match');
        }
        return true;
  }),
];

const userLoginSchema = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase(),
    body('password')
        .trim()
]

module.exports = {
    userRegSchema,
    userLoginSchema
}