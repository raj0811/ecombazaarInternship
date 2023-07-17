const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller')

const upload = require('../middleware/upload')



router.get('/', adminController.renderAddProduct)
router.post('/addproduct',upload.single('image'),adminController.addProduct)
router.get('/inventory',adminController.renderInventory)
router.get('/delete/:productId',adminController.delete)
module.exports = router; 