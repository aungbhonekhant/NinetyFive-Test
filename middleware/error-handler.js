const {CustomAPIError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if(err instanceof CustomAPIError){
        res.status(err.status)
        res.render('error_40x', {error: err})
        // return res.send(`<h1>${err.message}</h1>`)
    }
    err.status = StatusCodes.INTERNAL_SERVER_ERROR
    res.render('error_40x', {error: err})
    // return res.send(`<h1>${err}</h1>`)
}

module.exports = errorHandlerMiddleware