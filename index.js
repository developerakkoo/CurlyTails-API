const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const path= require('path');
app.use( express.static('public'));
app.use("/public", express.static(path.join(__dirname, "public")));

require('dotenv').config();
//Routes

const {CategoryRoutes,CartRoutes,verifyRoute,ProductRoutes,subCategoryRoutes,PharmacyRoutes,ConsultantRoutes,BannerRoutes,productCategoryRoutes,BlogRoutes,AdminRoutes,UserRoutes}= require('./routes/index.routes');
app.use(cors());
app.use(UserRoutes);
app.use(AdminRoutes);
app.use(ProductRoutes);
app.use(CategoryRoutes);
app.use(subCategoryRoutes);
app.use(BannerRoutes);
app.use(BlogRoutes);
app.use(ConsultantRoutes);
app.use(PharmacyRoutes);
app.use(productCategoryRoutes);
app.use(verifyRoute);
app.use(CartRoutes);

app.all("*", (req, res, next) => {
    res.status(404).json({
        message:"Page not found"
    });
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
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