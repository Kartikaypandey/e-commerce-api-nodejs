require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

/// Connect to database
const connectDB = require('./db/connect')

/// Morgan
const morgan = require('morgan')
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

/// Cookie - parser 
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');



/// Import routers
const authRouter = require('./routes/auth_route');
const userRouter = require('./routes/userRouters');
const productRouter = require('./routes/prodcutRoute');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoute');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const PORT = process.env.PORT || 3000;


/// Middlewares 
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'));
app.use(express.json());
/// Cookie Parser Middleware -> browser will parse the cookie
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

/// Dummy routes

/// Routes Middlewares 
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/orders',orderRouter);

app.use(notFoundMiddleware);
// if a route throws error then it will be invoked
app.use(errorHandlerMiddleware);




const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Listening to port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();