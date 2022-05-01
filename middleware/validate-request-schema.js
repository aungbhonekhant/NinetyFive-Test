const { validationResult } = require('express-validator');

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      req.flash('danger', error.msg);
    })
    // res.render('register', {data: req.body, messages: req.flash()})
    return res.redirect('back');
  }
  next();
}

module.exports = validateRequestSchema;
