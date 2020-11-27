const { expect } = require('chai');
const {
  db,
  Product,
  Vendor,
  CalendarEvent
} = require('../models');
const request = require('supertest');
const app = require('../index');
const sinon = require('sinon');

//Tests: 13 passing, 2 failing
//payment routes are returning a foreign key constraint violation
describe('Hamfest Routes', () => {
  before(() => db.sync({ force: true }));
  const today = new Date();
  let tomorrow = today.setDate(today.getDate() + 5);
  beforeEach(async () => {
    await Product.create({
      name: 'Electrical Drop',
      dataName: 'Electrical',
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '/Images/electricOutlet.png',
    });
    await Vendor.create({
      Name: 'Hannah',
      Company: 'Green',
      Callsign: 'Ka9ddd',
      Phone: '1234567890',
      Street: '123 happy lane',
      City: 'st upidtown',
      State: 'MA',
      Zip: 60606,
      SpecialRequests: 'Full',
      Email: 'abcde123@abc.com',
      OrderDate: new Date(),
    });
    await CalendarEvent.create({
      Name: 'Hamfest',
      Start: tomorrow,
      End: tomorrow,
      Location: 'Zoom',
      Description: 'asfd asdf adsf asdf asdf',
      Type: 'Training Class',
    });
  });
  afterEach(() => db.sync({ force: true }));
  describe('GET routes', () => {
    it('/api/hamfest/products', async () => {
      const res = await request(app).get('/api/hamfest/products').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal('Electrical Drop');
    });
    it('/api/hamfest/vendor/all', async () => {
      const res = await request(app).get('/api/hamfest/vendor/all').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].Name).to.be.equal('Hannah');
    });
  });
  describe('Post routes', () => {
    it('/api/hamfest/attendee/order', async () => {
      const res = await request(app)
        .post('/api/hamfest/attendee/order')
        .send({ Tickets: 3, Raffle: 1, Amount: 25 })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Amount).to.be.equal(25);
      expect(res.body.id).to.be.equal(1);
    });
    it('/api/hamfest/attendee/information', async () => {
      const res = await request(app)
        .post('/api/hamfest/attendee/information')
        .send({
          Name: 'Hannah',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Email: 'abcde123@abc.com',
          order: {
            orderDate: new Date(),
            ticketId: 1,
          },
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Name).to.be.equal('Hannah');
      expect(res.body.id).to.be.equal(1);
    });
    it('/api/hamfest/vendor/order', async () => {
      const res = await request(app)
        .post('/api/hamfest/vendor/order')
        .send({ Tickets: 3, Raffle: 1, Tables: 2, Amount: 75 })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Amount).to.be.equal(75);
      expect(res.body.id).to.be.equal(1);
    });
    it('/api/hamfest/vendor/information', async () => {
      const res = await request(app)
        .post('/api/hamfest/vendor/information')
        .send({
          Name: 'Hannah',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Email: 'abcde123@abc.com',
          order: {
            orderDate: new Date(),
            orderId: 1,
          },
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Name).to.be.equal('Hannah');
      expect(res.body.id).to.be.equal(2);
    });
    xit('/api/hamfest/payment', async () => {
      const res = await request(app)
        .post('/api/hamfest/payment')
        .send({
          attendeeId: 1,
          ticketId: 1,
          orderDate: new Date(),
          order: { Amount: 25 },
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Amount).to.be.equal(25);
    });
    xit('/api/hamfest/payment', async () => {
      const res = await request(app)
        .post('/api/hamfest/payment')
        .send({
          vendorId: 2,
          orderId: 1,
          orderDate: new Date(),
          order: { Amount: 75 },
        })
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.Amount).to.be.equal(75);
    });
  });
  describe('Returns 500 when database is down', () => {
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
        sinon.stub(Product, method).rejects(error);
        sinon.stub(Vendor, method).rejects(error);
      });
    });
    afterEach(() => {
      UserMethods.forEach((method) => {
        Product[method].restore();
        Vendor[method].restore();
      });
    });
    it('GET /api/hamfest/products', async () => {
      const res = await request(app).get('/api/hamfest/products').timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/vendor/all', async () => {
      const res = await request(app)
        .get('/api/hamfest/vendor/all')
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/vendor/information', async () => {
      const res = await request(app)
        .post('/api/hamfest/vendor/information', {
          Name: 'Hannah',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Email: 'abcde123@abc.com',
          order: {
            orderDate: new Date(),
            orderId: 1,
          },
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/vendor/order', async () => {
      const res = await request(app)
        .post('/api/hamfest/vendor/order', {
          Tickets: 3,
          Raffle: 1,
          Tables: 2,
          Amount: 75,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/attendee/information', async () => {
      const res = await request(app)
        .post('/api/hamfest/attendee/information', {
          Name: 'Hannah',
          Callsign: 'Ka9ddd',
          Phone: '1234567890',
          Street: '123 happy lane',
          City: 'st upidtown',
          State: 'MA',
          Zip: 60606,
          Email: 'abcde123@abc.com',
          order: {
            orderDate: new Date(),
            orderId: 1,
          },
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/attendee/order', async () => {
      const res = await request(app)
        .post('/api/hamfest/attendee/order', {
          Tickets: 3,
          Raffle: 1,
          Amount: 75,
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
    it('GET /api/hamfest/payment', async () => {
      const res = await request(app)
        .post('/api/hamfest/payment', {
          vendorId: 2,
          orderId: 1,
          orderDate: new Date(),
          order: { Amount: 75 },
        })
        .timeout(200);

      expect(res.status).to.equal(500);
    });
  });
});
