module.exports= function (err, req, res, next) {
    let statusCode = err.statusCode || err.status || 500;
    let error = (err.message) ? {
        message: err.message
    } : err;

    let data = {
        statusCode: statusCode,
        success: false,
        error: error
    }
    res.status(statusCode).send(data);
}