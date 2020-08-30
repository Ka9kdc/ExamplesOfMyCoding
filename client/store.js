import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    products: [],
    cart:[]
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"

export const getAllProducts = (products) =>{
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const fetchAllProducts = () => {
    console.log('inside fetch')
    return async (dispatch) => {
        console.log('fetching')
        const response = await axios.get('/api/hamfest/products');
        console.log('response', response.data)
        const products = response.data;
        dispatch(getAllProducts(products))
    }
}

export const addProductToCart = (product) =>{
    return {
        type: ADD_PRODUCT_TO_CART,
        product
    }
}

export const removeProductFromCart = (productId) =>{
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        productId: productId
    }
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, products: action.products};
        case ADD_PRODUCT_TO_CART:
            return {...state, cart:[...state.cart, action.product]};
        case REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cart.filter(item =>{
                return item.id !== action.productId;
            })
            return {...state, cart: updatedCart}
        default:
            return state
    }
}





export default createStore(reducer, applyMiddleware(thunkMiddleware))