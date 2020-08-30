import React from 'react'


const CartItem = (props) =>{
    const item= props.item
    return (
        <div>
            <div>{item.name}:   {item.price} each  
            {item.name === 'Electrical' ? '' : <div><button>-</button> Qty: {item.qty}  <button>+</button></div>}
            </div>
            <div>Line Total: {item.total} <button>Remove</button> </div>
            
          
           
            
        </div>
    )
}

export default CartItem