const { expect } = require('chai');
const request = require('supertest');
const { db, User, Member } = require('../../models');
const app = require('../../index');


//Tests 8 passing, 1 pending/failing
describe('/api/user routes', () => {
  before(() => {
    return db.sync({ force: true });
  });
  beforeEach(async () => {
    await Member.create({
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
      RenewalDate: new Date(),
    });
    await Member.create({
      LastName: 'Green',
      FirstName: 'Jane',
      Callsign: 'Ka9Doe',
      Email: 'doe@email.com',
      Phone: '1234567890',
      Street: '123 happy lane',
      City: 'st upidtown',
      State: 'MA',
      Zip: 60606,
      Membership: 'Full',
      DueYear: 2020,
      RenewalDate: new Date(),
    });
    return User.create({
      Name: 'Hannah',
      Email: 'abcde123@abc.com',
      Callsign: 'Ka9ddd',
      password: '123456',
    });
  });
  afterEach(() => db.sync({ force: true }));
  describe('Login routes', () => {
    it('PUT /api/user/login valid user and password', async () => {
      const res = await request(app)
        .put('/api/user/login')
        .send({ Callsign: 'Ka9ddd', password: '123456' })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Email).to.be.equal('abcde123@abc.com');
    });

    it('PUT /api/user/login valid callsign but password does not match', async () => {
      const res = await request(app)
        .put('/api/user/login')
        .send({ Callsign: 'Ka9ddd', password: '1234' })
        .expect(401);

      expect(res.error.text).to.be.equal('Incorrect Password');
    });
    it('PUT /api/user/login must be a valid user', async () => {
        const res = await request(app)
          .put('/api/user/login')
          .send({ Callsign: 'Ka9doo', password: '123456' })
          .expect(401);
  
        expect(res.error.text).to.be.equal('User not found');
      });
  });
  describe('SignUp routes', () => {
    it('POST /api/user/signup creates a new user', async () => {
      const res = await request(app)
        .post('/api/user/signup')
        .send({
          Name: 'Jane',
          Callsign: 'Ka9Doe',
          Email: 'doe@email.com',
          password: 'doe',
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Name).to.be.equal('Jane');
    });
    it('POST /api/user/signup cant make an account with a current users callsign', async () => {
      const res = await request(app)
        .post('/api/user/signup')
        .send({
          Name: 'anna',
          Email: 'abc123@abc.com',
          Callsign: 'Ka9ddd',
          password: '123456',
        })
        .expect(401);
      expect(res.error.text).to.be.equal('User already exists');
    });
    xit('POST /api/user/signup cant make an account with a current users email address', async () => {
      const res = await request(app)
        .post('/api/user/signup')
        .send({
          Name: 'Jane',
          Email: 'abcde123@abc.com',
          Callsign: 'Ka9Doe',
          password: '12456',
        })
        .expect(401);
      expect(res.error.text).to.be.equal('User already exists');
    });
    it('POST /api/user/signup must be a member', async () => {
      const res = await request(app)
        .post('/api/user/signup')
        .send({
          Name: 'anna',
          Email: 'abc123@abc.com',
          Callsign: 'Ka9dda',
          password: '12456',
        })
        .expect(404);
      expect(res.error.text).to.be.equal('Membership not found');
    });
  });
  describe('response with 500 if database is down', () => {
    it('PUT /api/user/login', async () => {
      const res = await request(app)
        .put('/api/user/login', { Callsign: 'Ka9ddd', password: '123456' }).timeout(200);

      expect(res.status).to.equal(500);
    });
    it('POST /api/user/signup creates a new user', async () => {
      const res = await request(app)
        .post('/api/user/signup', {
            Name: 'Jane',
          Callsign: 'Ka9Doe',
          Email: 'doe@email.com',
          password: 'doe',
        }).timeout(200);

      expect(res.status).to.equal(500);
    });
  })
    
});
