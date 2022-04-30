require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const MongoStore = require("connect-mongo")
const flashMsgMiddleware = require('./middleware/flash-message');



//initialization
const app = express();
app.use(morgan('dev'))

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// 
// const MongoStore = connectMongo(session);

// init session
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // secure: true,
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
      })
    })
  );

//passport js Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./Utils/passport.auth');


app.use(connectFlash())
app.use(flashMsgMiddleware);
//db connect
const connectDB = require('./db/connect');

//rooter



//error hadler
const notFountMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const isAdmin = require('./middleware/isAdmin');

//routes
app.use('/', require('./routes/index.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/user', require('./routes/user.route'))
app.use('/admin',isAdmin, require('./routes/admin.route'))
app.use('/department',isAdmin, require('./routes/department.route'))

//middleware
app.use(notFountMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>{
            console.log(`Server is listen on port ${port}...`);
        });
        
    } catch (error) {
        console.log(error)
    }
}

start();
