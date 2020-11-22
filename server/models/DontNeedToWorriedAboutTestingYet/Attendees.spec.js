const { expect, assert } = require('chai');
const db = require('../db');
const { Attendee } = require('./Attendees');

//test 51 passing -> 18 pending
describe('Attendee Model', () => {
  before(() => db.sync({ force: true }));

  let newAttendee;
  beforeEach(() => {
    newAttendee = {
      Name: 'Hannah',
      Callsign: 'Ka9ddd',
      Phone: '1234567890',
      Street: '123 happy lane',
      City: 'st upidtown',
      State: 'MA',
      Zip: 60606,
      Email: 'abcde123@abc.com',
      OrderDate: new Date(),
    };
  });

  afterEach(() => db.sync({ force: true }));
  describe('fields', () => {
    let testAttendee;
    beforeEach(async () => {
      newAttendee.notARealAttribute = 'does not compute';
      testAttendee = await Attendee.create(newAttendee);
    });

    it('has a Name, and callsign fields', () => {
      expect(testAttendee.Name).to.equal('Hannah');
      expect(testAttendee.Callsign).to.equal('Ka9ddd');
      expect(testAttendee.notARealAttribute).to.equal(undefined);
    });
    it('has a Phone, Street and  City fields', () => {
      expect(testAttendee.Phone).to.equal('1234567890');
      expect(testAttendee.Street).to.equal('123 happy lane');
      expect(testAttendee.City).to.equal('st upidtown');
      expect(testAttendee.notARealAttribute).to.equal(undefined);
    });
    it('has a State, Zip and  SpecialRequests fields', () => {
      expect(testAttendee.State).to.equal('MA');
      expect(testAttendee.Zip).to.equal(60606);
      expect(testAttendee.notARealAttribute).to.equal(undefined);
    });
    it('has a Email, and  Date fields', () => {
      expect(testAttendee.Email).to.equal('abcde123@abc.com');
      expect(testAttendee.notARealAttribute).to.equal(undefined);
    });
  });
  describe('Name field', () => {
    it('Name is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Name).to.equal('Hannah');
      expect(typeof hannah.Name).to.equal('string');
    });
    it('Name cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Callsign: 'Ka9ddd',
        Phone: '1234567890',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Email: 'abcde123@abc.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Name cannot be null');
      }
    });
    it('Name cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Name = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Name failed');
      }
    });
    it('Name cannot have numbers', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Name = 'abc123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with numbers in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
    it('Name cannot have symbols', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Name = 'abc;jhg';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
  });
  describe.skip('Company', () => {
    it('Company is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Company).to.equal('Green');
      expect(typeof hannah.Company).to.equal('string');
    });
    xit('Company cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
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
        await testAttendee.validate();
        throw Error('validation should have failed without a Last name');
      } catch (err) {
        expect(err.message).to.contain('Company cannot be null');
      }
    });
    xit('Company cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Company = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Company');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Company failed');
      }
    });
  });
  describe('callsign', () => {
    //is it a vaild callsign?
    it('Callsign is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Callsign).to.equal('Ka9ddd');
      expect(typeof hannah.Callsign).to.equal('string');
    });

    xit('Callsign cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        email: 'cody@email.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a callsign');
      } catch (err) {
        expect(err.message).to.contain('Callsign cannot be null');
      }
    });

    xit('Callsign cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Callsign = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Callsign failed'
        );
      }
    });
    it('Callsign cannot must be vaild', async () => {
      newAttendee.Callsign = 'abc123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with with a nonvalid callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot have symbols', async () => {
      newAttendee.Callsign = 'ka9;dd';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
    it('Callsign cannot must be vaild', async () => {
      newAttendee.Callsign = 'abc123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with with a nonvalid callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot have symbols', async () => {
      newAttendee.Callsign = 'ka9;dd';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
    it('CallSign must be more then 2 charaters', async () => {
      newAttendee.Callsign = 'k9';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must start with an A W K or N', async () => {
      newAttendee.Callsign = 'gk9df';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must be less then 6 charaters', async () => {
      newAttendee.Callsign = 'kd9aasd';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with more then 6 letters Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign name not start with 3 alphas', async () => {
      newAttendee.Callsign = 'kse9as';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with 3 letters first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot start with a number', async () => {
      newAttendee.Callsign = '9asdf';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with a number first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      newAttendee.Callsign = 'k9s6s';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      newAttendee.Callsign = 'k39eed';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
  });

  describe('Street', () => {
    it('Street is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Street).to.equal('123 happy lane');
      expect(typeof hannah.Street).to.equal('string');
    });
    xit('Street cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        email: 'cody@email.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a street');
      } catch (err) {
        expect(err.message).to.contain('Street cannot be null');
      }
    });

    xit('Street cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Street = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Street');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Street failed');
      }
    });

    //Spec only works if first char is a symbol - I think the regEx is not checking correctly
    it('Street cannot must be vaild - no symbols', async () => {
      newAttendee.Street = ')ab-c ^ 12%3(';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.save();
        console.log('street -<', testAttendee);
        throw Error(
          'validation should have failed with with a nonvalid Street'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation not on Street failed');
      }
    });
  });
  describe('City', () => {
    it('City is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.City).to.equal('st upidtown');
      expect(typeof hannah.City).to.equal('string');
    });
    xit('City cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        email: 'cody@email.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a city');
      } catch (err) {
        expect(err.message).to.contain('City cannot be null');
      }
    });

    xit('City cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.City = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty City');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on City failed');
      }
    });
    //Spec only works if first char is a symbol - I think the regEx is not checking correctly
    it('City cannot must be vaild - no symbols', async () => {
      newAttendee.City = ')abc?123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with with a nonvalid City');
      } catch (err) {
        expect(err.message).to.contain('Validation not on City failed');
      }
    });
  });
  describe('State', () => {
    it('State is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.State).to.equal('MA');
      expect(typeof hannah.State).to.equal('string');
    });

    xit('State cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        Zip: 60606,
        email: 'cody@email.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a state');
      } catch (err) {
        expect(err.message).to.contain('State cannot be null');
      }
    });

    xit('State cannot be an empty string', async () => {
      newAttendee.State = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty State');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on State failed');
      }
    });

    it('State must be vaild - no symbols', async () => {
      newAttendee.State = 'A?';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in state');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
    it('State  must be vaild - no numbers', async () => {
      newAttendee.State = 'A1';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with numbers in state');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
    it('State must be vaild - not a state', async () => {
      newAttendee.State = 'XY';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with out a valid State');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
  });

  describe('Zip', () => {
    it('Zip is a Interger', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Zip).to.equal(60606);
      expect(typeof hannah.Zip).to.equal('number');
    });

    xit('Zip cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        email: 'cody@email.com',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without zip');
      } catch (err) {
        expect(err.message).to.contain('Zip cannot be null');
      }
    });

    xit('Zip cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Zip = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Zip failed');
      }
    });
    it('Zip must be vaild - no symbols', async () => {
      newAttendee.Zip = '123$3';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - no alpha', async () => {
      newAttendee.Zip = '12f43';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with letters in Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - too short', async () => {
      newAttendee.Zip = 123;
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed without enough numbers in Zip'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - too long', async () => {
      newAttendee.Zip = 1234567890;
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with too many numbers in Zip'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    //this is not working. 9 numbers dont match is
    xit('Zip must be vaild - can have 9 numbers', async () => {
      newAttendee.Zip = 12345 - 6789;
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Zip).to.equal(newAttendee.Zip);
    });
  });
  describe('Email', () => {
    it('Email is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Email).to.equal('abcde123@abc.com');
      expect(typeof hannah.Email).to.equal('string');
    });
    xit('Email cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
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
        await testAttendee.validate();
        throw Error('validation should have failed without a email');
      } catch (err) {
        expect(err.message).to.contain('Email cannot be null');
      }
    });

    xit('Email cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newAttendee.Email = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Email failed');
      }
    });
    it('Email must be an email address', async () => {
      newAttendee.Email = 'Hello';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with a non Email');
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on Email failed');
      }
    });
  });
  describe('Phone Number', () => {
    //is it a vaild Phone Number?
    it('Phone Number is a string', async () => {
      const hannah = await Attendee.create(newAttendee);
      expect(hannah.Phone).to.equal('1234567890');
      expect(typeof hannah.Phone).to.equal('string');
    });

    xit('Phone Number cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testAttendee = Attendee.build({
        Name: 'Hannah',

        Callsign: 'Ka9ddd',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a Phone number');
      } catch (err) {
        expect(err.message).to.contain('Phone cannot be null');
      }
    });

    xit('Phone Number cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty phone number.
      newAttendee.Phone = '';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty phone number');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Phone failed');
      }
    });
    it('Phone Number must be vaild -> no letters', async () => {
      newAttendee.Phone = '1234abc123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with with a nonvalid Phone');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });
    it('Phone Number cannot have most symbols', async () => {
      newAttendee.Phone = '1^23$9;123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with symbols in Phone');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });
    it('Phone Number must be vaild -> Too short', async () => {
      newAttendee.Phone = '123';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });
    it('Phone Number must be vaild -> Too long', async () => {
      newAttendee.Phone = '12345678901234567890';
      const testAttendee = Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        console.log(testAttendee.Phone);
        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation len on Phone failed');
      }
    });
    it('Phone Number can have -', async () => {
      newAttendee.Phone = '123-456-7890';
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Phone).to.equal('123-456-7890');
    });
    it('Phone Number can have spaces', async () => {
      newAttendee.Phone = '123 456 7890';
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Phone).to.equal('123 456 7890');
    });
    it('Phone Number can have () and spaces', async () => {
      newAttendee.Phone = '(123) 456-7890';
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Phone).to.equal('(123) 456-7890');
    });
    it('Phone Number can have (), - and spaces', async () => {
      newAttendee.Phone = '(123)-456-7890';
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Phone).to.equal('(123)-456-7890');
    });
    it('Phone Number can have ()', async () => {
      newAttendee.Phone = '(123) - (456) - (7890)';
      const testAttendee = await Attendee.build(newAttendee);
      try {
        await testAttendee.save();
        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation len on Phone failed');
      }
    });
    it('Phone Number can have .', async () => {
      newAttendee.Phone = '123.456.7890';
      const testAttendee = await Attendee.create(newAttendee);
      expect(testAttendee.Phone).to.equal('123.456.7890');
    });
  });
  describe('Order Date', () => {
    it('Order Date is a date', async () => {
      const hannah = await Attendee.create(newAttendee);
      assert.deepEqual(hannah.OrderDate, newAttendee.OrderDate);
      expect(typeof hannah.OrderDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testAttendee = Attendee.build({
        Name: 'Hannah',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        email: 'cody@email.com',
      });
      try {
        await testAttendee.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('OrderDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newAttendee.OrderDate = '';
      const testAttendee = await Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with empty Renewal date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on OrderDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newAttendee.OrderDate = 'hello world';
      const testAttendee = await Attendee.build(newAttendee);
      try {
        await testAttendee.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on OrderDate failed');
      }
    });
  });
});
