import React from 'react'
import { connect } from 'react-redux'
import OrderItem from './OrderItem'


const Order = (props) => {
    const items = props.cartItems
        return (
            <div className="Right">
                <h2>Order</h2>

                {items.map(item =>{
                    return <OrderItem item={item} key={item.id} style={{textAlign: 'right'}}/>
                })}

                <div style={{textAlign: 'right'}}><label htmlFor="cartTotal"> Total: </label> 
                    <input type="hidden" name="Amount" />${props.cartTotal}</div>
                
            </div>
        )
}

const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart,
        cartTotal: state.total
    }
}

export default connect(mapStateToProps)(Order)