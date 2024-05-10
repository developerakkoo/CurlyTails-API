require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const swaggerJsDoc = require('swagger-jsdoc'); 
const swaggerUi =  require('swagger-ui-express');
const basicAuth = require('express-basic-auth');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const path= require('path');
app.use( express.static('public'));
app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use(helmet());
//Api docs setup
const users = { 'developer@techlapse.in': 'pass@1234' };

app.use('/api-docs', basicAuth({
    users,
    challenge: true,
    unauthorizedResponse: 'Unauthorized',
}));


const options = {
    definition: {
    openapi: "3.0.0",
    info: {
        title: "Curlytails",
        version: "0.1.0",
        description:
        "Curlytails Api Docs",
        contact: {
        name: "Developer",
        email: "developer@techlapse.in",
        },
    },
    servers: [
    // {
    //     url: "https://api.curlytails.co.in/",
    //     description: "Live server"
    // },
    {
        url: "http://localhost:8000/",
        description: "Local server"
    },
    ],
},
    apis: ["./Routes/*.js"],
};

/* This code block is setting up Swagger documentation for the API. */
const specs = swaggerJsDoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
const {verifyToken} = require('./middleware/jwtVerify');
const {CategoryRoutes,NotificationRoutes,RefundRoutes,OrderRoute,CartRoutes,verifyRoute,ProductRoutes,subCategoryRoutes,PharmacyRoutes,ConsultantRoutes,BannerRoutes,productCategoryRoutes,BlogRoutes,AdminRoutes,UserRoutes}= require('./routes/index.routes');
app.use(cors());
app.use(UserRoutes);
app.use(AdminRoutes);
// app.use(verifyRoute);
// app.use(verifyToken);
app.use(ProductRoutes);
app.use(CategoryRoutes);
app.use(subCategoryRoutes);
app.use(BannerRoutes);
app.use(BlogRoutes);
app.use(ConsultantRoutes);
app.use(PharmacyRoutes);
app.use(productCategoryRoutes);
app.use(CartRoutes);
app.use(OrderRoute);
app.use(RefundRoutes);
app.use(NotificationRoutes);

app.all("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

/* The code block `app.use(function (req, res, next) { ... });` is setting up CORS (Cross-Origin
Resource Sharing) headers in your Express application. */
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
})    .then((result) => {
    const server = app.listen(8000);
    console.log("🌼... App Ruining http://localhost:8000")
    const io = require("./socket").init(server);  
    io.on("connection", (socket) => {
        console.log("Connected a User");
        socket.on("disconnect", () => {
        console.log("User Disconnected");
        });
    });
    }).catch((err) => {
    console.log(err);
    });