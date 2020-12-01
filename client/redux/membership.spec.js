import { expect } from 'chai';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import appReducer from './index';
import {
  addFamilyMember,
  setAmount,
  submitFamilyMember,
  submitMember,
  updateMemberBadge,
  updateMemberCommittees,
  updateMemberInfo,
} from './membership';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

//Tests: 22 passsing 0pending/failing
describe('Membership - redux', () => {
  let store;
  let mockAxios;
  const initialBadge = {
    Desired: false,
    badgeType: 'NoPreference',
    ArrlLogo: false,
    Color: '',
    badgeName: '',
    LicenseYear: 2020,
  };
  const initialContact = {
    FirstName: '',
    LastName: '',
    Callsign: '',
    Phone: '',
    Street: '',
    City: 'Wheaton',
    State: 'IL',
    Zip: 60187,
    Membership: 'Full',
    Email: '',
    RenewalDate: '',
    DueYear: '2021',
    FamilyMembers: [],
  };
  const initialCommettees = {
    Hamfest: false,
    FieldDay: false,
    PublicService: false,
    MembershipCommittee: false,
    Publicity: false,
    Fundraising: false,
    MeetingPrograms: false,
    ClubOfficer: false,
    HamLetter: false,
    Website: false,
    csuTrailer: false,
    Repeaters: false,
    Net: false,
    Training: false,
    YouthPrograms: false,
    VEtesting: false,
    other: '',
  };
  const initialState = {
    member: {
      badge: initialBadge,
      contact: initialContact,
      committees: initialCommettees,
      amount: 0,
    },
  };
  const fakeMemeberInfo = { FirstName: 'kelsey' };
  const fakeMemeberBADGE = { Desired: false };
  const fakeMemeberCOMMITTEES = { Hamfest: false };
  const fakeFamilyMember = {
    contact: { FirstName: 'kelsey' },
    badge: fakeMemeberBADGE,
    committees: fakeMemeberCOMMITTEES,
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
    it('updateMemberInfo - UPDATE_MEMBER_INFO', () => {
      expect(updateMemberInfo(fakeMemeberInfo)).to.be.deep.equal({
        type: 'UPDATE_MEMBER_INFO',
        update: fakeMemeberInfo,
      });
    });
    it('updateMemberBadge - UPDATE_MEMBER_BADGE', () => {
      expect(updateMemberBadge(fakeMemeberBADGE)).to.be.deep.equal({
        type: 'UPDATE_MEMBER_BADGE',
        update: fakeMemeberBADGE,
      });
    });
    it('updateMemberCOMMITTEES - UPDATE_COMMITTEES', () => {
      expect(updateMemberCommittees(fakeMemeberCOMMITTEES)).to.be.deep.equal({
        type: 'UPDATE_COMMITTEES',
        update: fakeMemeberCOMMITTEES,
      });
    });
    it('addFamilyMemeber - ADD_FAMILY_MEMBER', () => {
      expect(addFamilyMember(fakeFamilyMember)).to.be.deep.equal({
        type: 'ADD_FAMILY_MEMBER',
        family: fakeFamilyMember,
      });
    });
    it('setAmount - SET_AMOUNT - Senior = 13', () => {
      expect(setAmount('Senior')).to.be.deep.equal({
        type: 'SET_AMOUNT',
        amount: 13,
      });
    });
    it('setAmount - SET_AMOUNT - full = 26', () => {
      expect(setAmount('Full')).to.be.deep.equal({
        type: 'SET_AMOUNT',
        amount: 26,
      });
    });
    it('setAmount - SET_AMOUNT - Family = 39', () => {
      expect(setAmount('Family')).to.be.deep.equal({
        type: 'SET_AMOUNT',
        amount: 39,
      });
    });
    it('setAmount - SET_AMOUNT - Lifetime = 0', () => {
      expect(setAmount('Lifetime')).to.be.deep.equal({
        type: 'SET_AMOUNT',
        amount: 0,
      });
    });
  });
  describe('thunks', () => {
    it('submitMember - Eventually dispatches UPDATE_MEMBER_INFO -no badge or committee', async () => {
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/member').replyOnce(200, fakeMember);
      await store.dispatch(submitMember(fakeMember, []));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_MEMBER_INFO');
      expect(actions[0].update).to.be.deep.equal(fakeMember);
    });
    it('submitMember - Eventually dispatches UPDATE_MEMBER_INFO - badge', async () => {
      fakeMemeberBADGE.Desired = true;
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/member').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/badge').replyOnce(200, fakeMember);
      await store.dispatch(submitMember(fakeMember, []));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_MEMBER_INFO');
      expect(actions[0].update).to.be.deep.equal(fakeMember);
    });
    it('submitMember - Eventually dispatches UPDATE_MEMBER_INFO - badge', async () => {
      fakeMemeberBADGE.Desired = true;
      fakeMemeberCOMMITTEES.Hamfest = true;
      fakeMemeberCOMMITTEES.other = 'Help';
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/member').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/badge').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/committees').replyOnce(200, fakeMember);
      await store.dispatch(submitMember(fakeMember, []));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_MEMBER_INFO');
      expect(actions[0].update).to.be.deep.equal(fakeMember);
    });
    it('submitMember - Eventually dispatches UPDATE_MEMBER_INFO - badge', async () => {
      fakeMemeberBADGE.Desired = false;
      fakeMemeberCOMMITTEES.Hamfest = true;
      fakeMemeberCOMMITTEES.other = 'Help';
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/member').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/badge').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/committees').replyOnce(200, fakeMember);
      await store.dispatch(submitMember(fakeMember, []));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('UPDATE_MEMBER_INFO');
      expect(actions[0].update).to.be.deep.equal(fakeMember);
    });
    it('submitFamilyMember - Eventually dispatches ADD_MEMBER_INFO -no badge or committee', async () => {
      fakeMemeberInfo.family = [fakeFamilyMember];
      fakeMemeberCOMMITTEES.Hamfest = false;
      fakeMemeberCOMMITTEES.other = '';
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/family').replyOnce(200, fakeMember);
      await store.dispatch(submitFamilyMember(fakeMember));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_FAMILY_MEMBER');
      expect(actions[0].family).to.be.deep.equal(fakeMember);
    });
    it('submitFamilyMember - Eventually dispatches ADD_MEMBER_INFO -  badge', async () => {
      fakeMemeberBADGE.Desired = true;

      fakeMemeberInfo.family = [fakeFamilyMember];
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/family').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/badge').replyOnce(200, fakeMember);
      await store.dispatch(submitFamilyMember(fakeMember));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_FAMILY_MEMBER');
      expect(actions[0].family).to.be.deep.equal(fakeMember);
    });
    it('submitFamilyMember - Eventually dispatches ADD_MEMBER_INFO -  badge and committees', async () => {
      fakeMemeberBADGE.Desired = true;
      fakeMemeberCOMMITTEES.Hamfest = true;
      fakeMemeberCOMMITTEES.other = 'Help';
      fakeMemeberInfo.family = [fakeFamilyMember];
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/family').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/badge').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/committees').replyOnce(200, fakeMember);
      await store.dispatch(submitFamilyMember(fakeMember));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_FAMILY_MEMBER');
      expect(actions[0].family).to.be.deep.equal(fakeMember);
    });
    it('submitFamilyMember - Eventually dispatches ADD_MEMBER_INFO - no badge, committees', async () => {
      fakeMemeberBADGE.Desired = false;
      fakeMemeberCOMMITTEES.Hamfest = true;
      fakeMemeberCOMMITTEES.other = 'Help';
      fakeMemeberInfo.family = [fakeFamilyMember];
      const fakeMember = {
        badge: fakeMemeberBADGE,
        committees: fakeMemeberCOMMITTEES,
        contact: fakeMemeberInfo,
      };
      mockAxios.onPost('/api/membership/family').replyOnce(200, fakeMember);
      mockAxios.onPost('/api/membership/committees').replyOnce(200, fakeMember);
      await store.dispatch(submitFamilyMember(fakeMember));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('ADD_FAMILY_MEMBER');
      expect(actions[0].family).to.be.deep.equal(fakeMember);
    });
  });
  describe('Member reducer', () => {
    let testStore;
    beforeEach(() => {
      testStore = createStore(appReducer);
    });
    it('reduces on UPDATE_MEMBER_INFO', () => {
      const action = {
        type: 'UPDATE_MEMBER_INFO',
        update: { FirstName: 'kelsey' },
      };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      initialContact.FirstName = 'kelsey';
      expect(newState.member).to.be.deep.equal({
        badge: initialBadge,
        contact: initialContact,
        committees: initialCommettees,
        amount: 0,
      });
      expect(newState.member.contact).to.be.deep.equal(initialContact);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduces on UPDATE_MEMBER_BADGE', () => {
      const action = { type: 'UPDATE_MEMBER_BADGE', update: { Desired: true } };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      initialContact.FirstName = '';
      initialBadge.Desired = true;
      expect(newState.member).to.be.deep.equal({
        badge: initialBadge,
        contact: initialContact,
        committees: initialCommettees,
        amount: 0,
      });
      expect(newState.member.badge).to.be.deep.equal(initialBadge);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduces on UPDATE_COMMITTEES', () => {
      const action = { type: 'UPDATE_COMMITTEES', update: { Hamfest: true } };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      initialCommettees.Hamfest = true;
      initialBadge.Desired = false;
      expect(newState.member).to.be.deep.equal({
        badge: initialBadge,
        contact: initialContact,
        committees: initialCommettees,
        amount: 0,
      });
      expect(newState.member.committees).to.be.deep.equal(initialCommettees);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduces on ADD_FAMILY_MEMBER', () => {
      const action = { type: 'ADD_FAMILY_MEMBER', family: fakeFamilyMember };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      initialContact.FamilyMembers = [fakeFamilyMember];
      initialCommettees.Hamfest = false;
      expect(newState.member).to.be.deep.equal({
        badge: initialBadge,
        contact: initialContact,
        committees: initialCommettees,
        amount: 0,
      });
      expect(newState.member.contact).to.be.deep.equal(initialContact);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduces on SET_AMOUNT', () => {
      const action = { type: 'SET_AMOUNT', amount: 26 };

      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      initialContact.FamilyMembers = [];
      expect(newState.member).to.be.deep.equal({
        badge: initialBadge,
        contact: initialContact,
        committees: initialCommettees,
        amount: 26,
      });
      expect(newState.member.amount).to.be.equal(26);
      expect(newState).to.not.be.equal(prevState);
    });
    it('reduce the initial state by default', () => {
      const action = { type: 'GET_AMOUNT', amount: 13 };
      const prevState = testStore.getState();
      testStore.dispatch(action);
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal(prevState);
      expect(newState.member.amount).to.not.equal(13);
    });
  });
});
