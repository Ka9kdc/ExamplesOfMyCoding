import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from './index';
import {
  updateAnnouncement,
  setAnnounmentHistory,
  setLastAnnouncment,
  fetchLastAnnouncement,
  fetchAllAnnouncement,
  postNewAnnouncement,
} from './announcements';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

//Tests: 13 passing 0 pending/failing
describe('Announcement -Redux', () => {
  let store;
  let mockAxios;
  const initialState = {
    newsHistory: [],
    lastestNews: {
      message: '',
      backgroundColor: '#ffffff',
      borderColor: '#000000',
    },
  };
  const fakeNews = {
    borderColor: 'red',
    backgroundColor: '#fff0ef',
    message: `<h2>March Meeting -- Where Are Your Dues?</h2>
              <p>The March membership meeting is when we have to cough up the annual dues. If you have not already taken care of this then have your dues ready.</p>
              <p>Our program is provided by Debby, WX9VOR, who will be giving us a virtual tour of the National Weather Service&#39;s ham radio station.</p>`,
    PostDate: '2017-03-10T06:00:00.000Z',
  };
  const fakeNewsHistory = [
    {
      borderColor: '#1e5631',
      backgroundColor: '#fdebd0',
      message: `<h1> 2020 Hamfest </h1>
            <p> January 19, 2020 at the Kane County Fairgrounds. Kelsey has flyers and tickets. Click on the <Link to="/Hamfest">Hamfest</Link> button above for updated information.</p>
            <p>Tickets and Tables can now be ordered through our website.</p>
            <h2>Membership Dues</h2>
            <p>Membership dues are due January 1st. They can be paid at the next club meeting, through the mail or online though the <Link to="/Membership">Join WCRA</Link> page.</p>                                      
            <h2><a href="https://www.facebook.com/groups/267873833946/?ref=bookmarks">Click here for WCRA's Facebook Page</a></h2>`,
      PostDate: '2019-11-16T06:00:00.000Z',
    },
    fakeNews,
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
    it('SET ANNOUNCEMENT HISTORY', () => {
      expect(setAnnounmentHistory(fakeNewsHistory)).to.deep.equal({
        type: 'SET_ANNOUNCEMENT_HISTORY',
        announcements: fakeNewsHistory,
      });
    });
    it('SET LAST ANNOUNCEMENT', () => {
      expect(setLastAnnouncment(fakeNews)).to.deep.equal({
        type: 'SET_LAST_ANNOUNCEMENT',
        announcement: fakeNews,
      });
    });
    it('UPDATE ANNOUNCEMENT', () => {
      expect(updateAnnouncement(fakeNews)).to.deep.equal({
        type: 'UPDATE_ANNOUNCEMENT',
        newPost: fakeNews,
      });
    });
  });
  describe('Thunks', () => {
    it('fetch last announcemnt eventually dispatches set last announcement', async () => {
      mockAxios.onGet('/api/announcement/last').replyOnce(200, fakeNews);
      await store.dispatch(fetchLastAnnouncement());
      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('SET_LAST_ANNOUNCEMENT');
      expect(actions[0].announcement).to.be.deep.equal(fakeNews);
    });
    it('fetch all announcement eventually dispatched set announcement history', async () => {
      mockAxios.onGet('/api/announcement/all').replyOnce(200, fakeNewsHistory);
      await store.dispatch(fetchAllAnnouncement());
      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('SET_ANNOUNCEMENT_HISTORY');
      expect(actions[0].announcements).to.be.deep.equal(fakeNewsHistory);
      expect(actions[0].announcements[1]).to.be.deep.equal(fakeNews);
    });
    it('post new announcement eventually dispatched set last announcement', async () => {
      mockAxios.onPost('/api/announcement/').replyOnce(200, fakeNews);
      await store.dispatch(postNewAnnouncement(fakeNews, []));
      const actions = store.getActions();

      expect(actions[0].type).to.be.equal('SET_LAST_ANNOUNCEMENT');
      expect(actions[0].announcement).to.be.deep.equal(fakeNews);
    });
  });
  describe('Single Annoucement Reducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reducers on SET_LAST_ANNOUNCEMENT', () => {
      const action = { type: 'SET_LAST_ANNOUNCEMENT', announcement: fakeNews };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.lastestNews).to.be.deep.equal(fakeNews);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reducers on UPDATE_ANNOUNCEMENT', () => {
      const action = {
        type: 'UPDATE_ANNOUNCEMENT',
        newPost: { name: 'PostDate', value: '2017-03-10T06:00:00.000Z' },
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.lastestNews.PostDate).to.be.deep.equal(
        '2017-03-10T06:00:00.000Z'
      );
      expect(newState).to.not.be.equal(prevState);
    });
    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', announcement: fakeNews };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.lastestNews).to.not.be.equal(fakeNews);
    });
    it('does not  reduce on SET ANNOUNCEMENT HISTORY', () => {
      const action = {
        type: 'SET_ANNOUNCEMENT_HISTORY',
        announcements: fakeNewsHistory,
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.lastestNews).to.be.deep.equal(prevState.lastestNews);
      expect(newState.lastestNews).to.not.be.equal(fakeNews);
    });
  });
  describe('All AnnoucmentReducer', () => {
    let testStore;

    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reducers on SET_ANNOUNCEMENT_HISTORY', () => {
      const action = {
        type: 'SET_ANNOUNCEMENT_HISTORY',
        announcements: fakeNewsHistory,
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.newsHistory).to.be.deep.equal(fakeNewsHistory);
      expect(newState).to.not.be.equal(prevState);
    });
    it('returns the initial state on default', () => {
      const action = { type: 'SET_PROFILE', announcement: fakeNews };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState).to.be.deep.equal(prevState);
      expect(newState.newsHistory).to.not.be.equal(fakeNewsHistory);
    });
    it('does not  reduce on SET LAST ANNOUNCEMENT', () => {
      const action = { type: 'SET_LAST_ANNOUNCEMENT', announcement: fakeNews };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();

      expect(newState.newsHistory).to.be.deep.equal(prevState.newsHistory);
      expect(newState.newsHistory).to.not.be.equal(fakeNews);
    });
  });
});
