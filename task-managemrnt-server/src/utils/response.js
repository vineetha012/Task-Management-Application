function send(result,res){
    let statusCode = result.statusCode || 200;
    let data = {
        statusCode: statusCode,
        success: true,
        message: result.message,
        data: result.data
    };
    return res.status(statusCode).send(data);
}
module.exports={send}