require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));
const morganMiddleware = require("./logger/morgan.logger");
const { errorHandler } = require("./middleware/errorHandler.middleware");

//Routes
app.use(helmet());
const { BASE_URL } = require("./constant");
app.use(cors());
//Api docs setup
const users = { "developer@techlapse.in": "pass@1234" };

app.use(
    "/api-docs",
    basicAuth({
        users,
        challenge: true,
        unauthorizedResponse: "Unauthorized",
    }),
);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Curlytails",
            version: "0.1.0",
            description: "Curlytails Api Docs",
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
                description: "Local server",
            },
        ],
    },
    apis: ["./Routes/*.js"],
};

/* This code block is setting up Swagger documentation for the API. */
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const { verifyToken } = require("./middleware/jwtVerify");
const { AdminRoutes } = require("./routes/admin.route");
const { UserRoutes } = require("./routes/user.route");
const { CategoryRoutes } = require("./routes/category.route");
const { NotificationRoutes } = require("./routes/notification.route");
// const { RefundRoutes } = require("./routes/refund.route");
const { OrderRoute } = require("./routes/order.route");
const { CartRoutes } = require("./routes/cart.route");
// const { verifyRoute } = require("./routes/category");
const { ProductRoutes } = require("./routes/product.route");
const { subCategoryRoutes } = require("./routes/subCategory.route");
// const { PharmacyRoutes } = require("./routes/category");
// const { ConsultantRoutes } = require("./routes/category");
const { BannerRoutes } = require("./routes/Banner.route");
const { productCategoryRoutes } = require("./routes/productCategory.route");
const {favoriteRoutes} = require('./routes/favorite.route')
// const { BlogRoutes } = require("./routes/Blog.route");

/*Api Logger */
app.use(morganMiddleware);

app.use(`${BASE_URL}/user`, UserRoutes);
app.use(`${BASE_URL}/admin`, AdminRoutes);
// app.use(`${BASE_URL}`,verifyRoute);
// app.use(`${BASE_URL}`,verifyToken);
app.use(`${BASE_URL}/product`, ProductRoutes);
app.use(`${BASE_URL}/category`, CategoryRoutes);
app.use(`${BASE_URL}/subcategory`, subCategoryRoutes);
app.use(`${BASE_URL}/banner`, BannerRoutes);
// app.use(`${BASE_URL}`,BlogRoutes);
// app.use(`${BASE_URL}`,ConsultantRoutes);
// app.use(`${BASE_URL}`,PharmacyRoutes);
app.use(`${BASE_URL}/product-category`, productCategoryRoutes);
app.use(`${BASE_URL}/cart`, CartRoutes);
app.use(`${BASE_URL}/order`, OrderRoute);
// app.use(`${BASE_URL}`,RefundRoutes);
app.use(`${BASE_URL}/notification`, NotificationRoutes);
app.use(`${BASE_URL}/favorite`, favoriteRoutes);

app.all("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

/* The code block `app.use(function (req, res, next) { ... });` is setting up CORS (Cross-Origin
Resource Sharing) headers in your Express application. */
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(errorHandler);

module.exports = { app };
