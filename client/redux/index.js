import {combineReducers} from 'redux'
import productsReducer from './products'
import cartReducer from './cart'
import customerReducer from './customer'



const appReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    customerInfo: customerReducer
})

export default appReducer