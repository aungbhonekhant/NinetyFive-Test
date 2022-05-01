const createHttpError = require('http-errors')
const notFount = (req, res, next) => {
    res.status(404)
    const error = {
        status: 404,
        message: 'Sorry, an error has occured, Requested page not found!'
    }
    res.render('error_40x', {error})
}

module.exports = notFount