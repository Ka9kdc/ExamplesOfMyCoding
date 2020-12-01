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
} from '../user';
import { createStore } from 'redux';
import appReducer from '../index';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

//Tests: 5 passing 4 pending - the thunk tests are not passing
describe('User - Redux', () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };
  const mockUser = {
    Callsign: 'ka9ddd',
    id: 1,
    password: '12345',
  };
  beforeEach(() => {
    mockAxios = new mockAdapter(axios);
    store = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });
  describe('Action Creators', () => {
    it('set current user', () => {
      expect(setCurrentUser(mockUser)).to.deep.equal({
        type: 'SET_CURRENT_USER',
        user: mockUser,
      });
    });
  });

  describe('Thunks', () => {
    // These test only work if thunks were written in try/catch blocks and not promise chains
    it('me - eventually dispatches the SET Current USER action', async () => {
      mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      await store.dispatch(me());
      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('fetchCurrentUser - eventually dispatches the SET Current USER action', async () => {
      mockAxios.onGet('/api/user/me').replyOnce(200, mockUser);
      await store.dispatch(fetchCurrentUser());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('login - eventually  dispatches the SET_CURRENT_USER action', async () => {
      mockAxios.onPut('/api/user/login', mockUser).replyOnce(200, mockUser);
      await store.dispatch(login(mockUser, 'history'));
      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('SET_CURRENT_USER');
      expect(actions[0].user).to.be.deep.equal(mockUser);
    });

    it('logout: eventually dispatches the REMOVE_CURRENT_USER action', async () => {
      mockAxios.onDelete('/api/user/logout').replyOnce(204);
      await store.dispatch(logout());

      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('REMOVE_CURRENT_USER');
      //   expect(history.location.pathname).to.be.equal('/login');
    });

    it('signUp = eventually dispatched SET CURRENT USER', async () => {
      mockAxios.onPost('/api/user/signup', mockUser).replyOnce(200, mockUser);
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

      expect(newState.user).to.be.deep.equal(mockUser);
      expect(newState).to.not.be.equal(prevState);
    });

    it('reduces on REMOVE_CURRENT_USER', () => {
      const action = { type: 'REMOVE_CURRENT_USER' };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.user).to.be.deep.equal(initialState.user);
      expect(newState).to.not.be.equal(prevState);
    });
    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', user: mockUser };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.user).to.not.be.equal(mockUser);
    });
  });
});
