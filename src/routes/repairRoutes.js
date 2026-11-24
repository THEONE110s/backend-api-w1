const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairController');

router.get('/', repairController.getAllRequests);
router.get('/:id', repairController.getRequestById);
router.post('/', repairController.createRequest);
router.put('/:id', repairController.updateRequest);
router.delete('/:id', repairController.deleteRequest);

module.exports = router;