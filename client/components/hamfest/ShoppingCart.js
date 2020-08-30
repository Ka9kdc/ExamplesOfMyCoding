import React from 'react'
import CartItem from './CartItem'


const tempItems = [
    {name: 'tickets',
    qty: 4,
price: 8,
total: 4*8},
{name: 'tables',
    qty: 4,
price: 20,
total: 4*20}
]
class ShoppingCart extends React.Component {

    render() {
        const items = tempItems
        return (
            <div className="Right">

                {items.map(item =>{
                    return <CartItem item={item} />
                })}
                <div><label htmlFor="cartTotal"> Total: </label> 
                    <input type="hidden" name="Amount" /></div>
                
                <button type="submit" value="Checkout"> Checkout </button>
            </div>
        )
    }
}

export default ShoppingCart