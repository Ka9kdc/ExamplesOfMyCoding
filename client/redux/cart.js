import axios from 'axios';

const initialState = {
  cart: [],
  total: 0,
};

const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const CHANGE_QTY = 'CHANGE_QTY';
const PLACE_ORDER = 'PLACE_ORDER';

export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
  };
};

export const removeProductFromCart = (productId) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    productId: productId,
  };
};

export const updateQty = (product) => {
  return {
    type: CHANGE_QTY,
    product,
  };
};

export const placeOrder = (order, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/hamfest/vendor/order', order);
      const placed = response.data;
      dispatch({
        type: PLACE_ORDER,
        order: {
          orderId: placed.id,
          OrderDate: placed.OrderDate,
          Amount: placed.Amount,
        },
      });
      history.push('/hamfestCheckout');
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const placeTickets = (order, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/hamfest/attendee/order', order);
      const placed = response.data;
      dispatch({
        type: PLACE_ORDER,
        order: {
          ticketId: placed.id,
          OrderDate: placed.OrderDate,
          Amount: placed.Amount,
        },
      });
      history.push('/hamfestCheckout');
    } catch (error) {
      console.log(error.message);
    }
  };
};

const cartReducer = (shoppingCart = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const updateTotal =
        shoppingCart.total + action.product.price * action.product.qty;
      return {
        cart: [...shoppingCart.cart, action.product],
        total: updateTotal,
      };
    case REMOVE_PRODUCT_FROM_CART:
      const updatedCart = shoppingCart.cart.filter((item) => {
        return item.id !== action.productId;
      });
      const newTotals = updatedCart.reduce((total, item) => {
        return total + item.total;
      }, 0);
      return { cart: updatedCart, total: newTotals };
    case CHANGE_QTY:
      const update = shoppingCart.cart.map((item) => {
        if (item.id === action.product.id) {
          return action.product;
        } else {
          return item;
        }
      });
      const newTotal = update.reduce((total, item) => {
        return total + item.total;
      }, 0);
      return { cart: update, total: newTotal };
    case PLACE_ORDER:
      return { ...shoppingCart, order: action.order };
    default:
      return shoppingCart;
  }
};

export default cartReducer;
