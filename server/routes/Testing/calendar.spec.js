const {expect} = require('chai')
const {db, CalendarEvent} = require('../../models')
const app = require('../..')
const request = require('supertest')
const sinon = require('sinon')

//Tests: 8 passing 0 pending,
//Get routes are not timing out and returning 500
describe('Calendar Events Routes', () => {
    before(() => db.sync({force: true}))
    const today = new Date()
    let tomorrow = today.setDate(today.getDate() + 1)
    beforeEach(async () => {
        await CalendarEvent.create({ Name: 'Club Meeting',
        Start: tomorrow,
        End: tomorrow,
        Location: 'Zoom',
        Description: 'asfd asdf adsf asdf asdf',
        Type: 'Training Class'})
    })
    describe('GET routes', () => {
        it('/api/calendar/', async () => {
            const res = await request(app)
            .get('/api/calendar/')
            .expect(200)

            expect(res.body).to.be.an('array')
            expect(res.body[0].Location).to.be.equal('Zoom')
        })
        it('/api/calendar/month', async () => {
            const res = await request(app)
            .get('/api/calendar/month')
            .expect(200)

            expect(res.body).to.be.an('array')
            expect(res.body[0].Location).to.be.equal('Zoom')
        })
        it('/api/calendar/training', async () => {
            const res = await request(app)
            .get('/api/calendar/training')
            .expect(200)

            expect(res.body).to.be.an('array')
            expect(res.body[0].Location).to.be.equal('Zoom')
        })
    })
    describe('POST routes', () => {
        it('/api/calendar/newEvent', async () => {
            const res = await request(app)
            .post('/api/calendar/newEvent')
            .send({
                Name: 'Club Meeting',
      Start: new Date(),
      End: new Date(),
      Location: 'Zoom',
      Description: 'asfd asdf adsf asdf asdf',
      Type: 'Training Class',
            })
            .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.Location).to.be.equal('Zoom')
        })
    })
    describe('returns 500 when database is done', () => {
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
              sinon.stub(CalendarEvent, method).rejects(error);
            });
          });
          afterEach(() => {
            UserMethods.forEach((method) => {
              CalendarEvent[method].restore();
            });
          });
        it('get /api/calendar/', async () => {
            const res = await request(app).get('/api/calendar/').timeout(200)

            expect(res.status).to.equal(500)
        })
        it('get /api/calendar/month', async () => {
            const res = await request(app).get('/api/calendar/month').timeout(200)

            expect(res.status).to.equal(500)
        })
        it('GET /api/calendar/training', async () => {
            const res = await request(app).get('/api/calendar/training').timeout(200)

            expect(res.status).to.equal(500)
        })
        it('POST /api/calendar/newEvent', async () => {
            const res = await request(app).post('/api/calendar/newEvent', {
                Name: 'Club Meeting',
                Start: tomorrow,
                End: tomorrow,
                Location: 'Zoom',
                Description: 'asfd asdf adsf asdf asdf',
                Type: 'Training Class'
            }).timeout(200)

            expect(res.status).to.equal(500)
        })
    })
})
