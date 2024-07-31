const { verifyToken } =require('../utils/jwtHandler.js');
const url =require ('../constant/urlConstants.js');
const userServices =require ('../service/user/index.js');

const allowedPaths = [
    url.ping,
    url.login,
    url.register,
]

const authMiddleware = async(req, res, next) =>{
    try{
        if(!allowedPaths.includes(req.url)){
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    statusCode: 401,
                    success: false,
                    error: {
                        message: 'Unauthorized: Token not provided'
                    }
                });
            }

            const response = await verifyToken({token})
            const user = await userServices.getUserById(response.id)
            if (!user) {
                return res.status(401).json({
                    statusCode: 401,
                    success: false,
                    error: {
                        message: 'Authentication failed!'
                    }
                });
            }
            req.user = user
        }
        next()

    }catch(err){
        return res.status(401).json({
            statusCode: 401,
            success: false,
            error: {
                message: err.message
            }
        });
    }
}

module.exports= authMiddleware;
