import React from 'react'
import CartItem from './CartItem'
import { connect } from 'react-redux'
import { updateQty } from '../../redux/cart'
import {Link} from 'react-router-dom'




//combine increase and decreasing in to one function

class ShoppingCart extends React.Component {
    constructor(){
        super()
        this.increaseQty = this.increaseQty.bind(this)
        this.decreaseQty = this.decreaseQty.bind(this)

    }

    increaseQty(item, event){
        event.preventDefault()
        const itemKeys = Object.keys(item)
        const updatedItem = itemKeys.reduce((obj, key) =>{
            if(key === 'qty') obj[key] = item[key] + 1
            else obj[key] = item[key]
            return obj
        }, {})
        updatedItem.total = updatedItem.qty * updatedItem.price
        this.props.updateCart(updatedItem)
    }

    decreaseQty(item, event){
        event.preventDefault()
        const itemKeys = Object.keys(item)
        const updatedItem = itemKeys.reduce((obj, key) =>{
            if(key === 'qty') obj[key] = item[key] - 1
            else obj[key] = item[key]
            return obj
        }, {})
        updatedItem.total = updatedItem.qty * updatedItem.price
        this.props.updateCart(updatedItem)
    }

    

    render() {
        const items = this.props.cartItems
        return (
            <div className="Right">

                {items.map(item =>{
                    return <CartItem item={item} key={item.id} decreaseQty={this.decreaseQty} increaseQty={this.increaseQty}/>
                })}
                <div><label htmlFor="cartTotal"> Total: </label> 
                    <input type="hidden" name="Amount" />${this.props.cartTotal}</div>
                
                <Link to="/hamfestCheckout"> Checkout </Link>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        cartItems: state.cart.cart,
        cartTotal: state.cart.total
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateCart: (item) => dispatch(updateQty(item))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)