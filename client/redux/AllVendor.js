import axios from 'axios';

const defaultVendors = [];

const ALL_VENDOR = 'ALL_VENDOR';

const allVendor = (vendors) => {
  return {
    type: ALL_VENDOR,
    vendors,
  };
};

export const fetchAllVendors = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/hamfest/vendor/all');
      const vendors = res.data || defaultVendors;
      dispatch(allVendor(vendors));
    } catch (error) {
      console.error(error.message);
    }
  };
};

const vendorsReducer = (state = defaultVendors, action) => {
  switch (action.type) {
    case ALL_VENDOR:
      return action.vendors;
    default:
      return state;
  }
};

export default vendorsReducer;
