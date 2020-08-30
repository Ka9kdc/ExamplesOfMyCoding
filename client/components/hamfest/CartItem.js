import React from 'react'
import {connect} from 'react-redux'
import { removeProductFromCart } from '../../store'

const CartItem = (props) =>{
    const item= props.item
    return (
        <div>
            <div>{item.name}:   {item.price} each  
            {item.name === 'Electrical' ? '' : <div><button>-</button> Qty: {item.qty}  <button>+</button></div>}
            </div>
            <div>Line Total: {item.total} <button onClick={() => props.removeFromCart(item.id)}>Remove</button> </div>
            
          
           
            
        </div>
    )
}

const mapDispatchToProps = (dispatch =>{
    return {
        removeFromCart: (itemId) => dispatch(removeProductFromCart(itemId))
    }
})

export default connect(null, mapDispatchToProps)(CartItem)