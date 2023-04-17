const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

// Route to get the delivery status for a customer
router.get("/delivery/status", async (req, res) => {
  const token = req.query.token;
  try {
    const delivery = await Delivery.findOne({ customerToken: token });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    const status = delivery.status;
    return res.json({ status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get the driver, restaurant and customer position for a customer
router.get("/delivery/positions", async (req, res) => {
  const token = req.query.token;
  try {
    const delivery = await Delivery.findOne({ customerToken: token });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    const driverPosition = delivery.driverPosition;
    const restaurantPosition = delivery.restaurantPosition;
    const customerPosition = delivery.customerPosition;
    return res.json({ driverPosition, restaurantPosition, customerPosition });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
