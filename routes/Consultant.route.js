const express = require('express');
const route = express.Router();
const consultantController = require('../controller/consultant.Controller');
const upload = require('../middleware/Upload');
const validateData = require('../middleware/consultant.middleware');

route.post('/add/Consultant',validateData.validateConsultant,consultantController.addConsultant);

// route.put('/add/Consultant/image/:consultantId',upload.single('file'),consultantController.updateConsultantImage);

route.get('/getAll/consultant',consultantController.getAllConsultant);

route.get('/get/consultant/:consultantId',consultantController.getConsultantById);

route.get('/get-Top/consultant',consultantController.getTopConsultant);

route.put('/update/consultant/details/:consultantId',consultantController.updatedConsultant);


route.put('/update/consultant/image/:consultantId',upload.single('file'),consultantController.updateConsultantImage);


route.delete('/delete/consultant/:consultantId',consultantController.deleteConsultant);


module.exports = {ConsultantRoutes : route}