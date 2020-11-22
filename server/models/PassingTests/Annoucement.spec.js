const { expect, assert } = require('chai');
const db = require('../db');
const Annoucement = require('./Annoucement');

//Tests 26 passing 0 pending
/*TODO: figure out how to set and test if a string is a hexidecimal*/
describe('Annoucement', () => {
  before(() => db.sync({ force: true }));
  let newAnnoucement;
  beforeEach(() => {
    newAnnoucement = {
      borderColor: '#ff0000',
      backgroundColor: '#00ff00',
      message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
      PostDate: new Date(),
    };
  });
  afterEach(() => db.sync({ force: true }));
  it('border and background color, message and date', async () => {
    newAnnoucement.notARealAttribute = 'does not compute';
    const testAnnoucement = await Annoucement.create(newAnnoucement);

    expect(testAnnoucement.borderColor).to.equal('#ff0000');
    expect(testAnnoucement.backgroundColor).to.equal('#00ff00');
    expect(testAnnoucement.message).to.equal(
      'asdf asdf asdf asdf asdf asdf asdf asdf'
    );
    expect(testAnnoucement.notARealAttribute).to.equal(undefined);
  });
  describe('borderColor', () => {
    it('borderColor', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.borderColor).to.equal('#ff0000');
      expect(typeof testAnnoucement.borderColor).to.equal('string');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        backgroundColor: '#00ff00',
        message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
        PostDate: new Date(),
      });
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed without a border color');
      } catch (err) {
        expect(err.message).to.contain('borderColor cannot be null');
      }
    });
    it('cannot be an empty string', async () => {
      newAnnoucement.borderColor = '';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed with empty borderColor');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on borderColor failed'
        );
      }
    });
    it('cannot have start with a symbols expect for hastag', async () => {
      newAnnoucement.borderColor = '$4f553';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error(
          'validation should have failed with symbols expect for hastag in borderColor'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
    it('cannot have symbols expect for hastag', async () => {
      newAnnoucement.borderColor = '#4f5^53';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error(
          'validation should have failed with symbols expect for hastagin borderColor'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
    it('cannot be more then 8 charters', async () => {
      newAnnoucement.borderColor = '#4f5533434';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with too many char in border'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
    it('cannot be less then 3 charters', async () => {
      newAnnoucement.borderColor = '#53';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with too few char in border'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
    it('cannot have letter besides a-f', async () => {
      newAnnoucement.borderColor = '#4f55t8';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error('validation should have failed with bad letters in border');
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
    it('must start with hashtag', async () => {
      newAnnoucement.borderColor = '4f553343';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with missing hashtag in border'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on borderColor failed');
      }
    });
  });
  describe('backgroundColor', () => {
    it('backgroundColor is a string', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.backgroundColor).to.equal('#00ff00');
      expect(typeof testAnnoucement.backgroundColor).to.equal('string');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        borderColor: '#00ff00',
        message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
        PostDate: new Date(),
      });
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed without a background color');
      } catch (err) {
        expect(err.message).to.contain('backgroundColor cannot be null');
      }
    });
    it('cannot be an empty string', async () => {
      newAnnoucement.backgroundColor = '';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed with empty backgroundColor');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on backgroundColor failed'
        );
      }
    });
    it('cannot have start with a symbols expect for hastag', async () => {
      newAnnoucement.backgroundColor = '$4f553';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error(
          'validation should have failed with symbols  expect for hastag in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
    it('cannot have symbols expect for hastag', async () => {
      newAnnoucement.backgroundColor = '#4f5^53';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error(
          'validation should have failed with symbols expect for hastag in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
    it('cannot be more then 9 charters', async () => {
      newAnnoucement.backgroundColor = '#4f5533434';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with too many char in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
    it('cannot be less then 3 charters', async () => {
      newAnnoucement.backgroundColor = '#53';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with too few char in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
    it('cannot have letter besides a-f', async () => {
      newAnnoucement.backgroundColor = '#4f55t8';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with bad letters in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
    it('must start with hashtag', async () => {
      newAnnoucement.backgroundColor = '4f553343';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.save();
        throw Error(
          'validation should have failed with missing hashtag in background'
        );
      } catch (err) {
        expect(err.message).to.contain(
          'Validation is on backgroundColor failed'
        );
      }
    });
  });
  describe('message', () => {
    it('message is a text', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.message).to.equal(
        'asdf asdf asdf asdf asdf asdf asdf asdf'
      );
      expect(typeof testAnnoucement.message).to.equal('string');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        backgroundColor: '#00ff00',
        borderColor: '#00ff00',
        PostDate: new Date(),
      });
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed without a border color');
      } catch (err) {
        expect(err.message).to.contain('message cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newAnnoucement.message = '';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed with empty message');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on message failed');
      }
    });
  });
  describe('Post Date', () => {
    it('Post Date is a date', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      assert.deepEqual(testAnnoucement.PostDate, newAnnoucement.PostDate);
      expect(typeof testAnnoucement.PostDate).to.equal('object');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        borderColor: '#ff0000',
        backgroundColor: '#00ff00',
        message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
      });
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed without a post date');
      } catch (err) {
        expect(err.message).to.contain('PostDate cannot be null');
      }
    });
    it('cannot be empty', async () => {
      newAnnoucement.PostDate = '';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed with empty post date');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on PostDate failed'
        );
      }
    });
    it('must be a date', async () => {
      newAnnoucement.PostDate = 'Hello world';
      const testAnnoucement = await Annoucement.build(newAnnoucement);
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed with a string');
      } catch (err) {
        expect(err.message).to.contain('Validation isDate on PostDate failed');
      }
    });
  });
});
