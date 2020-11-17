/* global describe beforeEach it */

const { expect } = require('chai');
const { db, User } = require('./index');

describe.only('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          Callsign: 'w9ccu',
          password: 'bones',
        });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    });
  });
  describe('user email', () => {
    beforeEach(async () => {
      return await User.create({
        email: 'cody@puppybook.com',
        Callsign: 'ka9ccu',
        password: 'bones',
      });
    });
    it('email cannot be empty', async () => {
      const emptyEmailUser = User.build({ email: '', Callsign: 'w9ccu', password: '12345' });
      try {
        await emptyEmailUser.validate();
        throw Error('validation should have failed with empty email');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on email failed');
      }
    });
    it('email cannot be null', async () => {
      const emptyEmailUser = User.build({
        name: 'mary',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyEmailUser.validate();
        throw Error('validation should have failed without an email');
      } catch (err) {
        expect(err.message).to.contain('email cannot be null');
      }
    });
    it('email must be unique', async () => {
      try {
        await User.create({ email: 'cody@puppybook.com', Callsign: 'w9ccu', password: '12345' });
        throw Error('validation should have failed without an unique email');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('email must be an Email', async () => {
      try {
        await User.create({ email: 'puppybook.com', password: '12345' });
        throw Error('validation should have failed without an email');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
  });
  describe('Callsign', () => {
    beforeEach(async () => {
      return await User.create({
        email: 'cody@puppybook.com',
        Callsign: 'cody12345',
        password: 'bones',
      });
    });
    it('Callsign must be unique', async () => {
      try {
        await User.create({
          email: 'cdy@puppybook.com',
          Callsign: 'cody12345',
          password: '12345',
        });
        throw Error('validation should have failed without an unique Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('callsign cannot be null', async () => {
      const emptyCallsignUser = User.build({
        name: 'mary',
        email: 'cody@puppybook.com',
        password: '12345',
      });
      try {
        await emptyCallsignUser.validate();
        throw Error('validation should have failed without a callsign');
      } catch (err) {
        expect(err.message).to.contain('Callsign cannot be null');
      }
    });
    it('callsign cannot be empty', async () => {
      const emptyCallsignUser = User.build({ email: 'cody@puppybook.com', Callsign: '', password: '12345' });
      try {
        await emptyCallsignUser.validate();
        throw Error('validation should have failed with empty callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Callsign failed');
      }
    });
  }); // end describe('instanceMethods')
}); // end describe('User model')
