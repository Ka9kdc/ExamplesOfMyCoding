const { expect } = require('chai');
const db = require('./db');
const { Member } = require('./member');

//Still missing phone number, Due year, and membership type tests
describe('Member Model', () => {
  before(() => db.sync({ force: true }));

  let newMember;
  beforeEach(() => {
    newMember = {
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
      DueYear: '2020',
      RenewalDate: new Date(),
    };
  });

  afterEach(() => db.sync({ force: true }));
  describe('fields', () => {
    let testMember;
    beforeEach(async () => {
      newMember.notARealAttribute = 'does not compute';
      testMember = await Member.create(newMember);
    });

    it('has a First name, last name and callsign fields', () => {
      expect(testMember.FirstName).to.equal('Hannah');
      expect(testMember.LastName).to.equal('Green');
      expect(testMember.Callsign).to.equal('Ka9ddd');
      expect(testMember.notARealAttribute).to.equal(undefined);
    });
    it('has a Phone, Street and  City fields', () => {
      expect(testMember.Phone).to.equal('1234567890');
      expect(testMember.Street).to.equal('123 happy lane');
      expect(testMember.City).to.equal('st upidtown');
      expect(testMember.notARealAttribute).to.equal(undefined);
    });
    it('has a State, Zip and  Membership fields', () => {
      expect(testMember.State).to.equal('MA');
      expect(testMember.Zip).to.equal(60606);
      expect(testMember.Membership).to.equal('Full');
      expect(testMember.notARealAttribute).to.equal(undefined);
    });
    it('has a Email, DueYear and  Date fields', async () => {
      expect(testMember.Email).to.equal('abcde123@abc.com');
      expect(testMember.DueYear).to.equal(2020);
      expect(testMember.RenewalDate).to.be.exist;
      expect(testMember.notARealAttribute).to.equal(undefined);
    });
  });
  describe('FirstName field', () => {
    it('FirstName is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.FirstName).to.equal('Hannah');
    });
    it('FirstName cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('FirstName cannot be null');
      }
    });
    it('FirstName cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.FirstName = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty FirstName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on FirstName failed'
        );
      }
    });
  });
  describe('Last name', () => {
    it('LastName is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.LastName).to.equal('Green');
    });
    it('LastName cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a Last name');
      } catch (err) {
        expect(err.message).to.contain('LastName cannot be null');
      }
    });
    it('LastName cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.LastName = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty LastName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on LastName failed'
        );
      }
    });
  });
  describe('callsign', () => {
    //is it a vaild callsign?
    it('Callsign is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.Callsign).to.equal('Ka9ddd');
    });

    it('Callsign cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a callsign');
      } catch (err) {
        expect(err.message).to.contain('Callsign cannot be null');
      }
    });

    it('Callsign cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.Callsign = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
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
      const hannah = await Member.create(newMember);
      expect(hannah.Street).to.equal('123 happy lane');
    });
    it('Street cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a street');
      } catch (err) {
        expect(err.message).to.contain('Street cannot be null');
      }
    });

    it('Street cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.Street = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty Street');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Street failed');
      }
    });
  });
  describe('city', () => {
    it('City is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.City).to.equal('st upidtown');
    });
    it('City cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a city');
      } catch (err) {
        expect(err.message).to.contain('City cannot be null');
      }
    });

    it('City cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.City = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty City');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on City failed');
      }
    });
  });
  describe('State', () => {
    it('State is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.State).to.equal('MA');
    });

    it('State cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        Zip: 60606,
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a state');
      } catch (err) {
        expect(err.message).to.contain('State cannot be null');
      }
    });

    it('State cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.State = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty State');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on State failed');
      }
    });
  });
  describe('Zip', () => {
    it('Zip is a Interger', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.Zip).to.equal(60606);
    });

    it('Zip cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Membership: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without zip');
      } catch (err) {
        expect(err.message).to.contain('Zip cannot be null');
      }
    });

    it('Zip cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.Zip = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Zip failed');
      }
    });
  });
  describe('Email', () => {
    it('Email is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.Email).to.equal('abcde123@abc.com');
    });
    it('Email cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Membership: 'Full',
        DueYear: '2020',
        RenewalDate: new Date(),
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a email');
      } catch (err) {
        expect(err.message).to.contain('Email cannot be null');
      }
    });

    it('Email cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.Email = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Email failed');
      }
    });
    it('Email must be an email address', async () => {
      newMember.Email = 'Hello';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on Email failed');
      }
    });
  });
});
