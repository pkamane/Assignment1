const express = require('express');
const { resolve } = require('path');

let cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());
//Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = cartTotal + newItemPrice;
  res.send(total.toString());
});

//Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  if (isMember) {
    cartTotal *= 0.9;
  }
  res.send(cartTotal.toString());
});

//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const taxRate = 0.05;

  let tax = cartTotal * taxRate;
  res.send(tax.toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryDays;
  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  }
  //res.send(deliveryDays);
  res.send(deliveryDays.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
//https://stackblitzstartersuqfmx3-0osz-01j6d6vb--3000--c8c182a3.local-credentialless.webcontainer.io/shipping-cost?weight=15000&distance=600
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
