import React from 'react'


const OrderItem = (props) =>{
    const item = props.item
    return (
        <div>
            {item.name === 'Electrical' ? <div>{item.name}:   ${item.price} Line Total: ${item.total}</div> : <div>
            {item.name}:   ${item.price} each    Qty: {item.qty} Line Total: ${item.total} 
            </div>}
        </div>
    )
}

export default  OrderItem