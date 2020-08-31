import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    products: [],
    cart:[],
    total: 0,
    vendor: {}
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
const CHANGE_QTY = 'CHANGE_QTY'
const SET_VENDOR = 'SET_VENDOR'

export const getAllProducts = (products) =>{
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const fetchAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/hamfest/products');
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

export const updateQty = (product) =>{
    return {
        type: CHANGE_QTY,
        product
    }
}

export const setVendor = (vendor) =>{
    return {
        type: SET_VENDOR,
        vendor: vendor
    }
}

export const placeVendorOrder = (vendor) =>{
    console.log('in place order')
    return async () =>{
        // dispatch(setVendor(vendor));
        // // console.log(state)
        const response = await axios.post("/api/hamfest/vendor", vendor)
        console.log(response.data)
    }
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, products: action.products};
        case ADD_PRODUCT_TO_CART:
            const updateTotal = state.total + action.product.total
            return {...state, cart:[...state.cart, action.product], total: updateTotal};
        case REMOVE_PRODUCT_FROM_CART:
            const updatedCart = state.cart.filter(item =>{
                return item.id !== action.productId;
            })
            const newTotals = updatedCart.reduce((total, item) =>{
                return total + item.total
             }, 0)
            return {...state, cart: updatedCart, total: newTotals}
        case CHANGE_QTY:
            const update = state.cart.map(item =>{
                if (item.id === action.product.id){
                    return action.product
                } else return item
            })
            const newTotal = update.reduce((total, item) =>{
                return total + item.total
             }, 0)
            return {...state, cart: update, total: newTotal};
        case SET_VENDOR:
            return {...state, vendor: action.vendor,}
        default:
            return state
    }
}





export default createStore(reducer, applyMiddleware(thunkMiddleware))