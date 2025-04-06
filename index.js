const express = require('express');
const studentRoute = require('./routes/studentRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();
require('./helpers/init_mongodb');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(studentRoute);
app.use(userRoute);

//handling 404 error

app.use((req, res, next) => {
const err = new Error('Not Found');
err.status = 404
next(err)
});

//error handler

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
});


app.listen(process.env.PORT || 4000, function() {
    console.log('Now listening for requests on: http://localhost:4000');
});

