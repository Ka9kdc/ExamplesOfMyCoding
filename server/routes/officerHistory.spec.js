const {expect} = require('chai')
const request = require('supertest')
const {db, OfficerHistory} = require('../models')
const app = require('../index')


describe('/api/OfficerHistory routes', () => {
    before(async () =>  {
        await db.sync({force: true})
    })
    beforeEach(async () => {
        await OfficerHistory.create({
            startYear: 1948,
            endYear: 1949,
            President: 'D.C.Burger, W9MYK',
            VicePresident: 'Frank Golder, W9AAM',
            Secretary: 'Craig Allen, W9IHT',
            Treasurer: 'Alice Newcomb, W9QMS',
            Custodian: 'Unknown',
          })
          await OfficerHistory.create({
            startYear: 1949,
            endYear: 1950,
            President: 'D.C.Burger, W9MYK',
            VicePresident: 'Unknown',
            Secretary: 'Unknown',
            Treasurer: 'Robert E. Edson, W9EHK',
            Custodian: 'Unknown',
          })
          return OfficerHistory.create({
            startYear: 1950,
            endYear: 1951,
            President: 'Unknown',
            VicePresident: 'Unknown',
            Secretary: 'Unknown',
            Treasurer: 'Unknown',
            Custodian: 'Unknown',
          })
        })
    it('GET /api/officerHistory/', async () => {
        const res = await request(app)
        .get('/api/officerHistory/')
        .expect(200)

        expect(res.body).to.be.an('array')
        expect(res.body[2].President).to.be.equal('D.C.Burger, W9MYK')
        expect(res.body[1].VicePresident).to.be.equal('Unknown')
        expect(res.body[0].Secretary).to.be.equal('Unknown')
    })
})