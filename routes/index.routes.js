const {CategoryRoutes} = require('./category.route');
const{subCategoryRoutes}= require('./subCategory.route');
const{productCategoryRoutes}=require('./productCategory.route');
const{ProductRoutes}=require('./product.route');

module.exports = {
    ProductRoutes,
    CategoryRoutes,
    subCategoryRoutes,
    productCategoryRoutes,
}