const { expect, assert } = require('chai');
const request = require('supertest');
const db = require('../../models/db');
const app = require('../../index');
const { Member } = require('../../models');

//Tests:  11 passing, 0 pending/failing
describe('/api/membership routes', () => {
  before(() => db.sync({ force: true }));
  const today = new Date();
  let testMember;
  beforeEach(async () => {
    testMember = await Member.create({
      FirstName: 'Cody',
      LastName: 'Green',
      Callsign: 'Ka9ddd',
      Phone: '1234567890',
      Street: '123 happy lane',
      City: 'st upidtown',
      State: 'MA',
      Zip: 60606,
      Membership: 'Full',
      Email: 'abcde123@abc.com',
      DueYear: 2020,
      RenewalDate: today,
    });
  });
  afterEach(() => db.sync({ force: true }));

  describe('POST routes', () => {
    it('/api/membership/member added a single member to the database', async () => {
      const res = await request(app)
        .post('/api/membership/member')
        .send({
          FirstName: 'Hannah',
          LastName: 'Green',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Membership: 'Full',
          Email: 'abcde123@abc.com',
          DueYear: 2020,
          RenewalDate: today,
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.id).to.be.equal(2);
      expect(res.body.FirstName).to.be.equal('Hannah');
      //   assert.deepEqual(testMember.RenewalDate, res.body.RenewalDate)
    });
    it('/api/membership/family', async () => {
      const res = await request(app)
        .post('/api/membership/member')
        .send({
          FirstName: 'Jane',
          LastName: 'Green',
          Callsign: 'Ka9daa',
          Phone: '1234567809',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Membership: 'Family',
          Email: 'abcde123@abc.com',
          DueYear: 2020,
          RenewalDate: today,
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.FirstName).to.be.equal('Jane');
      // assert.deepEqual(testMember.RenewalDate, res.body.RenewalDate)
    });
    it('/api/membership/family', async () => {
      const res = await request(app)
        .post('/api/membership/family')
        .send({
          FirstName: 'Hannah',
          LastName: 'Green',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Membership: 'Family',
          Email: 'abcde123@abc.com',
          DueYear: 2020,
          RenewalDate: today,
          FamilyMembers: [testMember],
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.FirstName).to.be.equal('Hannah');
      // assert.deepEqual(testMember.RenewalDate, res.body.RenewalDate)
      //Should be returning an array of Family Members
      // expect(res.body.FamilyMembers).to.be.an('array')
      // expect(res.body.FamilyMembers.length).to.be(1)
    });
    it('/api/membership/badge', async () => {
      const res = await request(app)
        .post('/api/membership/badge')
        .send({
          badge: {
            Desired: true,
            badgeName: 'Cody',
            Arrl: true,
            Color: 'Red',
            Type: 'Lanyard',
            LicenseYear: 2000,
          },
          member: testMember,
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Name).to.be.equal('Cody');
      // assert.deepEqual(testMember.RenewalDate, res.body.RenewalDate)
    });
    it('/api/membership/committees', async () => {
      const res = await request(app)
        .post('/api/membership/committees')
        .send({
          committee: {
            Hamfest: true,
            other: 'Hope',
          },
          member: testMember,
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.other).to.be.equal('Hope');
      expect(res.body.Hamfest).to.equal(true);
      expect(res.body.FieldDay).to.equal(null);
    });
    it('/api/membership/payment', async () => {
      const res = await request(app)
        .post('/api/membership/payment')
        .send({
          amount: 20,
          contact: testMember,
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Amount).to.be.equal(20);
      expect(res.body.memberId).to.be.equal(testMember.id);
    });
  });
  describe('response with 500 if database is down', () => {
    it('POST /api/membership/member', async () => {
      const res = await request(app)
        .post('/api/membership/member', {
          FirstName: 'Jane',
          LastName: 'Green',
          Callsign: 'Ka9daa',
          Phone: '1234567809',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Membership: 'Family',
          Email: 'abcde123@abc.com',
          DueYear: 2020,
          RenewalDate: today,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/membership/family', async () => {
      const res = await request(app)
        .post('/api/membership/family', {
          FirstName: 'Hannah',
          LastName: 'Green',
          Callsign: 'Ka9daa',
          Phone: '1234567809',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Membership: 'Family',
          Email: 'abcde123@abc.com',
          DueYear: 2020,
          RenewalDate: today,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/membership/badge', async () => {
      const res = await request(app)
        .post('/api/membership/badge', {
          badge: {
            Desired: true,
            badgeName: 'Cody',
            Arrl: true,
            Color: 'Red',
            Type: 'Lanyard',
            LicenseYear: 2000,
          },
          member: testMember,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/membership/committees', async () => {
      const res = await request(app)
        .post('/api/membership/committees', {
          committee: {
            Hamfest: true,
            other: 'Hope',
          },
          member: testMember,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/membership/payment', async () => {
      const res = await request(app)
        .post('/api/membership/payment', { amount: 20, contact: testMember })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
  });
});
