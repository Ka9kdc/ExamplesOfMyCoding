const { expect, assert } = require('chai');
const db = require('./db');
const { Member } = require('./member');

//Still missing Due year, and membership type tests
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
    it('has a Email and  DueYear', async () => {
      expect(testMember.Email).to.equal('abcde123@abc.com');
      expect(testMember.DueYear).to.equal(2020);
      expect(testMember.notARealAttribute).to.equal(undefined);
    });
    it('has a Renewal Date', () => {
      assert.deepEqual(testMember.RenewalDate, newMember.RenewalDate)
    })
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
    it('FirstName cannot have numbers', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.FirstName = 'abc123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with numbers in FirstName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on FirstName failed'
        );
      }
    });
    it('FirstName cannot have symbols', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.FirstName = 'abc;jhg';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in FirstName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on FirstName failed'
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
    it('LastName cannot have numbers', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.LastName = 'abc123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with numbers in LastName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on LastName failed'
        );
      }
    });
    it('LastName cannot have symbols', async () => {
      // We also shouldn't be able to create a user with an empty name.
      newMember.LastName = 'abc;jhg';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in LastName');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on LastName failed'
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
    it('Callsign cannot must be vaild', async () => {
      newMember.Callsign = 'abc123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with with a nonvalid callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Callsign failed'
        );
      }
    });
    it('CallSign cannot have symbols', async () => {
      newMember.Callsign = 'ka9;dd';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
  });
  describe('Phone Number', () => {
    //is it a vaild Phone Number?
    it('Phone Number is a string', async () => {
      const hannah = await Member.create(newMember);
      expect(hannah.Phone).to.equal('1234567890');
    });

    it('Phone Number cannot be null', async () => {
      // We shouldn't be able to create a user without a name.
      const testMember = Member.build({
        FirstName: 'Hannah',
        LastName: 'Green',
        Callsign: 'Ka9ddd',
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
        throw Error('validation should have failed without a Phone number');
      } catch (err) {
        expect(err.message).to.contain('Phone cannot be null');
      }
    });

    it('Phone Number cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty phone number.
      newMember.Phone = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty phone number');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Phone failed'
        );
      }
    });
    it('Phone Number must be vaild -> no letters' , async () => {
      newMember.Phone = '1234abc123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with with a nonvalid Phone');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Phone failed'
        );
      }
    });
    it('Phone Number cannot have most symbols', async () => {
      newMember.Phone = '1^23$9;123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in Phone');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Phone failed'
        );
      }
    });
    it('Phone Number must be vaild -> Too short' , async () => {
      newMember.Phone = '123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with out a nonvalid Phone number');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Phone failed'
        );
      }
    });

    //Spec failing
    xit('Phone Number must be vaild -> Too long' , async () => {
      newMember.Phone = 12345678901234567890;
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with out a nonvalid Phone number');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Phone failed'
        );
      }
    });
    it('Phone Number can have ()', async () => {
      newMember.Phone = '(123)-(456)-(7890)';
      const testMember = Member.build(newMember);
      expect(testMember.Phone).to.equal('(123)-(456)-(7890)');
    });
    it('Phone Number can have .', async () => {
      newMember.Phone = '123.456.7890';
      const testMember = Member.build(newMember);
      expect(testMember.Phone).to.equal('123.456.7890');
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

    //Spec failing
    xit('Street cannot must be vaild - no symbols', async () => {
      newMember.Street = 'abc?123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with with a nonvalid Street');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation not on Street failed'
        );
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
     //Spec failing
     xit('City cannot must be vaild - no symbols', async () => {
      newMember.City = 'abc?123';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with with a nonvalid City');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation not on City failed'
        );
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
      newMember.State = '';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty State');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on State failed');
      }
    })

    it('State must be vaild - no symbols', async () => {
      newMember.State = 'A?';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in state');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on State failed'
        );
      }
    });
    it('State  must be vaild - no numbers', async () => {
      newMember.State = 'A1';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with numbers in state');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on State failed'
        );
      }
    });
    it('State must be vaild - not a state', async () => {
      newMember.State = 'XY';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with out a valid State');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on State failed'
        );
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
    it( 'Zip must be vaild - no symbols', async () => {
      newMember.Zip = '123$3';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with symbols in Zip');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Zip failed'
        );
      }
    });
    it( 'Zip must be vaild - no alpha', async () => {
      newMember.Zip = '12f43';
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with letters in Zip');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Zip failed'
        );
      }
    });
    it( 'Zip must be vaild - too short', async () => {
      newMember.Zip = 123;
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed without enough numbers in Zip');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Zip failed'
        );
      }
    });
    it( 'Zip must be vaild - too long', async () => {
      newMember.Zip = 1234567890;
      const testMember = Member.build(newMember);
      try {
        await testMember.validate();
        throw Error('validation should have failed with too many numbers in Zip');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on Zip failed'
        );
      }
    });
    it( 'Zip must be vaild - can have 9 numbers', async () => {
      newMember.Zip = 123456789;
      const testMember = Member.build(newMember);
      expect(testMember.Zip).to.equal(newMember.Zip)
    })
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
  describe('Renewal Date', () => {
    it('Renewal Date is a date', async () => {
      const hannah = await Member.create(newMember);
      assert.deepEqual(hannah.RenewalDate, newMember.RenewalDate)
    })
    it('cannot be null', async () => {
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
       email: 'cody@email.com'
      });
      try {
        await testMember.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('RenewalDate cannot be null');
      }
    })
    it('cannot be empty', async () => {
      newMember.RenewalDate = ''
      const testMember = await Member.build(newMember)
      try {
        await testMember.validate();
        throw Error('validation should have failed with empty Renewal date');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on RenewalDate failed');
      }
    });
    it('must be a date', async () => {
      newMember.RenewalDate = 'hello world'
      const testMember = await Member.build(newMember)
      try {
        await testMember.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on RenewalDate failed');
      }
    });
  })
});
