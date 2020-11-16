const { expect } = require('chai');
const db = require('./db');
const Annoucement = require('./Annoucement');

describe('Annoucement', () => {
  before(() => db.sync({ force: true }));
  let newAnnoucement;
  beforeEach(() => {
    newAnnoucement = {
      borderColor: 'ff0000',
      backgroundColor: '00ff00',
      message: 'asdf asdf asdf asdf asdf asdf asdf asdf',
      PostDate: new Date(),
    };
  });
  afterEach(() => db.sync({ force: true }));
  it('border and background color, message and date', async () => {
    newAnnoucement.notARealAttribute = 'does not compute';
    const testAnnoucement = await Annoucement.create(newAnnoucement);

    expect(testAnnoucement.borderColor).to.equal('ff0000');
    expect(testAnnoucement.backgroundColor).to.equal('00ff00');
    expect(testAnnoucement.message).to.equal(
      'asdf asdf asdf asdf asdf asdf asdf asdf'
    );
    expect(testAnnoucement.PostDate).to.be.exist;
    expect(testAnnoucement.notARealAttribute).to.equal(undefined);
  });
  describe('borderColor', () => {
    it('borderColor', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.borderColor).to.equal('ff0000');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        backgroundColor: '00ff00',
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
    xit('cannot be an empty string', async () => {
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
  });
  describe('backgroundColor', () => {
    it('backgroundColor is a string', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.backgroundColor).to.equal('00ff00');
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        borderColor: '00ff00',
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
    xit('cannot be an empty string', async () => {
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
  });
  describe('message', () => {
    it('message is a test', async () => {
      const testAnnoucement = await Annoucement.create(newAnnoucement);
      expect(testAnnoucement.message).to.equal(
        'asdf asdf asdf asdf asdf asdf asdf asdf'
      );
    });
    it('cannot be null', async () => {
      const testAnnoucement = await Annoucement.build({
        backgroundColor: '00ff00',
        borderColor: '00ff00',
        PostDate: new Date(),
      });
      try {
        await testAnnoucement.validate();
        throw Error('validation should have failed without a border color');
      } catch (err) {
        expect(err.message).to.contain('message cannot be null');
      }
    });
    xit('cannot be empty', async () => {
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
});
