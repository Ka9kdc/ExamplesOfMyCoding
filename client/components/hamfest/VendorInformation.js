import React from 'react'
import States from '../states'
import {connect} from 'react-redux'

import axios from 'axios'
import PayPalCheckoutButtonsBasic from '../PayPalButtonsBasic'

class VendorInfromation extends React.Component{
    constructor(){
        super()
        this.state = {
            Name: '',
            Callsign: '',
            Company: '',
            Email: '',
            Phone: '',
            Street: '',
            City: '',
            State: 'IL',
            Zip: '',
            SpecialRequests: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    async handleSubmit(event){
        event.preventDefault()
        try {
            const order = this.props.cartItems.reduce((obj, item) =>{
                    obj[item.dataName] = item.qty
                    return obj
                }, {})
            order.Amount = this.props.cartTotal
            order.OrderDate = new Date()
            const information = this.state
       
            information.OrderDate = order.OrderDate;
            const person = {
                information,
                order
                    }
            if(order.Tables) { 
                const response = await axios.post("/api/hamfest/vendor", person)
            } else {
                const response = await axios.post("/api/hamfest/attendee", person)
            }

            
       } catch (error){
           console.log(error.message)
       }

    }

    

    render() {
        const cart = this.props.cartItems.reduce((names, item) =>{
            names.push(item.dataName)
            return names
        }, [])
        const newVendor = cart.indexOf('Tables') !== -1
        return (
            <div>
                <h2>Thank You {newVendor ? 'Vendor' : ''} for your interest in the WCRA Hamfest</h2>
                <h3>Please provide your contact information below.</h3>
                <div>
                    <div>
                        <label>Name: </label> <input name="Name" placeholder="Name" type="text" size="50" value={this.state.Name} onChange={() => this.handleChange(event)} /> 
                        <label>  Callsign:  </label><input name="Callsign" placeholder="callsign"  type="text" size="10" value={this.state.Callsign} onChange={() => this.handleChange(event)}/> 
                    </div>
                    <label>  Company: </label><input name="Company" placeholder="Company" type="text" size="50" value={this.state.Company} onChange={() => this.handleChange(event)}/>
                    
                    <div>
                        <label>Email:  </label><input name="Email" placeholder="Your email here (required)" required="" size="50" type="email" value={this.state.Email} onChange={() => this.handleChange(event)}/>
                        <label>   Phone Number: </label> <input name="Phone" placeholder="000-000-0000" type="tel" required size="15" value={this.state.Phone} onChange={() => this.handleChange(event)}/>
                    </div>
                    <label>Street Address:  <input name="Street" placeholder="Street" type="text" size="50" value={this.state.Street} onChange={() => this.handleChange(event)}/></label>
                    <div>
                        <label>   City: </label> <input name="City" placeholder="City" type="text" value={this.state.City} onChange={() => this.handleChange(event)}/> 
                        <label>   State: </label> <States state={this.state.State} handleChange={this.handleChange}/> 
                        <label>   Zip Code: </label> <input name="Zip" placeholder="00000" type="text" size="5" value={this.state.Zip} onChange={() => this.handleChange(event)}/>
                    </div>
                   {newVendor ? <label>Special Requests: <textarea name="SpecialRequests" cols="50" value={this.state.SpecialRequests} onChange={() => this.handleChange(event)}></textarea></label> : ''}
                </div>
                <p>Clicking Place order will take you to PayPal to pay. Please verify your contact information is currect before click Place Order.
                     Your order will not be consider placed until payment has been received.</p>
                <PayPalCheckoutButtonsBasic amount={this.props.cartTotal} cart={this.props.cartItems} information={this.state}/>
            </div>
            
        )
    }
}



const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart,
        cartTotal: state.total
    }
}

export default connect(mapStateToProps)(VendorInfromation)