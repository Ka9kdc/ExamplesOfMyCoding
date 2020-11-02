'use strict'
const {expect} = require('chai')
const { OfficerHistory, Product } = require('../server/models')

const seed = require('./seed')

describe('seed script', () => {
    it('completes successfully', seed)
    it('populates the database with at least four products', async () => {
        const hamfestProducts = await Product.findAll()
        expect(hamfestProducts).to.have.lengthOf.at.least(4)
    })
    it('populates the database with at least 70 years of officer data', async () => {
        const officerHistory = await OfficerHistory.findAll()
        expect(officerHistory).to.have.lengthOf.at.least(70)
    })
})