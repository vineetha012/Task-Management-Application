const defaultMessage = 'something went wrong'
const statusCodes={
    badRequest:400,
    unAuthorized:401,
    forbidden:403,
    notFound:404,
    internalServerError:500

}
class ErrorHandler {
    constructor() { }
    responseObj(
        statusCode, err
    ) {
        const error = (err instanceof Error || err instanceof RangeError || err instanceof ReferenceError || err instanceof SyntaxError || err instanceof TypeError || err.statusCode) ? err : new Error(err.message ? err.message : err);
        const response = {
            statusCode: statusCode,
            message: err.message || defaultMessage,
            stack: error.stack || ''
        }
        return Promise.reject(response)
    }
    badRequest(error){
        return this.responseObj(statusCodes.badRequest, error)
    }
    unAuthorized(error){
        return this.responseObj(statusCodes.unAuthorized, error)
    }
    forbidden(error) {
        return this.responseObj(statusCodes.forbidden, error)
    }
    notFound(error) {
        return this.responseObj(statusCodes.notFound, error)
    }
    internalServerError(error) {
        return this.responseObj(statusCodes.internalServerError, error)
    }
}
module.exports=new ErrorHandler()