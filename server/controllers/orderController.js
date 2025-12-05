const Order = require('../models/Order.js');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        console.log('Error: No order items');
        res.status(400).send('No order items');
        return;
    } else {
        try {
            const order = new Order({
                orderItems,
                user: req.body.user, // Optional for now
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            // Create Razorpay Order
            const options = {
                amount: Math.round(totalPrice * 100), // Amount in paise
                currency: 'INR',
                receipt: createdOrder._id.toString(),
            };

            const razorpayOrder = await razorpay.orders.create(options);

            // Update order with Razorpay Order ID
            createdOrder.paymentResult = {
                razorpay_order_id: razorpayOrder.id
            };
            await createdOrder.save();

            // Placeholder for Velocity Express (Velexp) Integration
            // const shippingData = {
            //     order_id: createdOrder._id,
            //     address: shippingAddress,
            //     ...
            // };
            // await axios.post('https://api.velocityexpress.com/create_shipment', shippingData);

            res.status(201).json({
                order: createdOrder,
                razorpayOrderId: razorpayOrder.id,
                key: process.env.RAZORPAY_KEY_ID
            });
        } catch (error) {
            console.error('Order Creation Error:', error);
            res.status(500).json({ message: 'Order creation failed', error: error.message });
        }
    }
};

// @desc    Verify Payment
// @route   POST /api/orders/verify
// @access  Public
const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        order_id
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        const order = await Order.findById(order_id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                status: 'COMPLETED'
            };
            order.orderStatus = 'Paid'; // Update status
            await order.save();
            res.json({ status: 'success', order });
        } else {
            res.status(404).send('Order not found');
        }
    } else {
        res.status(400).send('Invalid signature');
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (should be private/protected in real app)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Public (using email param for now)
const getUserOrders = async (req, res) => {
    try {
        const { email } = req.params; // or req.query
        const orders = await Order.find({ 'shippingAddress.email': email }); // Assuming email is stored in shippingAddress or user field
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addOrderItems, verifyPayment, getOrderById, getUserOrders };
