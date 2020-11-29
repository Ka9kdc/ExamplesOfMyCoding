import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {
  me,
  logout,
  setCurrentUser,
  login,
  fetchCurrentUser,
  signUp,
} from './user';
import { createStore } from 'redux';
import appReducer from './index';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('User - Redux', () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };
  const mockUser = {
    callsign: 'ka9ddd',
    id: 1,
    password: '12345',
  };
  before(() => {
    mockAxios = new mockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Action Creators', () => {
    expect(setCurrentUser(mockUser)).to.deep.equal({
      type: 'SET_CURRENT_USER',
      user: mockUser,
    });
  });

  describe('Thunks', () => {
    it('me - eventually dispatches the SET Current USER action', async () => {
      mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      await store.dispatch(me());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('login - ecentual dispatches the SET_CURRENT_USER action', async () => {
      mockAxios.onPut('/api/user/login', mockUser).replyOnce(200, mockUser);
      await store.dispatch(login(mockUser));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('logout: eventually dispatches the REMOVE_CURRENT_USER action', async () => {
      mockAxios.onPost('/api/user/logout').replyOnce(204);
      await store.dispatch(logout());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('REMOVE_CURRENT_USER');
      expect(history.location.pathname).to.be.equal('/login');
    });

    it('fetchCurrentUser - eventually dispatches the SET Current USER action', async () => {
      mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      await store.dispatch(fetchCurrentUser());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('signUp = eventually dispatched SET CURRENT USER', async () => {
      mockAxios.onPost('/api/user/signUp', mockUser).replyOnce(200, mockUser);
      await store.dispatch(signUp(mockUser));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });
  });

  describe('Reducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on SET_CURRENT_USER', () => {
      const action = { type: 'SET_CURRENT_USER', user: mockUser };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(mockUser);
      expect(newState).to.not.be.equal(prevState);
    });

    it('reduces on REMOVE_CURRENT_USER', () => {
      const action = { type: 'REMOVE_CURRENT_USER' };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(initialState.user);
      expect(newState).to.not.be.equal(prevState);
    });
    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', mockUser };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState).to.not.be.equal(mockUser);
    });
  });
});
