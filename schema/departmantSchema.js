const { body } = require('express-validator');

// *note* ==> this validation is just for demo, in real world project is much be more detail and depth.

const departmantCreateSchema = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name cannot be empty')
];


module.exports = {
    departmantCreateSchema,
}