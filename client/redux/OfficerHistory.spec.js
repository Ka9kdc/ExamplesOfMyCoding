import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from './index';
import { getOfficerHistory, setOfficerHistory } from './OfficerHistory';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

//Tests: 4 passing 0 pending/failing
describe('User - Redux', () => {
  let store;
  let mockAxios;

  const initialState = { officerHistory: [] };
  const mockOfficerHistory = [
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
    it('get the officers', () => {
      expect(setOfficerHistory(mockOfficerHistory)).to.deep.equal({
        type: 'GET_OFFICER_HISTORY',
        officers: mockOfficerHistory,
      });
    });
  });

  describe('Thunks', () => {
    it('getOfficerHistory - eventually dispatches the GET_officerHistory action', async () => {
      mockAxios.onGet('/api/officerHistory').replyOnce(200, mockOfficerHistory);
      await store.dispatch(getOfficerHistory());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_OFFICER_HISTORY');
      expect(actions[0].officers).to.be.deep.equal(mockOfficerHistory);
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on GET_OFFICER_HISTORY', () => {
      const action = {
        type: 'GET_OFFICER_HISTORY',
        officers: mockOfficerHistory,
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.officerHistory).to.be.deep.equal(mockOfficerHistory);
      expect(newState).to.not.be.equal(prevState);
    });

    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', officers: mockOfficerHistory };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.officerHistory).to.not.be.equal(mockOfficerHistory);
    });
  });
});
