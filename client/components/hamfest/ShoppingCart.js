import React from 'react'
import CartItem from './CartItem'
import { connect } from 'react-redux'



const tempItems = [
    {id:1,
        name: 'tickets',
    qty: 4,
price: 8,
total: 4*8},
{id:2,
    name: 'tables',
    qty: 4,
price: 20,
total: 4*20}
]
class ShoppingCart extends React.Component {

    render() {
        const items = this.props.cartItems
        return (
            <div className="Right">

                {items.map(item =>{
                    return <CartItem item={item} key={item.id}/>
                })}
                <div><label htmlFor="cartTotal"> Total: </label> 
                    <input type="hidden" name="Amount" /></div>
                
                <button type="submit" value="Checkout"> Checkout </button>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart
    }
}

export default connect(mapStateToProps)(ShoppingCart)