const { expect, assert } = require('chai');
const db = require('../db');
const { Badge } = require('../member');

//Tests: 30 passing 4 pending
describe.only('Badge', () => {
  before(() => db.sync({ force: true }));

  let newBadge;
  beforeEach(() => {
    newBadge = {
      Desired: true,
      Name: 'Cody',
      Arrl: true,
      Color: 'Red',
      Type: 'Lanyard',
      LicenseYear: 2000,
      RenewalDate: new Date(),
    };
  });

  afterEach(() => db.sync({ force: true }));
  describe('fields', () => {
    let testBadge;
    beforeEach(async () => {
      newBadge.notARealAttribute = 'does not compute';
      testBadge = await Badge.create(newBadge);
    });
    it('has a Desired, Name and Arrl fields', () => {
      expect(testBadge.Desired).to.equal(true);
      expect(testBadge.Name).to.equal('Cody');
      expect(testBadge.Arrl).to.equal(true);
      expect(testBadge.notARealAttribute).to.equal(undefined);
    });
    it('has a Color, Type and  LicenseYear fields', () => {
      expect(testBadge.Color).to.equal('Red');
      expect(testBadge.Type).to.equal('Lanyard');
      expect(testBadge.LicenseYear).to.equal(2000);
      expect(testBadge.notARealAttribute).to.equal(undefined);
    });
    it('has a Renewal Date', () => {
      assert.deepEqual(testBadge.RenewalDate, newBadge.RenewalDate);
      expect(testBadge.notARealAttribute).to.equal(undefined);
    });
  });
  describe('Name field', () => {
    it('Name is a string', async () => {
      const hannah = await Badge.create(newBadge);
      expect(hannah.Name).to.equal('Cody');
      expect(typeof hannah.Name).to.equal('string');
    });
    xit('Name cannot be null', async () => {
      // We shouldn't be able to create a Badge without a name.
      const testBadge = Badge.build({
        Desired: true,
        Arrl: true,
        Color: 'Red',
        Type: 'Lanyard',
        LicenseYear: 2000,
        RenewalDate: new Date(),
      });
      try {
        await testBadge.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Name cannot be null');
      }
    });
    xit('Name cannot be an empty string', async () => {
      // We also shouldn't be able to create a Badge with an empty name.
      newBadge.Name = '';
      const testBadge = Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error('validation should have failed with empty Name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Name failed');
      }
    });
  });
  describe('License Year', () => {
    it('License Year is a number', async () => {
      const hannah = await Badge.create(newBadge);
      expect(hannah.LicenseYear).to.equal(2000);
      expect(typeof hannah.LicenseYear).to.equal('number');
    });
    xit('cannot be null', async () => {
      const testBadge = Badge.build({
        Desired: true,
        Name: 'Cody',
        Arrl: true,
        Color: 'Red',
        Type: 'Lanyard',
        RenewalDate: new Date(),
      });
      try {
        await testBadge.validate();
        throw Error('validation should have failed without a LicenseYear');
      } catch (err) {
        expect(err.message).to.contain('LicenseYear cannot be null');
      }
    });
    xit('cannot be empty', async () => {
      newBadge.LicenseYear = '';
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error('validation should have failed with empty LicenseYear');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on LicenseYear failed'
        );
      }
    });
    it('must be a number', async () => {
      newBadge.LicenseYear = 'hello world';
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.save();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
    it('must be a after 1920', async () => {
      newBadge.LicenseYear = 1910;
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error(
          'validation should have failed with a number smaller then 2020'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation min on LicenseYear failed');
      }
    });
    it('must be before 2100', async () => {
      newBadge.LicenseYear = 2111;
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error('validation should have failed with large number');
      } catch (err) {
        expect(err.message).to.contain('Validation max on LicenseYear failed');
      }
    });
  });
  describe('Renewal Date', () => {
    it('Renewal Date is a date', async () => {
      const hannah = await Badge.create(newBadge);
      assert.deepEqual(hannah.RenewalDate, newBadge.RenewalDate);
      expect(typeof hannah.RenewalDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testBadge = Badge.build({
        Desired: true,
        Name: 'Cody',
        Arrl: true,
        Color: 'Red',
        Type: 'Lanyard',
        LicenseYear: 2000,
      });
      try {
        await testBadge.validate();
        throw Error('validation should have failed without a date');
      } catch (err) {
        expect(err.message).to.contain('RenewalDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newBadge.RenewalDate = '';
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error('validation should have failed with empty Renewal date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on RenewalDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newBadge.RenewalDate = 'hello world';
      const testBadge = await Badge.build(newBadge);
      try {
        await testBadge.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isDate on RenewalDate failed'
        );
      }
    });
  });
  describe('Color', () => {
    it('Color is an emun of strings', async () => {
      const hannah = await Badge.create(newBadge);
      expect(typeof hannah.Color).to.equal('string');
    });
    it('can take Red and White', async () => {
      let hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Red');
      newBadge.Color = 'White';
      hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('White');
    });
    it('can take Black and Blue', async () => {
      newBadge.Color = 'Black';
      let hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Black');
      newBadge.Color = 'Blue';
      hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Blue');
    });
    it('can take Green and Brown', async () => {
      newBadge.Color = 'Green';
      let hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Green');
      newBadge.Color = 'Brown';
      hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Brown');
    });
    it('can take Red, White and Blue or an empty string', async () => {
      newBadge.Color = 'Red, White and Blue';
      let hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('Red, White and Blue');
      newBadge.Color = '';
      hannah = await Badge.create(newBadge);
      expect(hannah.Color).to.equal('');
    });
    it('Color defaults to an empty string when null is passed in', async () => {
      // We shouldn't be able to create a Badge without a name.
      const testBadge = Badge.build({
        Desired: true,
        Name: 'Cody',
        Arrl: true,
        Type: 'Lanyard',
        LicenseYear: 2000,
        RenewalDate: new Date(),
      });
      try {
        await testBadge.save();
        expect(testBadge.Color).to.equal('');
      } catch (err) {
        console.log(err);
      }
    });
    it('can not be a random string', async () => {
      newBadge.Color = 'Hello';
      const testBadge = Badge.build(newBadge);
      try {
        await testBadge.save();
        throw Error('validation should have failed with random string');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isIn on Color failed'
        );
      }
    });
  });
  describe('Type', () => {
    it('Type is an emun of strings', async () => {
      const hannah = await Badge.create(newBadge);
      expect(typeof hannah.Type).to.equal('string');
    });
    it('can take NoPreference and Lanyard', async () => {
      let hannah = await Badge.create(newBadge);
      expect(hannah.Type).to.equal('Lanyard');
      newBadge.Type = 'NoPreference';
      hannah = await Badge.create(newBadge);
      expect(hannah.Type).to.equal('NoPreference');
    });
    it('can take Pin and Magnet', async () => {
      newBadge.Type = 'Pin';
      let hannah = await Badge.create(newBadge);
      expect(hannah.Type).to.equal('Pin');
      newBadge.Type = 'Magnet';
      hannah = await Badge.create(newBadge);
      expect(hannah.Type).to.equal('Magnet');
    });
    it('can take Notch', async () => {
      newBadge.Type = 'Notch';
      let hannah = await Badge.create(newBadge);
      expect(hannah.Type).to.equal('Notch');
    });
    it('Type defuals to NoPrefernce when null is passed in', async () => {
      // We shouldn't be able to create a Badge without a name.
      const testBadge = Badge.build({
        Desired: true,
        Name: 'Cody',
        Arrl: true,
        Color: 'Red',
        LicenseYear: 2000,
        RenewalDate: new Date(),
      });
      try {
        await testBadge.save();
        expect(testBadge.Type).to.equal('NoPreference');
      } catch (err) {
        console.log(err);
      }
    });
    it('can not be an empty string', async () => {
      newBadge.Type = '';
      const testBadge = Badge.build(newBadge);
      try {
        await testBadge.save();
        throw Error('validation should have failed with empty string');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isIn on Type failed'
        );
      }
    });
    it('can not be an random string', async () => {
      newBadge.Type = 'Hello';
      const testBadge = Badge.build(newBadge);
      try {
        await testBadge.save();
        throw Error('validation should have failed with random string');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isIn on Type failed'
        );
      }
    });
  });

  describe('Desired', () => {
    it(' is a boolean', async () => {
      const hannah = await Badge.create(newBadge);
      expect(hannah.Desired).to.equal(true);
      expect(typeof hannah.Desired).to.equal('boolean');
    });
    it('can be false', async () => {
      newBadge.Desired = false;
      const hannah = await Badge.create(newBadge);
      expect(hannah.Desired).to.equal(false);
    });
  });
  describe('Arrl', () => {
    it(' is a boolean', async () => {
      const hannah = await Badge.create(newBadge);
      expect(hannah.Arrl).to.equal(true);
      expect(typeof hannah.Arrl).to.equal('boolean');
    });
    it('can be false', async () => {
      newBadge.Arrl = false;
      const hannah = await Badge.create(newBadge);
      expect(hannah.Arrl).to.equal(false);
    });
  });
});
