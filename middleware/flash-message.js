const flashMsg = (req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.user = req.user;
    next();
}

module.exports = flashMsg