import {combineReducers} from 'redux'
import productsReducer from './products'
import cartReducer from './cart'
import customerReducer from './customer'
import memberReducer from './membership'
import userReducer from './user'
import officerHistoryReducer from './OfficerHistory'
import { allAnnouncementReducer, singleAnnouncementReducer } from './announcements'



const appReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    customerInfo: customerReducer,
    member: memberReducer,
    user: userReducer,
    officerHistory: officerHistoryReducer,
    newsHistory: allAnnouncementReducer,
    lastestNews: singleAnnouncementReducer
})

export default appReducer