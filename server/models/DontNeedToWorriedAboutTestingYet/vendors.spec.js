const { expect } = require('chai');
const db = require('../db');
const { Vendor } = require('./vendors');

//Still missing phone number, OrderDate, and SpecialRequests type tests
describe('Vendor Model', () => {
  before(() => db.sync({ force: true }));

  let newVendor;
  beforeEach(() => {
    newVendor = {
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
    };
  });

  afterEach(() => db.sync({ force: true }));
  describe('fields', () => {
    let testVendor;
    beforeEach(async () => {
      newVendor.notARealAttribute = 'does not compute';
      testVendor = await Vendor.create(newVendor);
    });

    it('has a First name, last name and callsign fields', () => {
      expect(testVendor.Name).to.equal('Hannah');
      expect(testVendor.Company).to.equal('Green');
      expect(testVendor.Callsign).to.equal('Ka9ddd');
      expect(testVendor.notARealAttribute).to.equal(undefined);
    });
    it('has a Phone, Street and  City fields', () => {
      expect(testVendor.Phone).to.equal('1234567890');
      expect(testVendor.Street).to.equal('123 happy lane');
      expect(testVendor.City).to.equal('st upidtown');
      expect(testVendor.notARealAttribute).to.equal(undefined);
    });
    it('has a State, Zip and  SpecialRequests fields', () => {
      expect(testVendor.State).to.equal('MA');
      expect(testVendor.Zip).to.equal(60606);
      expect(testVendor.SpecialRequests).to.equal('Full');
      expect(testVendor.notARealAttribute).to.equal(undefined);
    });
    it('has a Email, DueYear and  Date fields', async () => {
      expect(testVendor.Email).to.equal('abcde123@abc.com');
      expect(testVendor.OrderDate).to.be.exist;
      expect(testVendor.notARealAttribute).to.equal(undefined);
    });
  });
  describe('Name field', () => {
    it('Name is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Name).to.equal('Hannah');
    });
    xit('Name cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Name cannot be null');
      }
    });
    xit('Name cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Name = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Name failed');
      }
    });
  });
  describe('Company', () => {
    it('Company is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Company).to.equal('Green');
    });
    xit('Company cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a Last name');
      } catch (err) {
        expect(err.message).to.contain('Company cannot be null');
      }
    });
    xit('Company cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Company = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Company');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Company failed');
      }
    });
  });
  describe('callsign', () => {
    //is it a vaild callsign?
    it('Callsign is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Callsign).to.equal('Ka9ddd');
    });

    xit('Callsign cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a callsign');
      } catch (err) {
        expect(err.message).to.contain('Callsign cannot be null');
      }
    });

    xit('Callsign cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Callsign = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Callsign failed'
        );
      }
    });
  });
  describe('Street', () => {
    it('Street is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Street).to.equal('123 happy lane');
    });
    it('Street cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a street');
      } catch (err) {
        expect(err.message).to.contain('Street cannot be null');
      }
    });

    it('Street cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Street = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Street');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Street failed');
      }
    });
  });
  describe('city', () => {
    it('City is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.City).to.equal('st upidtown');
    });
    it('City cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a city');
      } catch (err) {
        expect(err.message).to.contain('City cannot be null');
      }
    });

    it('City cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.City = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty City');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on City failed');
      }
    });
  });
  describe('State', () => {
    it('State is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.State).to.equal('MA');
    });

    it('State cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        Zip: 60606,
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a state');
      } catch (err) {
        expect(err.message).to.contain('State cannot be null');
      }
    });

    it('State cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.State = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty State');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on State failed');
      }
    });
  });
  describe('Zip', () => {
    it('Zip is a Interger', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Zip).to.equal(60606);
    });

    it('Zip cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        SpecialRequests: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without zip');
      } catch (err) {
        expect(err.message).to.contain('Zip cannot be null');
      }
    });

    it('Zip cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Zip = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Zip failed');
      }
    });
  });
  describe('Email', () => {
    it('Email is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Email).to.equal('abcde123@abc.com');
    });
    it('Email cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        SpecialRequests: 'Full',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a email');
      } catch (err) {
        expect(err.message).to.contain('Email cannot be null');
      }
    });

    it('Email cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Email = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Email failed');
      }
    });
    it('Email must be an email address', async () => {
      newVendor.Email = 'Hello';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with a non Email');
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on Email failed');
      }
    });
  });
});
