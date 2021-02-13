import axios from 'axios';

const initialState = [];

const GET_PRODUCTS = 'GET_PRODUCTS';

export const getAllProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      console.log('products');
      const response = await axios.get('phpfiles/getAllProducts.php');
      const products = response.data;
      console.log(products);
      dispatch(getAllProducts(products));
    } catch (error) {
      console.error(error);
    }
  };
};

const productsReducer = (products = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
};

export default productsReducer;
