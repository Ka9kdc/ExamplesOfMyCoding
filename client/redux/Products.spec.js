import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from './index';
import { fetchAllProducts, getAllProducts } from './products';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('User - Redux', () => {
  let store;
  let mockAxios;

  const initialState = { products: [] };
  const mockProduct = [{
    name: 'Electrical Drop',
      dataName: 'Electrical',
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '/Images/electricOutlet.png',
  }];
  before(() => {
    mockAxios = new mockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Action Creators', () => {
    expect(getAllProducts(mockProduct)).to.deep.equal({
        type: 'GET_PRODUCTS',
        products: mockProduct,
    });
  });

  describe('Thunks', () => {
    it('fetchAllProducts - eventually dispatches the GET_PRODUCTS action', async () => {
      mockAxios.onGet('/api/user/me').replyOnce(200, mockProduct);
      await store.dispatch(fetchAllProducts());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_PRODUCTS');
      expect(actions[0].products).to.be.deep.equal(mockProduct);
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on GET_PRODUCTS', () => {
      const action = { type: 'GET_PRODUCTS', products: mockProduct };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(mockProduct);
      expect(newState).to.not.be.equal(prevState);
    });

    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', products: mockProduct };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(mockProduct);
    });
  });
});
