import React from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { updateQty, placeOrder, placeTickets } from '../../redux/cart';

//combine increase and decreasing in to one function

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.increaseQty = this.increaseQty.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  increaseQty(item, event) {
    event.preventDefault();
    const itemKeys = Object.keys(item);
    const updatedItem = itemKeys.reduce((obj, key) => {
      if (key === 'qty') obj[key] = item[key] + 1;
      else obj[key] = item[key];
      return obj;
    }, {});
    updatedItem.total = updatedItem.qty * updatedItem.price;
    this.props.updateCart(updatedItem);
  }

  decreaseQty(item, event) {
    event.preventDefault();
    const itemKeys = Object.keys(item);
    const updatedItem = itemKeys.reduce((obj, key) => {
      if (key === 'qty') obj[key] = item[key] - 1;
      else obj[key] = item[key];
      return obj;
    }, {});
    updatedItem.total = updatedItem.qty * updatedItem.price;
    this.props.updateCart(updatedItem);
  }

  placeOrder() {
    const order = this.props.cartItems.reduce((obj, item) => {
      obj[item.dataName] = item.qty;
      return obj;
    }, {});
    order.Amount = this.props.cartTotal;
    if (order.table) {
      this.props.vendorOrder(order, this.props);
    } else {
      this.props.ticketOrder(order, this.props);
    }
  }

  render() {
    const items = this.props.cartItems;
    return (
      <div className="shoppingCart">
        <h2>Shopping Cart</h2>
        {items.map((item) => {
          return (
            <CartItem
              item={item}
              key={item.id}
              decreaseQty={this.decreaseQty}
              increaseQty={this.increaseQty}
            />
          );
        })}
        <div>
          <label htmlFor="cartTotal"> Total: </label>
          <input type="hidden" name="Amount" />${this.props.cartTotal}
        </div>

        <button type="button" onClick={() => this.placeOrder()}>
          Checkout
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cart,
    cartTotal: state.cart.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (item) => dispatch(updateQty(item)),
    vendorOrder: (order, ownProps) =>
      dispatch(placeOrder(order, ownProps.history)),
    ticketOrder: (order, ownProps) =>
      dispatch(placeTickets(order, ownProps.history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
