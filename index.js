const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mongoose = require('mongoose');
require('dotenv').config();
//Routes
const {CategoryRoutes,subCategoryRoutes,productCategoryRoutes}= require('./routes/index.routes');

app.use(CategoryRoutes);
app.use(subCategoryRoutes);
app.use(productCategoryRoutes);
app.all("*", (req, res, next) => {
    res.status(404).json({
        message:"Page not found"
    });
});



mongoose.connect(process.env.DB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
const db = mongoose.connection
db.on("error", () => console.log("ERROR while connecting to DB"))  //code for connecting mongodb
db.once("open", () => {console.log("Connected to mongoDB ")
})


app.listen(8000,()=> 
console.log('Running at localhost:8000 🚀'));