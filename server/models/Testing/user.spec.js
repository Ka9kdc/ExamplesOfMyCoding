const { expect } = require('chai');
const { db, User } = require('../index');

//Tests 26 passing 0 pending/failing
describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          Email: 'cody@puppybook.com',
          Callsign: 'w9ccu',
          password: 'bones',
          Name: 'cody',
        });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
      it('fields -> Name, callsign, Email', () => {
        expect(cody.Name).to.equal('cody');
        expect(cody.Callsign).to.equal('w9ccu');
        expect(cody.Email).to.equal('cody@puppybook.com');
      });
    });
  });
  describe('user Name', () => {
    beforeEach(() => {
      return User.create({
        Email: 'cody@puppybook.com',
        Callsign: 'ka9ccu',
        password: 'bones',
        Name: 'cody',
      });
    });
    it('Name is a string', async () => {
      const hannah = await User.create({
        Email: 'abc@puppybook.com',
        Name: 'Hannah',
        Callsign: 'k9ccu',
        password: '12345',
      });
      expect(hannah.Name).to.equal('Hannah');
      expect(typeof hannah.Name).to.equal('string');
    });
    it('Name cannot be empty', async () => {
      const emptyNameUser = User.build({
        Email: 'cody@puppybook.com',
        Name: '',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyNameUser.validate();
        throw Error('validation should have failed with empty Name');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Name failed');
      }
    });
    it('Name cannot be null', async () => {
      const emptyNameUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyNameUser.validate();
        throw Error('validation should have failed without a namw');
      } catch (err) {
        expect(err.message).to.contain('Name cannot be null');
      }
    });

    it('Name cannot have numbers', async () => {
      // We also shouldn't be able to create a user with an empty name.
      const emptyNameUser = User.build({
        Email: 'cody@puppybook.com',
        Name: 'abc123',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyNameUser.validate();
        throw Error('validation should have failed with numbers in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
    it('Name cannot have symbols', async () => {
      const emptyNameUser = User.build({
        Email: 'cody@puppybook.com',
        Name: 'asdf$$adf',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyNameUser.validate();
        throw Error('validation should have failed with symbols in Name');
      } catch (err) {
        expect(err.message).to.contain('Validation isAlpha on Name failed');
      }
    });
  });
  describe('user Email', () => {
    beforeEach(() => {
      return User.create({
        Email: 'cody@puppybook.com',
        Callsign: 'ka9ccu',
        password: 'bones',
        Name: 'cody',
      });
    });
    it('Email is a string', async () => {
      const hannah = await User.create({
        Email: 'abcde123@abc.com',
        Callsign: 'w9cc',
        Name: 'cody',
        password: '12345',
      });
      expect(hannah.Email).to.equal('abcde123@abc.com');
      expect(typeof hannah.Email).to.equal('string');
    });
    it('Email cannot be empty', async () => {
      const emptyEmailUser = User.build({
        Email: '',
        Name: 'cody',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyEmailUser.validate();
        throw Error('validation should have failed with empty Email');
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on Email failed');
      }
    });
    it('Email cannot be null', async () => {
      const emptyEmailUser = User.build({
        Name: 'mary',
        Callsign: 'w9ccu',
        password: '12345',
      });
      try {
        await emptyEmailUser.validate();
        throw Error('validation should have failed without an Email');
      } catch (err) {
        expect(err.message).to.contain('Email cannot be null');
      }
    });
    it('Email must be unique', async () => {
      try {
        await User.create({
          Email: 'cody@puppybook.com',
          Callsign: 'w9ccu',
          Name: 'cody',
          password: '12345',
        });
        throw Error('validation should have failed without an unique Email');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('Email must be an Email', async () => {
      try {
        await User.create({
          Email: 'puppybook.com',
          password: '12345',
          Name: 'cody',
          Callsign: 'w9ccu',
        });
        throw Error('validation should have failed without an Email');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
  });
  describe('Callsign', () => {
    let hannah;
    beforeEach(async () => {
      hannah = await User.create({
        Email: 'cody@puppybook.com',
        Callsign: 'w9ccu',
        password: 'bones',
        Name: 'cody',
      });
    });
    it('Callsign is a string', () => {
      expect(hannah.Callsign).to.equal('w9ccu');
      expect(typeof hannah.Callsign).to.equal('string');
    });
    it('Callsign must be unique', async () => {
      try {
        const testUser = User.build({
          Email: 'cody@puppybook.com',
          Callsign: 'w9ccu',
          password: 'bones',
          Name: 'cody',
        });
        await testUser.save();
        throw Error('validation should have failed without an unique Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('callsign cannot be null', async () => {
      const emptyCallsignUser = User.build({
        Name: 'mary',
        Email: 'cody@puppybook.com',
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
      const emptyCallsignUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: '',
        password: '12345',
        Name: 'cody',
      });
      try {
        await emptyCallsignUser.validate();
        throw Error('validation should have failed with empty callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation notEmpty on Callsign failed'
        );
      }
    });
    it('Callsign must be vaild', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'abc123',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error(
          'validation should have failed with with a nonvalid callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot have symbols', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'ka9;dd',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error('validation should have failed with symbols in Callsign');
      } catch (err) {
        expect(err.message).to.contain(
          'Validation isAlphanumeric on Callsign failed'
        );
      }
    });
    it('CallSign must be more then 2 charaters', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'k9',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must start with an A W K or N', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'd9kdk',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign must be less then 6 charaters', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'ka9wwuu',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error(
          'validation should have failed with more then 6 letters Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign Name not start with 3 alphas', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'khs9h',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error(
          'validation should have failed with 3 letters first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign cannot start with a number', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: '9kdd',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error(
          'validation should have failed with a number first Callsign'
        );
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'k9s6s',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
    it('CallSign can not have more then one number', async () => {
      const testUser = User.build({
        Email: 'cody@puppybook.com',
        Callsign: 'k39eed',
        password: 'bones',
        Name: 'cody',
      });
      try {
        await testUser.validate();
        throw Error('validation should have failed with two short Callsign');
      } catch (err) {
        expect(err.message).to.contain('Validation is on Callsign failed');
      }
    });
  }); // end describe('instanceMethods')
}); // end describe('User model')
