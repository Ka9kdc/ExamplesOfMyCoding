import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mock = new MockAdapter(axios);

const app = require('../../server');
const agent = require('supertest')(app);

const mockOfficerHistory = [];
const mockLastAnnouncement = {};
const mockAnnouncement = [mockLastAnnouncement, {}];
beforeEach(() => {
  mock.onGet('/api/hamfest');
  mock.onGet('api/user');

  //GET Officer History
  mock.onGet('/api/officerHistory/').reply(200, mockOfficerHistory);

  //GET All announcements
  mock.onGet('/api/announcement/all').reply(200, mockAnnouncement);

  //Get Last announcement
  mock.onGet('/api/announcement/last').reply(200, mockLastAnnouncement);
  mock.onGet('/api/calendar');
});
