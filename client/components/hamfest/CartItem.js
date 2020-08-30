import React from 'react'


const CartItem = (props) =>{
    const item= props.item
    return (
        <div>
            <div>{item.name}   {item.price} each  
             <button>-</button> {item.qty}  <button>+</button></div>
            <div>Line Total: {item.total} <button>Remove</button> </div>
            
          
           
            
        </div>
    )
}

export default CartItem