const express = require('express');
const route = express.Router();
const PharmacyController = require('../controller/Pharmacy.Controller');
const validatedData = require('../middleware/Pharmacy.middleware');
const Upload = require('../middleware/Upload');


route.post('/add/pharmacy',validatedData.validatePharmacy,PharmacyController.postPharmacy);

route.put('/add/image/pharmacy/:pharmacyId',Upload.single('file'),PharmacyController.updateImage);

route.put('/update/pharmacy/details/:pharmacyId',PharmacyController.updatedPharmacy);

route.get('/getAll/pharmacy',PharmacyController.getAllPharmacy);

route.get('/get/pharmacy/:pharmacyId',PharmacyController.getPharmacyById);

route.delete('/delete/pharmacy/:pharmacyId',PharmacyController.deletePharmacy);

module.exports = { PharmacyRoutes : route }