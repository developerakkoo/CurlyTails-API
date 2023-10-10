const {CategoryRoutes} = require('./category.route');
const{subCategoryRoutes}= require('./subCategory.route');
const{productCategoryRoutes}=require('./productCategory.route');
const{ProductRoutes}=require('./product.route');
const{UserRoutes} = require('./user.route');
const{AdminRoutes} = require('./admin.route');
const {BannerRoutes}=require('./Banner.route');
const {BlogRoutes}= require('./Blog.route');
const {PharmacyRoutes} = require('./Pharmacy .route');
const {ConsultantRoutes} = require('./Consultant.route');
const {verifyRoute} = require('./verify.route');
const {CartRoutes} = require('./cart.route');
const {OrderRoute} = require('./order.route');
const {RefundRoutes} = require('./refund.route');
const {NotificationRoutes} = require('./notification.route');

module.exports = {
    UserRoutes,
    AdminRoutes,
    ProductRoutes,
    CategoryRoutes,
    subCategoryRoutes,
    productCategoryRoutes,
    BannerRoutes,
    BlogRoutes,
    ConsultantRoutes,
    PharmacyRoutes,
    verifyRoute,
    CartRoutes,
    OrderRoute,
    RefundRoutes,
    NotificationRoutes
}