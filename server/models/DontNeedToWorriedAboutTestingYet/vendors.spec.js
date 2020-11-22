const { expect, assert } = require('chai');
const db = require('../db');
const { Vendor } = require('../vendors');

//tests: 63 passing - 6 pending
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

    it('has a name, company and callsign fields', () => {
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
    it('has a Emailand  Date fields', () => {
      expect(testVendor.Email).to.equal('abcde123@abc.com');
      expect(testVendor.notARealAttribute).to.equal(undefined);
    });
  });
  describe('Company', () => {
    it('Company is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Company).to.equal('Green');
      expect(typeof hannah.Company).to.equal('string');
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
  describe('Name field', () => {
    it('Name is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Name).to.equal('Hannah');
      expect(typeof hannah.Name).to.equal('string');
    });
    xit('Name cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Company: 'Hannah',
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
    it('Name cannot have numbers', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Name = 'abc123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with numbers in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
    it('Name cannot have symbols', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newVendor.Name = 'abc;jhg';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
  });

  describe('callsign', () => {
    //is it a vaild callsign?
    it('Callsign is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Callsign).to.equal('Ka9ddd');
      expect(typeof hannah.Callsign).to.equal('string');
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
        Vendorship: 'Full',
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
    it('Callsign cannot must be vaild', async () => {
      newVendor.Callsign = 'abc123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with with a nonvalid callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot have symbols', async () => {
      newVendor.Callsign = 'ka9;dd';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
    it('Callsign cannot must be vaild', async () => {
      newVendor.Callsign = 'abc123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with with a nonvalid callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot have symbols', async () => {
      newVendor.Callsign = 'ka9;dd';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
    it('CallSign must be more then 2 charaters', async () => {
      newVendor.Callsign = 'k9';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must start with an A W K or N', async () => {
      newVendor.Callsign = 'gk9df';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must be less then 6 charaters', async () => {
      newVendor.Callsign = 'kd9aasd';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with more then 6 letters Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign name not start with 3 alphas', async () => {
      newVendor.Callsign = 'kse9as';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with 3 letters first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot start with a number', async () => {
      newVendor.Callsign = '9asdf';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with a number first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      newVendor.Callsign = 'k9s6s';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      newVendor.Callsign = 'k39eed';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
  });
  describe('Phone Number', () => {
    //is it a vaild Phone Number?
    it('Phone Number is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Phone).to.equal('1234567890');
      expect(typeof hannah.Phone).to.equal('string');
    });

    it('Phone Number cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Vendorship: 'Full',
        Email: 'abcde123@abc.com',
        DueYear: '2020',
        OrderDate: new Date(),
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a Phone number');
      } catch (err) {
        expect(err.message).to.contain('Phone cannot be null');
      }
    });

    it('Phone Number cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty phone number.
      newVendor.Phone = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty phone number');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Phone failed');
      }
    });
    it('Phone Number must be vaild -> no letters', async () => {
      newVendor.Phone = '1234abc123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with with a nonvalid Phone');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });
    it('Phone Number cannot have most symbols', async () => {
      newVendor.Phone = '1^23$9;123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in Phone');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });
    it('Phone Number must be vaild -> Too short', async () => {
      newVendor.Phone = '123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Phone failed');
      }
    });

    //Spec failing
    it('Phone Number must be vaild -> Too long', async () => {
      newVendor.Phone = '12345678901234567890';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();

        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation len on Phone failed');
      }
    });
    it('Phone Number can have -', async () => {
      newVendor.Phone = '123-456-7890';
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Phone).to.equal('123-456-7890');
    });
    it('Phone Number can have spaces', async () => {
      newVendor.Phone = '123 456 7890';
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Phone).to.equal('123 456 7890');
    });
    it('Phone Number can have () and spaces', async () => {
      newVendor.Phone = '(123) 456-7890';
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Phone).to.equal('(123) 456-7890');
    });
    it('Phone Number can have (), - and spaces', async () => {
      newVendor.Phone = '(123)-456-7890';
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Phone).to.equal('(123)-456-7890');
    });
    it('Phone Number can have ()', async () => {
      newVendor.Phone = '(123) - (456) - (7890)';
      const testVendor = await Vendor.build(newVendor);
      try {
        await testVendor.save();
        throw Error(
          'validation should have failed with out a nonvalid Phone number'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation len on Phone failed');
      }
    });
    it('Phone Number can have .', async () => {
      newVendor.Phone = '123.456.7890';
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Phone).to.equal('123.456.7890');
    });
  });
  describe('Street', () => {
    it('Street is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Street).to.equal('123 happy lane');
      expect(typeof hannah.Street).to.equal('string');
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
        Vendorship: 'Full',
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

    //Spec only works if first char is a symbol - I think the regEx is not checking correctly
    it('Street cannot must be vaild - no symbols', async () => {
      newVendor.Street = ')ab-c ^ 12%3(';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
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
      const hannah = await Vendor.create(newVendor);
      expect(hannah.City).to.equal('st upidtown');
      expect(typeof hannah.City).to.equal('string');
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
        Vendorship: 'Full',
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
    //Spec only works if first char is a symbol - I think the regEx is not checking correctly
    it('City cannot must be vaild - no symbols', async () => {
      newVendor.City = ')abc?123';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with with a nonvalid City');
      } catch (err) {
        expect(err.message).to.contain('Validation not on City failed');
      }
    });
  });
  describe('State', () => {
    it('State is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.State).to.equal('MA');
      expect(typeof hannah.State).to.equal('string');
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
        Vendorship: 'Full',
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
      newVendor.State = '';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty State');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on State failed');
      }
    });

    it('State must be vaild - no symbols', async () => {
      newVendor.State = 'A?';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in state');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
    it('State  must be vaild - no numbers', async () => {
      newVendor.State = 'A1';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with numbers in state');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
    it('State must be vaild - not a state', async () => {
      newVendor.State = 'XY';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with out a valid State');
      } catch (err) {
        expect(err.message).to.contain('Validation is on State failed');
      }
    });
  });
  describe('Zip', () => {
    it('Zip is a Interger', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Zip).to.equal(60606);
      expect(typeof hannah.Zip).to.equal('number');
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
        Vendorship: 'Full',
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
    it('Zip must be vaild - no symbols', async () => {
      newVendor.Zip = '123$3';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with symbols in Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - no alpha', async () => {
      newVendor.Zip = '12f43';
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with letters in Zip');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - too short', async () => {
      newVendor.Zip = 123;
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed without enough numbers in Zip'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    it('Zip must be vaild - too long', async () => {
      newVendor.Zip = 1234567890;
      const testVendor = Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error(
          'validation should have failed with too many numbers in Zip'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Zip failed');
      }
    });
    xit('Zip must be vaild - can have 9 numbers', async () => {
      newVendor.Zip = 123456789;
      const testVendor = await Vendor.create(newVendor);
      expect(testVendor.Zip).to.equal(newVendor.Zip);
    });
  });

  describe('Email', () => {
    it('Email is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.Email).to.equal('abcde123@abc.com');
      expect(typeof hannah.Email).to.equal('string');
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
        Vendorship: 'Full',
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
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation isEmail on Email failed');
      }
    });
  });

  describe('Order Date', () => {
    it('Order Date is a date', async () => {
      const hannah = await Vendor.create(newVendor);
      assert.deepEqual(hannah.OrderDate, newVendor.OrderDate);
      expect(typeof hannah.OrderDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testVendor = Vendor.build({
        Name: 'Hannah',
        Company: 'Green',
        Callsign: 'Ka9ddd',
        Phone: 1234567890,
        Street: '123 happy lane',
        City: 'st upidtown',
        State: 'MA',
        Zip: 60606,
        Email: 'abcde123@abc.com',
        DueYear: '2020',
      });
      try {
        await testVendor.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('OrderDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newVendor.OrderDate = '';
      const testVendor = await Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with empty Order date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on OrderDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newVendor.OrderDate = 'hello world';
      const testVendor = await Vendor.build(newVendor);
      try {
        await testVendor.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on OrderDate failed');
      }
    });
  });
  describe('Special Requests field', () => {
    it('Special Requests is a string', async () => {
      const hannah = await Vendor.create(newVendor);
      expect(hannah.SpecialRequests).to.equal('Full');
      expect(typeof hannah.SpecialRequests).to.equal('string');
    });
    it('Special Request can be  short string', async () => {
      let short = 'asdaf';
      newVendor.SpecialRequests = short;
      const hannah = await Vendor.create(newVendor);
      expect(hannah.SpecialRequests).to.equal(short);
      expect(typeof hannah.SpecialRequests).to.equal('string');
    });
    it('Special Request can be  a long string', async () => {
      let long =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor.';
      newVendor.SpecialRequests = long;
      const hannah = await Vendor.create(newVendor);
      expect(hannah.SpecialRequests).to.equal(long);
      expect(typeof hannah.SpecialRequests).to.equal('string');
    });
    it('Special Request can be a very long string', async () => {
      let long =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit, nisi at imperdiet faucibus, turpis massa vehicula nisi, eu sodales nunc magna ut dolor. Fusce finibus at dui eget scelerisque. Curabitur elementum est ac lobortis imperdiet. Proin maximus enim ut enim consequat, a mollis lectus blandit. Nulla et iaculis dolor.';
      newVendor.SpecialRequests = long;
      const hannah = await Vendor.create(newVendor);
      expect(hannah.SpecialRequests).to.equal(long);
      expect(typeof hannah.SpecialRequests).to.equal('string');
    });
  });
});
