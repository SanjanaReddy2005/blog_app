const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")

//dotenv config
dotenv.config({path: "../.env"});

//router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//MongoDB connection
connectDB();

// middelwares
app.use(cors());
app.use(express.json({"pathe" : ".env"}))
app.use(morgan('dev'))

//routes
app.get('/',(req,res)=>{
    res.status(200).json({
        "message": "server is rendering",
    })
    
})
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/blog', blogRoutes);

//port and and devmode
const PORT = process.env.PORT || 8000;


// listen
app.listen(8000,() => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode port no ${PORT}`)
})