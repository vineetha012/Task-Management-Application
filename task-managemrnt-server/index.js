const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes/index')
const ErrorHandler=require('./src/middleware/errorMiddleware')
const connectDb = require('./src/db/index')
const config = require('./src/config')
const loggerMiddleware = require('./src/middleware/logger');
const authMiddleware=require('./src/middleware/authMiddleware')
const cors=require('cors')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(loggerMiddleware);
const corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions))

connectDb()
app.use(authMiddleware);

Object.keys(routes).forEach((route) => {
    app.use('/', routes[route])
})

app.use('*', (req, res, next) => {
    const error = new Error('URL Not Found!');
    error.statusCode = 404;
    next(error);
});
app.use(ErrorHandler)

app.listen(config.PORT, () => console.log(`magic happends on ${config.PORT}`))
