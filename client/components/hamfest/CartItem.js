import React from 'react'
import {connect} from 'react-redux'
import { removeProductFromCart } from '../../store'

const CartItem = (props) =>{
    const item= props.item
    return (
        <div>{item.name === 'Electrical' ?  <div>{item.name}:   ${item.price} </div>
           
         :  <div>{item.name}:   ${item.price} each  
                <button onClick={() => props.decreaseQty(item, event)}>-</button>
                 Qty: {item.qty} 
                  <button onClick={() => props.increaseQty(item, event)}>+</button></div>}
            
            <div>Line Total: {item.total} <button onClick={() => props.removeFromCart(item.id)}>Remove</button> </div>
            
          
           
            
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (itemId) => dispatch(removeProductFromCart(itemId)),
    }
}

export default connect(null, mapDispatchToProps)(CartItem)