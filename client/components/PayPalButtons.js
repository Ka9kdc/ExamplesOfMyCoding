import React from 'react'

function createOrder() {
  return fetch('/api/payPalCall/create-paypal-transaction', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    return data.orderID; // Use the same key name for order ID on the client and server
  });
}

 function onApprove(data) {
  return fetch('/api/paypalCall/capture-paypal-transaction', {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      orderID: data.orderID
    })
  }).then(function(res) {
    return res.json();
  }).then(function(details) {
    alert('Transaction funds captured from ' + details.payer_given_name);
  })
}

const PayPalCheckoutButtons = (props) =>{
  paypal.Buttons({
    createOrder,
    onApprove
  }).render('#paypal-button-container')
    return (
    <div id="paypal-button-container"></div>
    )
}

export default PayPalCheckoutButtons