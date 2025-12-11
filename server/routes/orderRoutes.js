const express = require('express');
const router = express.Router();
const { addOrderItems, verifyPayment, getOrderById, getUserOrders } = require('../controllers/orderController.js');

router.route('/').post(addOrderItems);
router.route('/verify').post(verifyPayment);
router.route('/:id').get(getOrderById);
router.route('/user/:email').get(getUserOrders);

module.exports = router;
