const { expect } = require('chai');
const db = require('../db');
const OfficerHistory = require('../OfficerHistory');

//Tests 27 passing. 10 pending or 0 failing
describe('office history Model', () => {
  before(() => db.sync({ force: true }));

  let newOfficerHistory;
  beforeEach(() => {
    newOfficerHistory = {
      startYear: 1950,
      endYear: 1951,
      President: 'Unknown',
      VicePresident: 'Unknown',
      Secretary: 'Unknown',
      Treasurer: 'Unknown',
      Custodian: 'Unknown',
    };
  });

  afterEach(() => db.sync({ force: true }));

  describe('start Year', () => {
    it('start Year is a number', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.startYear).to.equal(1950);
      expect(typeof hannah.startYear).to.equal('number');
    });
    it('cannot be null', async () => {
      const testOfficerHistory = OfficerHistory.build({
        endYear: 1951,
        President: 'Unknown',
        VicePresident: 'Unknown',
        Secretary: 'Unknown',
        Treasurer: 'Unknown',
        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a startYear');
      } catch (err) {
        expect(err.message).to.contain('startYear cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOfficerHistory.startYear = '';
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty startYear');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on startYear failed'
        );
      }
    });
    it('must be a number', async () => {
      newOfficerHistory.startYear = 'hello world';
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.save();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
    it('must be a after 1900', async () => {
      newOfficerHistory.startYear = 1890;
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error(
          'validation should have failed with a number smaller then 2020'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation min on startYear failed');
      }
    });
    it('must be before 3000', async () => {
      newOfficerHistory.startYear = 30000;
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with large number');
      } catch (err) {
        expect(err.message).to.contain('Validation max on startYear failed');
      }
    });
  });
  describe('end Year', () => {
    it('end Year is a number', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.endYear).to.equal(1951);
      expect(typeof hannah.endYear).to.equal('number');
    });
    it('cannot be null', async () => {
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        President: 'Unknown',
        VicePresident: 'Unknown',
        Secretary: 'Unknown',
        Treasurer: 'Unknown',
        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a endYear');
      } catch (err) {
        expect(err.message).to.contain('endYear cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newOfficerHistory.endYear = '';
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty endYear');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on endYear failed');
      }
    });
    it('must be a number', async () => {
      newOfficerHistory.endYear = 'hello world';
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.save();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('invalid input syntax for type integer');
      }
    });
    it('must be a after 1900', async () => {
      newOfficerHistory.endYear = 1899;
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error(
          'validation should have failed with a number smaller then 2020'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation min on endYear failed');
      }
    });
    it('must be before 3000', async () => {
      newOfficerHistory.endYear = 30000;
      const testOfficerHistory = await OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with large number');
      } catch (err) {
        expect(err.message).to.contain('Validation max on endYear failed');
      }
    });
  });
  describe('President field', () => {
    it('President is a string', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.President).to.equal('Unknown');
      expect(typeof hannah.President).to.equal('string');
    });
    it('President cannot be null', async () => {
      // We shouldn't be able to create a OfficerHistory without a name.
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        endYear: 1951,

        VicePresident: 'Unknown',
        Secretary: 'Unknown',
        Treasurer: 'Unknown',
        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a President');
      } catch (err) {
        expect(err.message).to.contain('President cannot be null');
      }
    });
    it('President cannot be an empty string', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.President = '';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty President');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on President failed'
        );
      }
    });
    //can have a call sign
    xit('President cannot have numbers', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.President = 'abc123';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with numbers in President');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on President failed'
        );
      }
    });
    xit('President cannot have symbols', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.President = 'abc;jhg';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with symbols in President');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on President failed'
        );
      }
    });
  });
  describe('VicePresident field', () => {
    it('VicePresident is a string', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.VicePresident).to.equal('Unknown');
      expect(typeof hannah.VicePresident).to.equal('string');
    });
    it('VicePresident cannot be null', async () => {
      // We shouldn't be able to create a OfficerHistory without a name.
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        endYear: 1951,
        President: 'Unknown',
        Secretary: 'Unknown',
        Treasurer: 'Unknown',
        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a VicePresident');
      } catch (err) {
        expect(err.message).to.contain('VicePresident cannot be null');
      }
    });
    it('VicePresident cannot be an empty string', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.VicePresident = '';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty VicePresident');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on VicePresident failed'
        );
      }
    });
    xit('VicePresident cannot have numbers', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.VicePresident = 'abc123';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error(
          'validation should have failed with numbers in VicePresident'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on VicePresident failed'
        );
      }
    });
    xit('VicePresident cannot have symbols', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.VicePresident = 'abc;jhg';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error(
          'validation should have failed with symbols in VicePresident'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on VicePresident failed'
        );
      }
    });
  });
  describe('Secretary field', () => {
    it('Secretary is a string', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.Secretary).to.equal('Unknown');
      expect(typeof hannah.Secretary).to.equal('string');
    });
    it('Secretary cannot be null', async () => {
      // We shouldn't be able to create a OfficerHistory without a name.
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        endYear: 1951,
        President: 'Unknown',
        VicePresident: 'Unknown',

        Treasurer: 'Unknown',
        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Secretary cannot be null');
      }
    });
    it('Secretary cannot be an empty string', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Secretary = '';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty Secretary');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Secretary failed'
        );
      }
    });
    xit('Secretary cannot have numbers', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Secretary = 'abc123';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with numbers in Secretary');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Secretary failed'
        );
      }
    });
    xit('Secretary cannot have symbols', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Secretary = 'abc;jhg';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with symbols in Secretary');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Secretary failed'
        );
      }
    });
  });
  describe('Treasurer field', () => {
    it('Treasurer is a string', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.Treasurer).to.equal('Unknown');
      expect(typeof hannah.Treasurer).to.equal('string');
    });
    it('Treasurer cannot be null', async () => {
      // We shouldn't be able to create a OfficerHistory without a name.
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        endYear: 1951,
        President: 'Unknown',
        VicePresident: 'Unknown',
        Secretary: 'Unknown',

        Custodian: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Treasurer cannot be null');
      }
    });
    it('Treasurer cannot be an empty string', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Treasurer = '';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty Treasurer');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Treasurer failed'
        );
      }
    });
    xit('Treasurer cannot have numbers', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Treasurer = 'abc123';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with numbers in Treasurer');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Treasurer failed'
        );
      }
    });
    xit('Treasurer cannot have symbols', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Treasurer = 'abc;jhg';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with symbols in Treasurer');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Treasurer failed'
        );
      }
    });
  });
  describe('Custodian field', () => {
    it('Custodian is a string', async () => {
      const hannah = await OfficerHistory.create(newOfficerHistory);
      expect(hannah.Custodian).to.equal('Unknown');
      expect(typeof hannah.Custodian).to.equal('string');
    });
    it('Custodian cannot be null', async () => {
      // We shouldn't be able to create a OfficerHistory without a name.
      const testOfficerHistory = OfficerHistory.build({
        startYear: 1950,
        endYear: 1951,
        President: 'Unknown',
        VicePresident: 'Unknown',
        Secretary: 'Unknown',
        Treasurer: 'Unknown',
      });
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed without a first name');
      } catch (err) {
        expect(err.message).to.contain('Custodian cannot be null');
      }
    });
    it('Custodian cannot be an empty string', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Custodian = '';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with empty Custodian');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Custodian failed'
        );
      }
    });
    xit('Custodian cannot have numbers', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Custodian = 'abc123';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with numbers in Custodian');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Custodian failed'
        );
      }
    });
    xit('Custodian cannot have symbols', async () => {
      // We also shouldn't be able to create a OfficerHistory with an empty name.
      newOfficerHistory.Custodian = 'abc;jhg';
      const testOfficerHistory = OfficerHistory.build(newOfficerHistory);
      try {
        await testOfficerHistory.validate();
        throw Error('validation should have failed with symbols in Custodian');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlpha on Custodian failed'
        );
      }
    });
  });
});
