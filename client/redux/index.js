import {combineReducers} from 'redux'
import productsReducer from './products'
import cartReducer from './cart'
import customerReducer from './customer'
import memberReducer from './membership'



const appReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    customerInfo: customerReducer,
    member: memberReducer
})

export default appReducer