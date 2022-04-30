require('dotenv').config();
const express = require('express');
const createHttpErrors = require('http-errors');
const morgan = require('morgan');


const app = express();

//db connect
const connectDB = require('./db/connect');



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