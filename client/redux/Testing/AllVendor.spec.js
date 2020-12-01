import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from '../index';
import { fetchAllVendors, allVendor } from '../AllVendor';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

//Tests: 4 passing 0 pending/failing
describe('All vendor - Redux', () => {
  let store;
  let mockAxios;

  const initialState = { vendors: [] };
  const mockvendors = [
    {
      startYear: 1948,
      endYear: 1949,
      President: 'D.C.Burger, W9MYK',
      VicePresident: 'Frank Golder, W9AAM',
      Secretary: 'Craig Allen, W9IHT',
      Treasurer: 'Alice Newcomb, W9QMS',
      Custodian: 'Unknown',
    },
  ];
  beforeEach(() => {
    mockAxios = new mockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Action Creators', () => {
    it('get the vendors', () => {
      expect(allVendor(mockvendors)).to.deep.equal({
        type: 'ALL_VENDOR',
        vendors: mockvendors,
      });
    });
  });

  describe('Thunks', () => {
    it('getvendors - eventually dispatches the GET_vendors action', async () => {
      mockAxios.onGet('/api/hamfest/vendor/all').replyOnce(200, mockvendors);
      await store.dispatch(fetchAllVendors());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ALL_VENDOR');
      expect(actions[0].vendors).to.be.deep.equal(mockvendors);
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on ALL_VENDOR', () => {
      const action = {
        type: 'ALL_VENDOR',
        vendors: mockvendors,
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.vendors).to.be.deep.equal(mockvendors);
      expect(newState).to.not.be.equal(prevState);
    });

    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', vendors: mockvendors };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.vendors).to.not.be.equal(mockvendors);
    });
  });
});
