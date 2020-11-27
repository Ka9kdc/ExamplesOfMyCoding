const { expect } = require('chai');
const { db, Annoucement } = require('../../models');
const request = require('supertest');
const app = require('../../index');
const sinon = require('sinon');

//Tests: 6 passing, 0 pending, 0 failing
describe('Anouncement routes', () => {
  before(() => db.sync({ force: true }));
  beforeEach(async () => {
    await Annoucement.create({
      borderColor: '#ff0000',
      backgroundColor: '#00ff00',
      message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
      PostDate: new Date(),
    });
  });
  describe('Get routes', () => {
    it('/api/Announcement/all', async () => {
      const res = await request(app).get('/api/Announcement/all').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].borderColor).to.be.equal('#ff0000');
    });
    it('/api/Announcement/last', async () => {
      const res = await request(app).get('/api/Announcement/last').expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.borderColor).to.be.equal('#ff0000');
    });
  });
  describe('POST routes', () => {
    it('api/Announcement', async () => {
      const res = await request(app)
        .post('/api/Announcement')
        .send({
          borderColor: '#ff0000',
          backgroundColor: '#00ff00',
          message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
          PostDate: new Date(),
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.borderColor).to.be.equal('#ff0000');
    });
  });
  describe('returns 500 if the database is down', () => {
    const UserMethods = [
      'findAll',
      'findOne',
      'findByPk',
      'findOrCreate',
      'create',
      'bulkCreate',
      'destroy',
      'update',
    ];
    beforeEach(() => {
      const error = new Error('OH NO! The database is on fire!');
      UserMethods.forEach((method) => {
        sinon.stub(Annoucement, method).rejects(error);
      });
    });
    afterEach(() => {
      UserMethods.forEach((method) => {
        Annoucement[method].restore();
      });
    });
    it('GET /all', async () => {
      const res = await request(app).get('/api/Announcement/all').timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /last', async () => {
      const res = await request(app).get('/api/Announcement/last').timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/announcement', async () => {
      const res = await request(app)
        .post('/api/Announcement', {
          borderColor: '#ff0000',
          backgroundColor: '#00ff00',
          message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
          PostDate: new Date(),
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
  });
});
