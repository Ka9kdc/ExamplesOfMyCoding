import axios from 'axios'

const initialState = {
    Name: '',
    Callsign: '',
    Company: '',
    Email: '',
    Phone: '',
    Street: '',
    City: '',
    State: 'IL',
    Zip: '',
    SpecialRequests: ''
}

const UPDATE_CUSTOMER_INFO = 'UPDATE_CUSTOMER_INFO'
const PLACE_ORDER = 'PLACE_ORDER'

export const updateCustomerInfo = (newCustomerInfo) => {
    return {
        type : UPDATE_CUSTOMER_INFO,
        update: newCustomerInfo
    }
}

export const submitVendor = (vendorInfo) => {
    return async (dispatch) =>{
        try  { 
            const response = await axios.post("/api/hamfest/vendor/information", vendorInfo)
            const vendor = response.data
            dispatch(updateCustomerInfo(vendor))
        } catch (error){
            console.log(error.message)
        }
    }
}

export const submitAttendee = (attendeeInfo) =>{
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/hamfest/attendee/information", attendeeInfo)
            const attendee = response.data
            dispatch(updateCustomerInfo(attendee))
        } catch (error){
            console.log(error.message)
        }
    }
}

export const hamfestPayment = (vendorInfo, history) => {
    return () => {
        axios.post('/api/hamfest/payment', vendorInfo)
        .then(payment => history.push('/hamfest'))
    .catch(error => console.log(error.message))
}}

const customerReducer = (customer = initialState, action) =>{
    switch (action.type){
        case UPDATE_CUSTOMER_INFO:
            return {...customer, ...action.update};
        case PLACE_ORDER:
            return {...customer, order: action.order}
        default:
            return customer
    }
}



export default customerReducer