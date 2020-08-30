import {createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

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

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, products: action.products};
        default:
            return state
    }
}





export default createStore(reducer, applyMiddleware(thunkMiddleware))