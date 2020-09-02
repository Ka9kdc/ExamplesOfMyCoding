import React from 'react'



// const fakeCart = [
//   {name:'tickets',
// price: '8',
// quanity: '4'},
// {name:'tables',
// price: '25',
// quanity: '4'}
// ]

// const fakeTotal= 132

class PayPalCheckoutButtonsBasic extends React.Component {
  constructor(){
    super()
    this.state = {
      requestBody: {}
    }
    this.createOrder =this.createOrder.bind(this)
    this.onApprove = this.onApprove.bind(this)
    this.buildRequestBody = this.buildRequestBody.bind(this)
  }

  componentDidMount(){
    this.buildRequestBody()
    const buttons = "const buttonObject = {createOrder: this.createOrder, onApprove: this.onApprove}; paypal.Buttons(buttonObject).render('#paypal-button-container')"
    const buttonScript = document.createElement('script');
    buttonScript.setAttribute('id', 'ordering')
    buttonScript.innerText = buttons;
    document.head.appendChild(buttonScript);
  }

  componentWillUnmount(){
    const buttonToRemove = document.getElementById('ordering')
    if(buttonToRemove) buttonToRemove.remove()
  }

  createOrder(data, actions) {
    // This function sets up the details of the transaction, including the amount and line item details.
    return actions.order.create(this.state.requestBody);
  }

  onApprove(data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function(details) {
      // This function shows a transaction success message to your buyer.
      alert('Transaction completed by ' + details.payer.name.given_name);
    });
  }
  
  buildRequestBody(){
    //move this to vendor info
    const intent= "CAPTURE";
    const application_context = {
      "return_url": "https://www.w9ccu.org/hamfest.html",
      "cancel_url": "https://www.w9ccu.org/hamfest.html",
      "locale": "en-US",
      "shipping_preference": "NO_SHIPPING",
    }
    const items = this.props.cart.reduce((arr, item) =>{
        const newItem = {
          name: item.name,
          unit_amount: {currency_code: "USD", value: item.price},
          quanity: item.quanity
        }
        arr.push(newItem)
        return arr
      },[])
    const amount = {
      currency_code: "USD",
      value: this.props.amount
    }
    const information = this.props.information
    const payer = {
      email_address: information.Email,
      address_portable: {
          address_line_1: information.Street,
          admin_area_2: information.City,
          admin_area_1: information.State,
          postal_code: information.Zip,
          country_code: "US"
        }
      }
    const newRequestBody = {
      intent,
      application_context,
      purchase_units: [{amount, items}],
      payer
    }
    console.log(newRequestBody)
    this.setState({requestBody: newRequestBody})
  }


  render(){ 
    return (
      <div id="paypal-button-container"></div>
    )
  }
 
}



export default PayPalCheckoutButtonsBasic