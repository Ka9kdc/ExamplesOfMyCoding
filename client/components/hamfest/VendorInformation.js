import React from 'react'
import States from '../states'
import {connect} from 'react-redux'
import { updateCustomerInfo, submitAttendee, submitVendor } from '../../redux/customer'
import Paypal from './paypal'


class VendorInfromation extends React.Component{
    constructor(){
        super()
        this.state = {
            readyToPay: false,
            redirect: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.props.update({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        const order = this.props.cartItems.reduce((obj, item) =>{
                obj[item.dataName] = item.qty
                return obj
            }, {})
        order.Amount = this.props.cartTotal
        order.OrderDate = new Date()
        const information = this.props.customerInfo
    
        information.OrderDate = order.OrderDate;
        const person = {
            information,
            order
                }
        this.setState({readyToPay: true})
        if(order.Tables) { 
            this.props.submitVendor(person)
        } else {
            this.props.submitAttendee(person)
        }
    }

    

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
          const cart = this.props.cartItems.reduce((names, item) =>{
            names.push(item.dataName)
            return names
        }, [])
        const newVendor = cart.indexOf('Tables') !== -1
        
        return (
            <div>
                <h2>Thank You {newVendor ? 'Vendor' : ''} for your interest in the WCRA Hamfest</h2>
                <span style={{color: 'red'}}>Warning refreshing the page will emtpy your cart</span>
                <h3>Please provide your contact information below.</h3>
                <div>
                    <div>
                        <label>Name: </label> <input name="Name" placeholder="Name" type="text" size="50" value={this.props.customerInfo.Name} onChange={() => this.handleChange(event)} /> 
                        <label>  Callsign:  </label><input name="Callsign" placeholder="callsign"  type="text" size="10" value={this.props.customerInfo.Callsign} onChange={() => this.handleChange(event)}/> 
                    </div>
                    <label>  Company: </label><input name="Company" placeholder="Company" type="text" size="50" value={this.props.customerInfo.Company} onChange={() => this.handleChange(event)}/>
                    
                    <div>
                        <label>Email:  </label><input name="Email" placeholder="Your email here (required)" size="50" type="email" value={this.props.customerInfo.Email} onChange={() => this.handleChange(event)}/>
                        <label>   Phone Number: </label> <input name="Phone" placeholder="000-000-0000" type="tel"  size="15" value={this.props.customerInfo.Phone} onChange={() => this.handleChange(event)}/>
                    </div>
                    <label>Street Address:  <input name="Street" placeholder="Street" type="text" size="50" value={this.props.customerInfo.Street} onChange={() => this.handleChange(event)}/></label>
                    <div>
                        <label>   City: </label> <input name="City" placeholder="City" type="text" value={this.props.customerInfo.City} onChange={() => this.handleChange(event)}/> 
                        <label>   State: </label> <States state={this.props.customerInfo.State} handleChange={this.handleChange}/> 
                        <label>   Zip Code: </label> <input name="Zip" placeholder="00000" type="text" size="5" value={this.props.customerInfo.Zip} onChange={() => this.handleChange(event)}/>
                    </div>
                   {newVendor ? <label>Special Requests: <textarea name="SpecialRequests" cols="50" value={this.props.customerInfo.SpecialRequests} onChange={() => this.handleChange(event)}></textarea></label> : ''}
                </div>
                <p>Clicking Place order will take you to PayPal to pay. Please verify your contact information is currect before click Place Order.
                     Your order will not be consider placed until payment has been received.</p>
                     <button type='button' onClick={() => this.handleSubmit(event)} >Place order</button>
                     <div id="paypal-button-container"></div> {this.state.readyToPay ? <Paypal /> : ''}
            </div>
            
        )
    }
}



const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart.cart,
        cartTotal: state.cart.total,
        customerInfo: state.customerInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (newCustomerInfo) => dispatch(updateCustomerInfo(newCustomerInfo)),
        submitVendor: (vendorInfo) => dispatch(submitVendor(vendorInfo)),
        submitAttendee: (attendeeInfo) => dispatch(submitAttendee(attendeeInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfromation)